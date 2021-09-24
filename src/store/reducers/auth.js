import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/Utility';

const initialState = {
    //token: null,
    userId: null,
    name: null,
    age: null,
    role: null,
    error: null,
    //auth: null,
    loading: false,
    authRedirect: '/'
}

const authStart = ( state, action ) =>{
    return updateObject(state, {error: null, loading: true})
}

const authSuccess = ( state, action ) =>{
    return updateObject(state, {
        userId: action.userId,
        name: action.name,
        age: action.age,
        role: action.role,
        //auth: null,
        error: null, 
        loading: false
    })
}

const authFail = ( state, action ) =>{
    return updateObject(state, {error: action.error, loading: false})
}

const authLogOut = (state, action ) => {
    console.log('logout');
    return updateObject(state, {userId: null});
}
const setAuthRedirectPath = (state, action) =>{
  //  console.log("state ", state, action);
   return updateObject(state, {authRedirectPath: action.path})
}


const reducer = (state = initialState, action) =>{
    switch(action.type){
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogOut(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
        
        default:
            return state;
    }
}

export default reducer;