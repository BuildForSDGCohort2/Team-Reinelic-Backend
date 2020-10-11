import { REPORT_SUCCESS,REPORT_FAIL ,ALL_REPORT_FAIL,ALL_REPORT_SUCCESS,CLEAR_REPORT,VIEW_REPORT_SUCCESS,VIEW_REPORT_FAIL} from '../actions/types';

 const initialState ={
    report:null,
    reports :[],
    loading:true,
    errors : {}
 }

 export default function (state=initialState,action){

    const {type,payload} = action ;

    switch(type){

      case ALL_REPORT_SUCCESS:
          return{

            report:null,
            reports:payload,
            loading:false,
            errors:{}
          }

        
        case REPORT_SUCCESS:
        case VIEW_REPORT_SUCCESS:   
            return{
                ...state,
                report:payload,
                loading:false,
                
            };
        case REPORT_FAIL:
        case VIEW_REPORT_FAIL:    
            return{
                ...state,
                loading:false

            };
        case CLEAR_REPORT:
            return{
                report:null,
                reports :[],
                loading:true,
                errors : {}

            }      
          
        
         default:
            return state;    
    
    }
 }