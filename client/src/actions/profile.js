import axios from 'axios';
import { PROFILE_ERROR,GET_PROFILE,ALL_PROFILE_FAIL,ALL_PROFILE_SUCCESS,VIEW_APROFILE_SUCCESS,VIEW_APROFILE_FAIL} from './types';
import {setAlert} from './alert';




export const getCurrentProfile =()=>async dispatch =>{


    try {

        const res = await axios.get('api/profile/me')
        dispatch({
      
          type:GET_PROFILE,
          payload:res.data
        })
        
    } catch (err) {
        console.log(err)
        dispatch({
            type:PROFILE_ERROR,
            payload :{ msg:err.response.statusText , status:err.response.status}

        })

        
    }
 




}


export const createProfile = ( formData,photoData,edit =false,history )=> async dispatch =>{


console.log('I am in the action see photo ',photoData)

const configF ={
        headers:{
            'Content-Type': 'multipart/form-data'
        }
    }
const config ={
        headers:{
            'Content-Type':'application/json'
        }
    }

    const body = JSON.stringify(formData);
  

    try {

        // const res = await axios.post('/api/profile',photoData,configF);


const res = await axios.post('/api/profile',body,config);

const resp = await   axios.post('/api/profile/photo',photoData,configF);

        // const res = await axios.all([
        //     axios.post('/api/profile',body,config),
        //     axios.post('/api/profile/photo',photoData),   
        // ])

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

      
        
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload :{ msg:err.response.statusText , status:err.response.status}

        })

        
    }
 




}


export const getAProfile = profile_id => async dispatch =>{


    try {
        

        const res = await axios.get(`/api/profile/${profile_id}`);
        console.log('I am inside  the route to get the profile')
        console.log(res.data)
        dispatch({
      
          type:VIEW_APROFILE_SUCCESS,
          payload:res.data
        })

      
        
    } catch (err) {
        dispatch({
            type:VIEW_APROFILE_FAIL,
            payload :{ msg:err.response.statusText , status:err.response.status}

        })

        
    }
 




}





