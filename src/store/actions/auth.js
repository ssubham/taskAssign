import * as actionTypes from './actionTypes';
import axios from 'axios';


export const authStart = () =>{
    return {
        type: actionTypes.AUTH_START,
    }
}

export const authSuccess = (id, name, age, role) =>{
    return {
        type: actionTypes.AUTH_SUCCESS,
        userId: id,
        name: name,
        age: age,
        role: role,
        error: null, 
        loading: false
    }
}

export const authFail = (error) =>{
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
    }
}

export const logout = () =>{
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const logoutSucceed = () =>{
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}


export const authValidate = (username, email, password, age, role, isSignup) =>{
    
    return dispatch =>{
        
        let authData = {
            name:username,
            password:password,
        }
        let url = "http://localhost:5000/api/usersdetails";
        if(isSignup){
            url = "http://localhost:5000/api/users";
            Object.assign(authData, {'email':email, 'age': age, 'role': role})
        }
        
        axios.post(url, authData)
        .then(response => {
            localStorage.setItem('userId', response.data.data._id);
            dispatch(authSuccess(response.data.data._id, response.data.data.name, response.data.data.age, response.data.data.role))
        })
        .catch(err =>{
            console.log("authError ", err)
            dispatch(authFail(err.error));
        })
    }
}

export const setAuthRedirectPath = (path) =>{
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path,
        
    }
}

export const authCheckState = () =>{
    console.log("autsc")
    return {
        type:actionTypes.AUTH_CHECK_STATE,
    }
}