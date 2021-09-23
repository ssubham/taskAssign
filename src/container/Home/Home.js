import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import { Table } from 'antd';

import classes from './Home.css';


const columns = [
    {
      title: 'Task',
      dataIndex: 'task',
    },
    {
      title: 'Assigned By',
      dataIndex: 'username',
    },
    {
      title: 'Assigned',
      dataIndex: 'assigned',
      
    }
  ];



//const originData = [];
    /*for (let i = 0; i < 10; i++) {
        originData.push({
          key: i.toString(),
          task: `Edrward ${i}`,
          username: "test1",
          assigned: `London Park no`,
        });
      }*/
      


const Home = (props) => {
  
  const {taskDetails, onTaskData} = props;
  const [originalData, setOriginalData] = useState([]);

  useEffect(() => {
    if(props.taskDetails !== null){
      const tempDataArr = [];
      const tData = props.taskDetails.map((tasks) => {
        return (
          tempDataArr.push({key:tasks._id.toString(), task: tasks.name, username: tasks.username, assigned: tasks.assignedto})
        )
      })
      setOriginalData(tempDataArr)
    }
    onTaskData();
  }, [onTaskData, taskDetails])

    return (
        
            <Table className={classes.tableView}
                components={{
                
                }}
                bordered
                dataSource={originalData}
                columns={columns}
                rowClassName="editable-row"
                pagination={{
                   
                }}
            />
    )
    
}

const mapStateToProps = state => {
  console.log("user ", state.userProfile.taskDetails)
    return {
        //isAuthenticated: state.auth.userId !== null,
        taskDetails: state.userProfile.taskDetails
    };
};
const mapDispatchToProps = dispatch =>{
  return {
      onTaskData: () => dispatch(actions.getTaskData()),
      onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
      
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(Home);