import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/Utility';


const initialState = {
    userName: null,
    userAge: null,
    taskId: null,
    error: null,
    userRole: null,
    taskDetails: null,
    loading: false,
}

const updateUserTask = (state, action) => {
    return updateObject(state, {userName: null});
}

const deleteUserTask = (state, action) =>{
    return updateObject(state, {userName:null})
}

const getRecords = (state, action) => {
    return updateObject(state, {userName: action.userName, userRole:action.userRole, userAge:action.userAge});
}

const getTaskDetails = (state, action) => {
    return updateObject(state, {})
}
const getTaskSuccess = (state, action) => {
    //state['taskDetails'] = action.taskDetails;
    return updateObject(state, {
        taskDetails: action.taskDetails
    })
}


const reducer = (state = initialState, action) =>{
    switch(action.type){
        case actionTypes.TASK_UPDATE: return updateUserTask(state, action)
        case actionTypes.USER_RECORD: return getRecords(state, action)
        case actionTypes.GET_TASK: return getTaskDetails(state, action)
        case actionTypes.TASK_DELETE: return deleteUserTask(state, action)
        case actionTypes.TASK_SUCCESS: return getTaskSuccess(state, action)
        default:
            return state;
    }
}

export default reducer;
