import {REPORT_SUCCESS,
    REPORT_FAIL ,
    ALL_REPORT_SUCCESS,
    ALL_REPORT_FAIL,
    VIEW_REPORT_SUCCESS,
    VIEW_REPORT_FAIL
} from './types';
import  axios from 'axios';
import {setAlert} from '../actions/alert'



export const reportData =(formdata,history) => async dispatch =>{
  console.log( 'inside the action ')
    console.log(formdata)

    const config ={
        headers:{
            'Content-Type':'application/json'
        }
    }

    const body = JSON.stringify({formdata});


    try {

        const res = await axios.post('/api/report',body,config);

        dispatch({
            type:REPORT_SUCCESS,
            payload:res.data
        })

        history.push('/dashboard');
       
    
        // if(!edit){

        //     history.push('/dashboard')
        // }
        
    } catch (err) {

        
        const errors = err
        console.log(errors)

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg)))
        }
        dispatch({
            type:REPORT_FAIL
        })
        
    }

}



export const getAllReports =()=>async dispatch =>{


    try {

        const res = await axios.get('/api/report')
        dispatch({
      
          type:ALL_REPORT_SUCCESS,
          payload:res.data
        })

      
        
    } catch (err) {
        dispatch({
            type:ALL_REPORT_FAIL,
            payload :{ msg:err.response.statusText , status:err.response.status}

        })

        
    }
 




}


export const getAReport = report_id => async dispatch =>{


    try {
        

        const res = await axios.get(`/api/report/${report_id}`);
        console.log('I am inside  the route')
        console.log(res.data)
        dispatch({
      
          type:VIEW_REPORT_SUCCESS,
          payload:res.data
        })

      
        
    } catch (err) {
        dispatch({
            type:VIEW_REPORT_FAIL,
            payload :{ msg:err.response.statusText , status:err.response.status}

        })

        
    }
 




}
