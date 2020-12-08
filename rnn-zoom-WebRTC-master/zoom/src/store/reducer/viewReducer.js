import { ADD_REMOTE_STREAM, ADD_STREAM, MY_STREAM } from "../actions/types";

const initialState = {
    myStream: null,
    streams: [],
    remoteStreams: [],
}

export default(state = initialState, {type, payload}) => {
    switch (type){
        case MY_STREAM:
            return{
                ...state,
                myStream: payload,
            };
        case ADD_STREAM:
            return{
                ...state, 
                streams: [...streams, payload],
            };
        case ADD_REMOTE_STREAM:
            return{
                ...state,
                remoteStreams: [...state.streams, payload]
            };
        default: 
        return state;
    }
    
}