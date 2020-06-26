import { DIFFIE_HELMAN } from "../actions/actionTypes"

const initialState = {
    IP: null,
    prime: null,
    generator: null,
    serverPublicKey: null,
    secret: null
}

export default function DHReducer(state=initialState, action) {
    switch(action.type) {
        case DIFFIE_HELMAN:
            return {
                ...state, IP: action.IP, 
                          prime: action.prime, 
                          generator: action.generator,
                          serverPublicKey: action.serverPublicKey
            }
        default: 
            return state;
    }
}