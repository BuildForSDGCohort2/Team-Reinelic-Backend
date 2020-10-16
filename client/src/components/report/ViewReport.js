
import React ,{Fragment,useEffect} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faBullhorn} from '@fortawesome/free-solid-svg-icons';
import { faExclamationCircle} from '@fortawesome/free-solid-svg-icons';
import { faFlag} from '@fortawesome/free-solid-svg-icons';
import avatar from '../../img/avatar.png';
import Button from '@material-ui/core/Button';
import SaveIcon  from '@material-ui/icons/Save'

import { getAReport } from '../../actions/report';


export const ViewReport =  ({report,getAReport,match}) => {
    console.log(match)
    

   useEffect(()=>{
       getAReport(match.params.report_id)
   },[getAReport])
 
    
    
    return (
        report.report ===null && report.loading===true?
         <Spinner/>:
          <Fragment>  
   
        <section className="dashboard">
            <div className="dashboard-icons">
                <ul>
                    <li>  <Link to ='/edit-profile' >  Profile</Link> </li>
                    <li>  <FontAwesomeIcon icon={faExclamationCircle} /> <Link to ='/report' > Report</Link></li>
                    <li>   <FontAwesomeIcon icon={faFlag} />  <Link to ='/edit-profile' > Flag</Link></li>
                    <li> <FontAwesomeIcon icon={faBullhorn} /> <Link to ='/edit-profile' > Alert</Link></li>  
                    
                </ul>
            </div>

            <div className="dashboard-body">
               
               <div className="dashboard-report">
                
                
                <h3> User Profile  <FontAwesomeIcon icon={faCoffee} /> </h3>

                <div className ="text-lead"> Report Details</div>
                <div> Report Type: {report.report &&report.report_type}</div>
                <div> Report Description : {report.report &&report.description}</div>
                <div> Report Location : {report.report &&report.report.location}</div>
                <div className ="text-lead"> Report Investigation status</div> 
               {report.report&&report.report.investigation.map(child => 
               <div class ='investigation_status'>
                   <div>Report status : {child.status}</div>
                   <div>Investigation decision : {child.decision}</div>
                  <div> 
                      Children school : { child.child_school}<br />
                      Children Age :{ child.child_school}
                    </div> 
            
                
               </div>   
               )}

               {/* <Button 
               startIcon={<SaveIcon/>}
               href=""
                variant="contained" 
                color="secondary"
               style={{
                   fontSize:24
               }}
               >
                   Edit Profile
               </Button>  */}

        

                  


               </div>



          


            </div>

    </section>   

        

    </Fragment>
    )
}



ViewReport.propTypes ={
    getAReport:PropTypes.func.isRequired,
    report: PropTypes.object.isRequired
    
    
    
}
const mapStateToProps =(state)=>{
    return{
     
        report:state.report
    }
}

export default connect(mapStateToProps,{getAReport})(ViewReport);

