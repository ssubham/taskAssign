
import React, {useContext, useState, useEffect, useRef, Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
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
            title: 'Name',
            dataIndex: 'name',
            width: '30%',
            editable: true,
          },
          {
            title: 'Assigned by',
            dataIndex: 'username',
          },
          {
            title: 'Assigned to',
            dataIndex: 'assignedto',
          },
          {
            title: 'operation',
            dataIndex: 'operation',
            render: (_, record) =>
              this.state.dataSource.length >= 1 ? (
                <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record._id)}>
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

    componentDidMount(){
      
      if(this.props.userId === null){
        return <Redirect  to="/"/>
      }

      if(this.props.userRole === 'admin'){
        //onFetch
        this.props.getTaskDetails()
        console.log(this.props.taskDetails);
        const updatedTask = this.props.taskDetails.map((task) => {
          return (
            Object.assign({key:task._id}, {name:task.name, username: task.username, assignedto: task.assignedto})
          )
        })
        //console.log(updatedTask);

        this.setState({dataSource:this.props.taskDetails, count:this.props.taskDetails.length})
      } 
    }

    handleDelete = (key) => {
        const dataSource = [...this.state.dataSource];
        
        this.setState({
          dataSource: dataSource.filter((item) => item._id !== key),
        });
        //console.log(key);
        this.props.deleteTask(key);
      };
      handleAdd = () => {
        const { count, dataSource } = this.state;
        const key = Math.random();
        const newData = {
          //key: key,
          _id: key,
          name: `new Task${count}`,
          username: this.props.userName,
          assignedto: `dummy assigny`,
        };
        this.setState({
          dataSource: [...dataSource, newData],
          count: count + 1,
        });
        this.props.handleAdd(newData);
      };
      handleSave = (row) => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex((item) => row._id === item._id);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        this.setState({
          dataSource: newData,
        });
        this.props.updateTask(row);
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
            {this.props.userRole === "customer" ? <div><Typography>Age: {this.props.userAge}</Typography></div> : null}
            {this.props.userRole === "manager" ? <div><Typography>Role: {this.props.userRole}</Typography></div> : null}
            {this.props.userRole === "admin" ?
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
            </div> : null}
        </div>
    )
    }

}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        userId: state.auth.userId,
        userRole: state.auth.role,
        userName: state.auth.name,
        userAge: state.auth.age,
        taskDetails: state.userProfile.taskDetails
    }
}


const mapDispatchToProps = dispatch =>{
    return {
      handleAdd: (tasks) => dispatch(actions.addTask(tasks)),
      updateTask: (task) => dispatch(actions.updateTaskData(task)),
      deleteTask:(pId) => dispatch(actions.deleteTaskData(pId)),
      getTaskDetails: () => dispatch(actions.getTaskData),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)( Dashboard );
