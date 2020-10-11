import React ,{Fragment,useEffect} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import{getAllProfile} from '../../actions/profile';
import Spinner from '../layout/Spinner';

import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faBullhorn} from '@fortawesome/free-solid-svg-icons';
import { faExclamationCircle} from '@fortawesome/free-solid-svg-icons';
import { faFlag} from '@fortawesome/free-solid-svg-icons';
import avatar from '../../img/avatar.png';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';






export const AllProfile = ({getAllProfile,profile}) => {
    
    useEffect(()=>{
      getAllProfile()
    },[]);
    
    console.log(profile.profiles)
    
    
    return (
        profile.profiles ===null && profile.loading===true?
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
               
               <div className="dashboard-profiles">
                {
                    profile.profiles&&profile.profiles.map(profile =>
                     <div>   
                    <div> Name: {profile.name}</div>
                    <img src={avatar} alt=""/>
                    <div> Availability: {profile.availability}</div>
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



AllProfile.propTypes ={
    getAllProfile:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired
    
    
}
const mapStateToProps =(state)=>{
    return{
        auth:state.auth,
        profile:state.profile
    }
}

export default connect(mapStateToProps, {getAllProfile})(AllProfile);