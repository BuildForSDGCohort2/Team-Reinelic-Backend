import axios from 'axios';
import { PROFILE_ERROR,GET_PROFILE,ALL_PROFILE_FAIL,ALL_PROFILE_SUCCESS} from './types';
import {setAlert} from './alert';




export const getCurrentProfile =()=>async dispatch =>{


    try {

        const res = await axios.get('api/profile/me')
        dispatch({
      
          type:GET_PROFILE,
          payload:res.data
        })
        
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload :{ msg:err.response.statusText , status:err.response.status}

        })

        
    }
 




}


export const createProfile = ( formdata,history,edit =false) => async dispatch =>{



const config ={
        headers:{
            'Content-Type':'application/json'
        }
    }

    const body = JSON.stringify({formdata});


    try {

        const res = await axios.post('/api/profile',body,config);

        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })

        dispatch(setAlert(edit? 'Profile Updated': 'Profile Created'));
        if(!edit){

            history.push('/dashboard')
        }
        
    } catch (err) {

        // console.log(err);
        // const errors = err.res.data.errors;

        // if(errors){
        //     errors.forEach(error => dispatch(setAlert(error.msg)))
        // }
        dispatch({
            type:PROFILE_ERROR
        })
        
    }
}


export const getAllProfile =()=>async dispatch =>{


    try {

        const res = await axios.get('api/profile')
        dispatch({
      
          type:ALL_PROFILE_SUCCESS,
          payload:res.data
        })

        dispatch({
      
            type:GET_PROFILE,
            payload:res.data
          })
        
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload :{ msg:err.response.statusText , status:err.response.status}

        })

        
    }
 




}






