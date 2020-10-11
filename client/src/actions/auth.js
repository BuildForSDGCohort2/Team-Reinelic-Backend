import axios from 'axios';

import { setAlert} from './alert';
import{
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    CLEAR_PROFILE,
    CLEAR_REPORT
}from './types';


import setAuthToken from '../utils/setauthtoken';

// Load User

export const loadUser = ()=>async dispatch =>{
    console.log(localStorage.token)
    if(localStorage.token){

            setAuthToken(localStorage.token)

    }

    try {
        const res = await axios.get('/api/auth');

        dispatch({
            type:USER_LOADED,
            payload:res.data
        })
        
    } catch (error) {

        dispatch({
            type:AUTH_ERROR
        })
        
    }
}


//Register User

export const register =({ name, email, password}) => async dispatch =>{

    const config ={
        headers:{
            'Content-Type':'application/json'
        }
    }

    const body = JSON.stringify({name,email,password});


    try {

        const res = await axios.post('/api/user',body,config);

        dispatch({
            type:REGISTER_SUCCESS,
            payload:res.data
        })
        
    } catch (err) {

        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg)))
        }
        dispatch({
            type:REGISTER_FAIL
        })
        
    }
}

// Login User

export const login =(email, password) => async dispatch =>{

    const config ={
        headers:{
            'Content-Type':'application/json'
        }
    }

    const body = JSON.stringify({email,password});


    try {

        const res = await axios.post('/api/auth',body,config);

        dispatch({
            type:LOGIN_SUCCESS,
            payload:res.data
        })
        
    } catch (err) {

        console.log(err);
        const errors = err.res.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg)))
        }
        dispatch({
            type:LOGIN_FAIL
        })
        
    }
}



export const logout= () => {
    return async (dispatch) => {



        try {

            dispatch({
                type:CLEAR_PROFILE
            })

            dispatch({
                type: LOGOUT_SUCCESS
            });

            dispatch({
                type:CLEAR_REPORT
            })

         

        } catch (error) {
            console.error(error);
        }
    };
}

