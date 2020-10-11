import React, {Fragment,useState } from 'react';
// import axios from 'axios';
import {connect} from 'react-redux';
import { setAlert } from '../../actions/alert';
import { login } from '../../actions/auth';
import { loadUser} from '../../actions/auth';
import PropTypes from 'prop-types';
import {Link, Redirect} from 'react-router-dom';




const Login = ({setAlert,login,isAuthenticated,isprofile}) => {
 
    console.log(isprofile)
    const [formData,setFormData] =useState(
        {
        
            email:'',
            password:'',
        
        }
    );


    const { email, password} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

    const onSubmit = async (e) =>{
       e.preventDefault();
        login(email,password);
        
      
    }
    if(isAuthenticated && isprofile.profile === null){
        return <Redirect to ="/dashboard" />       
    }


    return (
        <Fragment>

<div className="form">
        <div className="form-image">

        </div>
        <div className="form-body">



            <form onSubmit ={ e => onSubmit(e)}>
                <p>Welcome Back to Mtoto </p>
                <small> Please enter your email and password to login</small>


              
                <div className="form-group">
                    <div className="form-label"> Email </div>
                    <input type="text" name="email"  value={email} onChange={ e => onChange(e)} required  />
                </div>
                <div className="form-group">
                    <div className="form-label"> Password</div>
                    <input type="password" name="password" minLength='6' value={password} onChange={ e => onChange(e)} required />
                </div>
               
                <div className="form-group">
                    <button>Submit</button>
                 </div>





            </form>

        </div>



    </div>

        </Fragment>
    )
}

Login.propTypes ={
    setAlert: PropTypes.func.isRequired,

    isAuthenticated:PropTypes.bool,
    isProfile : PropTypes.object,

}

const mapStateToProps = state =>{
    return {
        isAuthenticated:state.auth.isAuthenticated,
        isprofile:state.profile
    }
}
 

export default connect(mapStateToProps,{ setAlert, login,loadUser}) (Login);


