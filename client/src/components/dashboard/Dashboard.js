import React, { useEffect,Fragment }from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import{getCurrentProfile} from '../../actions/profile';
import {loadUser} from '../../actions/auth';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCoffee, faRoad } from '@fortawesome/free-solid-svg-icons';
import { faBullhorn} from '@fortawesome/free-solid-svg-icons';
import { DashboardIcons} from './DashboardIcons';

import { faFlag} from '@fortawesome/free-solid-svg-icons';



 const Dashboard = ({auth, profile,getCurrentProfile,loadUser}) => {

  

   console.log(` Loading :${profile.loading}`)
   console.log(profile)
   console.log(auth);

    useEffect(()=>{
        loadUser();
        getCurrentProfile();
       

       
        
    },[auth.isAuthenticated])

   

  

    return (
          auth.user===null?
         <Spinner/>:
          <Fragment>  
   
        <section className="dashboard">
             <DashboardIcons />

            <div className="dashboard-body">
            <div className="dashboard-body--profile">
            <FontAwesomeIcon  icon={['fas','flag']}/> 
             <h1> Welcome {auth.user&&auth.user.name}</h1>
                <img src="" alt=""/>
       <span> Trustlevel :{profile.profile&&profile.profile.trustlevel}</span><br />
             
                

                {
                profile.profile && profile.loading === false ?(
                    <Fragment> < DashboardActions /> </Fragment>
                ):(
                    <Fragment> 
                       <p>You have not created a profile, please add some info</p>  
                       <Link to ='/create-profile' className ='btn'> Create Profile</Link>  
                       

                    </Fragment>
                )
            }
 

            </div>
         
         { profile.profile ?(
           
            <div className="dashboard-body--report">

                <h3> User Profile  <FontAwesomeIcon icon={faCoffee} /> </h3>

                <div className ="text-lead"> Parent Name : {profile.profile &&profile.profile.user.name}</div>
                <div> Parent contact: {profile.profile &&profile.profile.contact}</div>
                <div> Parent category : {profile.profile &&profile.profile.work}</div>
                <div> Parent availability : {profile.profile &&profile.profile.available}</div>
                <div className ="text-lead"> Mtoto profile</div> 
               {profile.profile&&profile.profile.children.map(child => 
               <div class ='mtoto'>
                   
                  <div> 
                      Children school : { child.child_school}<br />
                      Children Age :{ child.child_school}
                    </div> 
            
                
               </div>   
               )}

               
         

          

            </div>): <div> </div>

               }




            </div>

    </section>   

        

    </Fragment>
    )
}


Dashboard.propTypes ={
    getCurrentProfile:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    profile:PropTypes.object.isRequired,
    loadUser: PropTypes.object.isRequired
}
const mapStateToProps =(state)=>{
    return{
        auth:state.auth,
        profile:state.profile,
        
    }
}

export default connect(mapStateToProps,{getCurrentProfile,loadUser}) (Dashboard);