
import React, {useContext, useState, useEffect, useRef, Component } from 'react';
import { connect } from 'react-redux';
import { Typography, Table, Input, Button, Popconfirm, Form } from 'antd';

import * as actions from '../../store/actions/index';

import { } from './Dashboard.css';

const { Title } = Typography;

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};


const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
      if (editing) {
        inputRef.current.focus();
      }
    }, [editing]);
  
    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
    };
  
    const save = async () => {
      try {
        const values = await form.validateFields();
        toggleEdit();
        handleSave({ ...record, ...values });
      } catch (errInfo) {
        console.log('Save failed:', errInfo);
      }
    };
  
    let childNode = children;
  
    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div
          className={"editable-cell-value-wrap"}
          style={{
            paddingRight: 24,
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }
  
    return <td {...restProps}>{childNode}</td>;
  };



class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.columns = [
          {
            title: 'name',
            dataIndex: 'name',
            width: '30%',
            editable: true,
          },
          {
            title: 'age',
            dataIndex: 'age',
          },
          {
            title: 'address',
            dataIndex: 'address',
          },
          {
            title: 'operation',
            dataIndex: 'operation',
            render: (_, record) =>
              this.state.dataSource.length >= 1 ? (
                <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                  <Button type="link" href="#">Delete</Button>
                </Popconfirm>
              ) : null,
          },
        ];
        this.state = {
          dataSource: [
            {
              key: '0',
              name: 'Edward King 0',
              age: '32',
              address: 'London, Park Lane no. 0',
            },
            {
              key: '1',
              name: 'Edward King 1',
              age: '32',
              address: 'London, Park Lane no. 1',
            },
          ],
          count: 2,
        };
    }

    handleDelete = (key) => {
        const dataSource = [...this.state.dataSource];
        this.setState({
          dataSource: dataSource.filter((item) => item.key !== key),
        });
      };
      handleAdd = () => {
        const { count, dataSource } = this.state;
        const newData = {
          key: count,
          name: `Edward King ${count}`,
          age: '32',
          address: `London, Park Lane no. ${count}`,
        };
        this.setState({
          dataSource: [...dataSource, newData],
          count: count + 1,
        });
      };
      handleSave = (row) => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        this.setState({
          dataSource: newData,
        });
    };

    onAuth = () => {

    }

    render(){
        const { dataSource } = this.state;
        const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
        };
        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }

            return {
                ...col,
                onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave: this.handleSave,
                }),
            };
        });
    return(
        <div>
            <Title level={1}>{this.props.userName}</Title>
            <div>
                <Button
                    onClick={this.handleAdd}
                    type="primary"
                    style={{
                        marginBottom: 16,
                    }}
                    >
                    Add a row
                </Button>
                <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                />
            </div>
        </div>
    )
    }

}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        userRole: state.userProfile.role !== null,
        userName: state.userProfile.username !== null,
        taskDetails: state.userProfile.taskDetails != null
        //authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onAuth: (username, role) => dispatch(actions.getRecords(username, role)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)( Dashboard );
