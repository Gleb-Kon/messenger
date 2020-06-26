import { GET_ALL_USER, GET_ALL_USER_START } from "../actions/actionTypes"

const initialState = {
    users: [],    
    loading: false
}

export default function getDataUser(state=initialState, action) {
    switch(action.type) {
        case GET_ALL_USER:
            return {
                ...state, loading: false, users: action.users 
            }
        case GET_ALL_USER_START:
            return {
            ...state, loading: true 
            }
        default: 
            return state;
    }
}