import React, { useEffect,Fragment }from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import{getCurrentProfile} from '../../actions/profile';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faBullhorn} from '@fortawesome/free-solid-svg-icons';

import { faFlag} from '@fortawesome/free-solid-svg-icons';



 const Dashboard = ({auth, profile,getCurrentProfile}) => {

  

   console.log(` Loading :${profile.loading}`)
   console.log(profile)
   console.log(auth);

    useEffect(()=>{
        getCurrentProfile();

       
        
    },[profile.loading])

   

  

    return (
         profile.profile ===null && profile.loading===true?
         <Spinner/>:
          <Fragment>  
   
        <section className="dashboard">
            <div className="dashboard-icons">
                <ul>
                    <li>  <Link to ='/create-report' >Create a New Report</Link> </li> 
                    <li>   <FontAwesomeIcon icon={faFlag} />  <Link to ='/edit-profile' > Flag</Link></li>
                    <li> <FontAwesomeIcon icon={faBullhorn} /> <Link to ='/edit-profile' > Alert</Link></li>  
                    <li> <FontAwesomeIcon icon={faBullhorn} /> <Link to ='/edit-profile' > </Link></li>  
                </ul>
            </div>

            <div className="dashboard-body">
            <div className="dashboard-body--profile">
            <FontAwesomeIcon  icon={['fas','flag']}/> 
             <h1> Welcome {auth.user&&auth.user.name}</h1>
                <img src="" alt=""/>
       <span> Trustlevel :{profile.profile&&profile.profile.trustlevel}</span><br />
             
                

                {
                profile.profile.name && profile.loading === false ?(
                    <Fragment> < DashboardActions /> </Fragment>
                ):(
                    <Fragment> 
                       <p>You have not created a profile, please add some info</p>  
                       <Link to ='/create-profile' className ='btn'> Create Profile</Link>  
                       

                    </Fragment>
                )
            }
 

            </div>


            <div className="dashboard-body--report">

                <h3> User Profile  <FontAwesomeIcon icon={faCoffee} /> </h3>

                <div className ="text-lead"> Parent Name : {profile.profile &&profile.profile.user.name}</div>
                <div> Parent contact: {profile.profile &&profile.profile.contact}</div>
                <div> Parent category : {profile.profile &&profile.profile.work}</div>
                <div> Parent availability : {profile.profile &&profile.profile.availability}</div>
                <div className ="text-lead"> Mtoto profile</div> 
               {profile.profile&&profile.profile.children.map(child => 
               <div class ='mtoto'>
                   
                  <div> 
                      Children school : { child.child_school}<br />
                      Children Age :{ child.child_school}
                    </div> 
            
                
               </div>   
               )}

               
         

          

            </div>

            




            </div>

    </section>   

        

    </Fragment>
    )
}


Dashboard.propTypes ={
    getCurrentProfile:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    profile:PropTypes.object.isRequired,
}
const mapStateToProps =(state)=>{
    return{
        auth:state.auth,
        profile:state.profile
    }
}

export default connect(mapStateToProps,{getCurrentProfile}) (Dashboard);