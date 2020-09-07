import { AUTHNETICATE, LOGOUT } from "../actions/auth";

const initialState = {
    token : null,
    userId : null
}

export default (state = initialState, action) => {
    switch(action.type){
        case AUTHNETICATE:
            return {
                token : action.token,
                userId : action.userId
            };
        // case SIGNUP:
        //     return {
        //         token : action.token,
        //         userId : action.userId
        //     };
        case LOGOUT :
            console.log("Inside Reducer logout")
            console.log(initialState);
            return initialState;
        default :
            return state;
    }
};