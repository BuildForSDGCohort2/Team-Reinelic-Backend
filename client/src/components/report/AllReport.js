
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

import { getAllReports } from '../../actions/report';
import { getAReport } from '../../actions/report';

export const AllReport = ({getAllReports,report}) => {
    
    useEffect(()=>{
      getAllReports();
     

    },[]);
    console.log(report)
    
    
    
    return (
        report.reports ===null && report.loading===true?
         <Spinner/>:
          <Fragment>  
   
        <section className="dashboard">
        <div className="dashboard-icons">
                <ul>
                    <li>  <Link to ='/create-report' >Create a New Report</Link> </li> 
                    <li>   <FontAwesomeIcon icon={faFlag} />  <Link to ='/' disabled> Flag</Link></li>
                    <li> <FontAwesomeIcon icon={faBullhorn} /> <Link to ='/' > Alert</Link></li>
                    <li> <FontAwesomeIcon  /> <Link to ='/' > Alert</Link></li>  
                    
                </ul>
            </div>

            <div className="dashboard-body">
               
               <div className="dashboard-report">
                {
                    report.reports&&report.reports.map(report =>
                     

                     <div>   
                      <div> <Link  to= {`/report/${report._id}`}> View Report </Link> </div>
                    </div>
                        )


                }


{/* 
               {profile.profile&&profile.profile.children.map(child => 
               <div class ='mtoto'>
                   
                  <div> 
                      Children school : { child.child_school}<br />
                      Children Age :{ child.child_school}
                    </div> 
            
                
               </div>   
               )} */}



               </div>



          


            </div>

    </section>   

        

    </Fragment>
    )
}



AllReport.propTypes ={
    getAllReports:PropTypes.func.isRequired,
    report: PropTypes.object.isRequired,
    getAReport:PropTypes.func.isRequired
    
    
    
}
const mapStateToProps =(state)=>{
    return{
     
        report:state.report
    }
}

export default connect(mapStateToProps, {getAllReports,getAReport})(AllReport);
