import IO from 'socket.io-client';
import Peer from 'react-native-peerjs';

import {JOIN_CHAT,
    ADD_STREAM, 
    MY_STREAM, 
    ADD_REMOTE_STREAM}
     from './types';
import { call } from 'react-native-reanimated';

//Modify host when the app is uploaded on the server     
export const API_URI = `http://192.168.254.243:5000`;
export const socket = IO(`${API_URI}` , {
    forceNew: true
})

socket.on('connection', () => console.log('Connected client'));

const peerServer = new Peer(undefined, {
    host: '192.168.254.243',
    secure: false,
    // port: 5000,
    path: '/mypeer',
})


export const joinRoom = (stream) => async (dispatch) => {
    //Randomize roomID
    const roomID = 'roomid';
    
    dispatch({type: MY_STREAM, payload: stream});

    peerServer.on('open', (userId) => {
        socket.emit('join-room', {userId, roomID})
    });

    socket.on('user-connected', (userId) =>{
        connectToNewUser(userId, stream, dispatch)
    })

    peerServer.on('call', (call) => {
        call.answer(stream)
        call.on('stream', (stream) => {
            dispatch({type: ADD_STREAM, payload: stream});
        })
    })
};


function connectToNewUser(userId, stream, dispatch) {

    constcall = peerServer.call(userId, stream);

    call.on('stream', (remoteVideStream) => {
        if(remoteVideStream)
        {
            dispatch({type:ADD_REMOTE_STREAM, payload: remoteVideStream});
        }
    })
};