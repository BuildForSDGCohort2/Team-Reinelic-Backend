import {combinedReducers, combineReducers} from 'redux';
import alert from './alert'
import auth from './auth';
import profile from './profile';
import report from './report';




export default combineReducers({
    alert,
    profile,
    auth,
    report
    

});