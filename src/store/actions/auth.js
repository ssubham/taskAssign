//import { act } from 'react-dom/test-utils';
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
   // localStorage.removeItem('expirationDate');
   // localStorage.removeItem('token');
   // localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT
    }
}

export const logoutSucceed = () =>{
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}


export const auth = (username, email, password, age, role, isSignup) =>{
    console.log(username, password, isSignup)
    /*return {
        type: actionTypes.AUTH_USER,
        email: email,
        password: password,
        isSignup: isSignup,
    }*/
    
    return dispatch =>{
        //dispatch(authStart);
        let authData = {
            name:username,
            password:password,
        }
        let url = "http://localhost:5000/api/usersdetails";
        if(isSignup){
            url = "http://localhost:5000/api/users";
            Object.assign(authData, {'email':email, 'age': age, 'role': role})
        }
        
        
        //if(!isSignup){
            axios.post(url, authData)
            .then(response => {
                console.log("authSuccess ", response );
                dispatch(authSuccess(response.data._id, response.data.name, response.data.age, response.data.role))
            })
            .catch(err =>{
                console.log("authError ", err)
                dispatch(authFail(err.error));
            })
        //}
        
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

    /*return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            //console.log(new Date(expirationDate).getTime(), new Date().getTime())
            if(expirationDate <= new Date()){
                dispatch(logout())
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeOut((expirationDate.getTime() - new Date().getTime()) /1000 ));
            }
            
        }
    }*/
}