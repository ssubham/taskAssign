
import * as actionTypes from './actionTypes';
import axios from 'axios';
//import { updateObject } from '../../shared/Utility';


export const getRecords = (userName, userPassword, userRole) =>{
    return {
        type: actionTypes.USER_RECORD,
        userName: userName,
        userRole: userRole
    }
}

export const updateUserTask = (userName, taskId, taskName) => {
    return {
        type: actionTypes.TASK_UPDATE,
        taskId: taskId
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


export const auth = (email, password, isSignup) =>{
    return {
        type: actionTypes.AUTH_USER,
        email: email,
        password: password,
        isSignup: isSignup,
    }
}
