import {combineReducers} from 'redux';
import videaReducer from './viewReducer';

export default combineReducers({
    video: videaReducer,

});