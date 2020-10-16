
import {GET_PROFILE, PROFILE_ERROR,CLEAR_PROFILE,ALL_PROFILE_SUCCESS,ALL_PROFILE_FAIL,VIEW_APROFILE_SUCCESS,VIEW_APROFILE_FAIL } from '../actions/types';

 const initialState ={
    profile:null,
    profiles :[],
    view:null,
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
        case VIEW_APROFILE_FAIL:        
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
             };
        case VIEW_APROFILE_SUCCESS:
           return {
                ...state,
                view:payload
            };

         default:
            return state;    
    
    }
 }


