import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import { Table} from 'antd';

import { }from './Home.css';


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

const Home = (props) => {
  
  const {taskDetails, onTaskData} = props;
  const [originalData, setOriginalData] = useState([]);

  useEffect(() => {
    if(taskDetails !== null){
      const tempDataArr = [];
      taskDetails.map((tasks) => {
        return (
          tempDataArr.push({key:tasks._id.toString(), task: tasks.name, username: tasks.username, assigned: tasks.assignedto})
        )
      })
      setOriginalData(tempDataArr)
    }
    onTaskData();
  }, [onTaskData, taskDetails])

    return (
        
            <Table className={"tableView"}
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
  //console.log("user ", state.userProfile.taskDetails)
    return {
        isAuthenticated: state.auth.userId !== null,
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