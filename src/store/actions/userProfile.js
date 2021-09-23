
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
    /*return dispatch =>{
        dispatch(authStart);
        const authData = {
            email:email,
            password:password,
            returnSecureToken:true,
        }
        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBCUpQ0pwoKNA2Vw9ixn0xB-lPXQKhBcpA";
        if(!isSignup){
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBCUpQ0pwoKNA2Vw9ixn0xB-lPXQKhBcpA";
        }
        axios.post(url, authData)
            .then(response => {
                console.log("authSuccess ", response );
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);

                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId))
                dispatch(checkAuthTimeOut(response.data.expiresIn))
            })
            .catch(err =>{
                console.log("authError ", err)
                dispatch(authFail(err.response.data.error));
            })
    }*/
}