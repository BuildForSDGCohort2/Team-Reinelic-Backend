
import {GET_PROFILE, PROFILE_ERROR,CLEAR_PROFILE,ALL_PROFILE_SUCCESS,ALL_PROFILE_FAIL } from '../actions/types';

 const initialState ={
    profile:null,
    profiles :[],
    loading:true,
    errors : {}
 }

 export default function (state=initialState,action){

    const {type,payload} = action ;

    switch(type){

        
        case GET_PROFILE:
            return{
                ...state,
                profile:payload,
                loading:false
            };
        case PROFILE_ERROR:
        case ALL_PROFILE_FAIL:    
            return{
                ...state,
                error:payload,
                loading:false

            };  
        case CLEAR_PROFILE: 
         return {
           
            profile:null,
            profiles :[],
            loading:true,
            errors : {}
            
         };
         case ALL_PROFILE_SUCCESS:
             return{
                 ...state,
                 profiles:payload,
                 loading:false
             }
        
         default:
            return state;    
    
    }
 }


