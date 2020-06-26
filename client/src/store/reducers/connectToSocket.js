import { CONNECT_TO_SOCKET } from "../actions/actionTypes"

const initialState = {
    socket: null
}

export default function connectToSocket(state=initialState, action) {
    switch(action.type) {     
        case CONNECT_TO_SOCKET:
            console.log("CONNECT_TO_SOCKET")

            return {
                ...state, socket: action.socket

            }
        default: 
            return state;
    }
}