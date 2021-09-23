import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/Utility';


const initialState = {
    userName: null,
    taskId: null,
    error: null,
    userRole: null,
    taskDetails: null,
    loading: false,
}

const updateUserTask = (state, action) => {
    updateObject(state, {token: null, userId: null});
}

const getRecords = (state, action) => {
    updateObject(state, {token: null, userId: null});
}

const getTaskDetails = (state, action) => {
    updateObject(state, {})
}
const getTaskSuccess = (state, action) => {
    //console.log("getTaskSuccess ", action.taskDetails)
    state['taskDetails'] = action.taskDetails;
    /*updateObject(state, {
        taskDetails: action.taskDetails
    })*/

    console.log(initialState)
}


const reducer = (state = initialState, action) =>{
    switch(action.type){
        case actionTypes.TASK_UPDATE: return updateUserTask(state, action)
        case actionTypes.USER_RECORD: return getRecords(state, action)
        case actionTypes.GET_TASK: return getTaskDetails(state, action)
        case actionTypes.TASK_SUCCESS: return getTaskSuccess(state, action)
        default:
            return state;
    }
}

export default reducer;
