import React ,{useEffect,Fragment}from 'react';
import PropTypes from 'prop-types';
import {connect } from 'react-redux';
import {getAProfile} from '../../actions/profile';

export const ViewProfile = ({profile,getAProfile,match}) => {
console.log(match)
useEffect(()=>{
  
    getAProfile(match.params.profile_id)
},[getAProfile])

console.log(profile)
let image = profile.view&&profile.view.picture;

    return (
        <Fragment> 
<div className="profile">
<div className="profile-search card  bg-blue py-2">

    <form >
        <span className="form-label">Search ...</span>
        <input type="text" name="search" value ="" />

    </form>
</div>

<div className="profile-main">

    <div className=" profile-main-picture p-2">
       

        <img src={`/upload/${image}`} alt="profile-image"/>
    </div>

    <div className="profile-main-about p-2">
        <p>Name:{profile.view&&profile.view.name} </p>
        <p>Work:{profile.view&&profile.view.name}</p>

        <div className="my-3">
            <span >ABOUT</span>
           <div> Number of children : {profile.view&&profile.view.children.length} </div> 
           <div> children School:</div>
        </div>


    </div>
    <div className=" profile-main-review p-2">

     <span>Badge / Turstlevel: {profile.view&&profile.view.trustlevel}   </span>

    </div>

    <div className="profile-main-form p-2">

       <Fragment>
           <div></div> 
           <div>Contact:{profile.view&&profile.view.contact} </div> 
           <div>Picture:{profile.view&&profile.view.picture} </div> 
        </Fragment>
    

    </div>
   
    </div>
   

</div>
    
</Fragment> 
      
    )
}

 






ViewProfile.propTypes ={
    profile:PropTypes.object.isRequired,
    getAProfile:PropTypes.func.isRequired
}


const mapStateToProps = (state)=>{

    return{
       profile:state.profile 
    }
}

export default connect(mapStateToProps,{getAProfile})(ViewProfile)

