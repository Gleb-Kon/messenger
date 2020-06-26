import { GET_USER_DATA, GET_USER_DATA_START } from "../actions/actionTypes"

const initialState = {
    id: null,
    email: null,
    loading: false
}

export default function getDataUser(state=initialState, action) {
    switch(action.type) {
        case GET_USER_DATA:
            return {
                ...state, loading: false, id: action.id, email: action.email 
            }
        case GET_USER_DATA_START:
            return {
            ...state, loading: true 
            }
        default: 
            return state;
    }
}