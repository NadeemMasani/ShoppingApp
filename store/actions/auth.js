import { AsyncStorage } from 'react-native'
export const LOGOUT = 'LOGOUT'
// export const LOGIN = 'LOGIN'
export const AUTHNETICATE = 'AUTHENTICATE'
let timer;

export const authenticate = (userId, token,expiryTime) => {
   return dispatch => {
       console.log(expiryTime);
       dispatch(setLogoutTimer(expiryTime));
       dispatch( {type : AUTHNETICATE, userId : userId, token : token});
   };
};

export const signup = (email,password) => {
    return async dispatch => {
         console.log("IN side auth js");
         console.log(email);
         console.log(password);
         const response =  await fetch(
             'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD-qG1bFisg0CDhj164hB-IPqbyqfhbgeo',
         {
             method : 'POST',
             headers : {
                 'Content-Type' : 'application/json'
             },
             body : JSON.stringify({
                email : email,
                password : password,
                returnSecureToken : true
             })
         }
         );
        if ( !response.ok ) {
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            if ( errorId === 'EMAIL_EXISTS'){
                message = "The Email already exists please use a differnt email or Sign in using existing email";
            }
            throw new Error(message);
         }
         const resData = await response.json();
         console.log(resData);
        //  dispatch({type : SIGNUP, token : resData.idToken, userId : resData.localId});
        dispatch(
            authenticate(
                resData.localId,
                resData.token,
                parseInt(resData.expiresIn) * 1000
            )
        );
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn)*1000);
         saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    };
};

export const logout = () => {
    return dispatch =>{
        console.log("Inside Logout...")
        clearLogoutTimer();
        AsyncStorage.removeItem('userData');
        dispatch( {type : LOGOUT});
    };
}

const clearLogoutTimer = () => {
    if(timer){
        console.log("Inside Clear")
        clearTimeout(timer);
    }
};

const setLogoutTimer = expirationTime => {
    return dispatch => {
        console.log("Inside Timer........");
        console.log(expirationTime/1000);
        timer = setTimeout( ()=> {
            dispatch(logout());
        } , expirationTime / 1000);
    };
};


export const login = (email,password) => {
    return async dispatch => {
         console.log("IN side auth js");
         console.log(email);
         console.log(password);
         const response =  await fetch(
             'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD-qG1bFisg0CDhj164hB-IPqbyqfhbgeo',
         {
             method : 'POST',
             headers : {
                 'Content-Type' : 'application/json'
             },
             body : JSON.stringify({
                email : email,
                password : password,
                returnSecureToken : true
             })
         }
         );
        if ( !response.ok ) {
            //throw new Error('Something went wrong while getiing authenticating key');
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            if ( errorId === 'EMAIL_NOT_FOUND'){
                message = "The Email could not be found please retry or Sign up";
            } else if ( errorId === 'INVALID_PASSWORD'){
                message = "The Password Entered in not valid";
            }
            throw new Error(message);
         }
        const resData = await response.json();
        console.log(resData);
        // dispatch({type : LOGIN, token : resData.idToken, userId : resData.localId});
        dispatch(
            authenticate(
                resData.localId, 
                resData.token, 
                parseInt(resData.expiresIn)*1000
            )
        );
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn)*1000);
        saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    };
};


const saveDataToStorage = (token, userId, expirationDate) => {
    AsyncStorage.setItem('userData',
    JSON.stringify({
        token : token,
        userId : userId,
        expirationDate : expirationDate.toISOString()
    }
    ));
}