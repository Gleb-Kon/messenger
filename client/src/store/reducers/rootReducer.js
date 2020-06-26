import {combineReducers} from 'redux';
import authReducer from './auth'
import DHReducer from './DH'
import getDataUser from './getDataUser';
import getAllUsers from './getAllUsers';
import connectToSocket from './connectToSocket'


export default combineReducers({
    auth: authReducer,
    DH: DHReducer,
    getDataUser: getDataUser,
    getAllUsers: getAllUsers,
    connectToSocket: connectToSocket
}) 