
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
        axios.get("http://localhost:5000/api/tasks")
        .then(response => {
            //console.log(response.data.data);
            dispatch(taskSuccess(response.data.data))
        })
        .catch(err => {
            dispatch(taskFail(err.error));  
        })
    }   
}

export const updateTaskData = () => {
    return dispatch => {
        axios.delete("http://localhost:5000/api/tasks/:id")
        .then(response => {
            dispatch(taskSuccess(response.data.data))
        }).catch(err => {
            dispatch(taskFail(err.error));  
        })
    }
}


export const deleteTaskData = () => {
    return dispatch => {
        axios.delete("http://localhost:5000/api/tasks")
        .then(response => {
            dispatch(taskSuccess(response.data.data))
        }).catch(err => {
            dispatch(taskFail(err.error));  
        })
    }
} 