import React, {Fragment,useState } from 'react';
// import axios from 'axios';
import {connect} from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import {Link, Redirect} from 'react-router-dom';




const Register = ({setAlert,register,isAuthenticated}) => {

    const [formData,setFormData] =useState(
        {
            name:'',
            email:'',
            password:'',
            password2:''
        }
    );


    const {name, email, password, password2} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

    const onSubmit = async e =>{
        e.preventDefault();
        if(password !== password2){
            console.log('hello')
          setAlert('Password do not match','danger')
        } 
        else{
            register({name,email,password})
          

           


            /////////CALLING THE BACKEND WITH  AXIOS
            // const newUser ={
            //     name,
            //     email,
            //     password

            // }

            // try{
            //     const config ={
            //         headers:{
            //             'Content-Type':'application/json'
            //         }
            //     }

            //     const body = JSON.stringify(newUser);
            //     console.log(body)
            //     const res = await axios.post('/api/user',body,config)
            //     console.log(res.data)

            // }
            // catch (error){

            //     console.error(error)

            // }
        }
    }
    if(isAuthenticated){
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
                <small> Join the community of parents that are changing the culture</small>


                <div className="form-group">
                    <div className="form-label"> Name </div>
                    <input type="text" name="name" value={name} onChange={ e => onChange(e)} required  />
                </div>
                <div className="form-group">
                    <div className="form-label"> Email </div>
                    <input type="text" name="email"  value={email} onChange={ e => onChange(e)} required  />
                </div>
                <div className="form-group">
                    <div className="form-label"> Password</div>
                    <input type="password" name="password" minLength='6' value={password} onChange={ e => onChange(e)} required />
                </div>
                <div className="form-group">
                    <div className="form-label"> Password </div>
                    <input type="password" name="password2" value={password2} onChange={ e => onChange(e)} minLength='6' required />
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

Register.propTypes ={
    setAlert: PropTypes.func.isRequired,
    register : PropTypes.func.isRequired,
    isAuthenticated:PropTypes.bool
}

const mapStateToProps = state =>({
    isAuthenticated:state.auth.isAuthenticated
 })
 

export default connect(mapStateToProps,{ setAlert, register}) (Register);
// connect takes in any state you want to map, then action
//Set Alert allows to access props.setAlert