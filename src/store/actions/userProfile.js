
import * as actionTypes from './actionTypes';
import axios from 'axios';
//import { updateObject } from '../../shared/Utility';


export const getRecords = (userName, userRole) =>{
    return {
        type: actionTypes.USER_RECORD,
        userName: userName,
        userRole: userRole
    }
}

export const deleteUserTask = (taskId) => {
    return {
        type: actionTypes.TASK_DELETE,
        taskId: taskId
    }
}

export const updateUserTask = (userName, taskId, taskName) => {
    return {
        type: actionTypes.TASK_UPDATE,
        taskId: taskId,
        username: userName,
        taskName: taskName
    }
}

export const taskFail = (error) => {
    return {
        type: actionTypes.TASK_FAIL
    }
}
export const taskSuccess = (taskDetails) => {
    return {
        type: actionTypes.TASK_SUCCESS,
        taskDetails: taskDetails
    }
}

export const getTaskData = () => {
    return dispatch => {
        axios.get("http://localhost:5000/task/tasks")
        .then(response => {
            //console.log(response.data.data);
            dispatch(taskSuccess(response.data.data))
        })
        .catch(err => {
            dispatch(taskFail(err.error));  
        })
    }   
}
// Adding Task....
export const addTask = (pData) => {
    
    return dispatch => {
        const taskData = {
            name:pData.name,
            username: pData.username,
            assignedto: pData.assignedto
        }
        
        axios.post("http://localhost:5000/task/tasks", taskData)
        .then(response => {
            console.log(response);
            dispatch(taskSuccess(response.data.data))
        })
        .catch(err => {
            console.log(err)
            dispatch(taskFail(err.error));  
        })
    }
}

// Update Task using Id.
export const updateTaskData = (task) => {
    console.log(task._id);
    return dispatch => {
        const taskData = {
            name: task.name,
            username: task.username,
            assignedto: task.assignedto
        }


        axios.put(`http://localhost:5000/task/tasks/${task._id}`, taskData)
        .then(response => {
            dispatch(taskSuccess(response.data.data))
        }).catch(err => {
            dispatch(taskFail(err.error));  
        })
    }
}


export const deleteTaskData = (pId) => {
    return dispatch => {
       // console.log("deleteTaskData ", pId);
        axios.delete(`http://localhost:5000/task/tasks/${pId}`)
        .then(response => {
            console.log("deletedTask ", response)
            dispatch(taskSuccess(response.data.data))
        }).catch(err => {
            dispatch(taskFail(err.error));  
        })
    }
} 