import React,{ Fragment }from 'react';
// import axios from 'axios';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {logout} from '../../actions/auth';
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faExclamationCircle} from '@fortawesome/free-solid-svg-icons';

import logo from '../../img/logo1.PNG';




 const Navbar = ({auth, logout}) => {
   
  const isAuth = auth.isAuthenticated;


  const guestLink = 
     (<nav className="navbar">
    <ul>

      <li className="navbar-logo"> <Link to="/"> <img src={logo} alt='logo'/> </Link></li>


    </ul>

    <ul className="navbar-access">
    
      <li> <Link to="/login"> Login</Link></li>
      <li><Link to="/register"> Sign Up</Link> </li>
     
     
    </ul>
  </nav>)

  const memberLink = 
  (<nav className="navbar">
  <ul>

  <li className="navbar-logo"> <Link to="/"> <img  alt='logo' src={logo}/> </Link></li>

  </ul>

  <ul className="navbar-access">
    <li> <FontAwesomeIcon icon={faExclamationCircle} /> <Link to ='/report'> Reports </Link></li>
    <li className="connect"> <FontAwesomeIcon icon={faUsers} /> <Link to ="/profiles">  Connect</Link> </li>
    <li><a href ='#!' onClick ={logout}> Logout</a> </li>
    <li> <Link to="/dashboard"> Dashboard</Link> </li>
    
  </ul>
</nav>)

return(
<Fragment>{isAuth?memberLink : guestLink}</Fragment>

)





 }

 Navbar.propTypes ={

  logout : PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired
}

const mapStateToProps =(state)=>{
  return{
    auth:state.auth
  }
}


export default connect(mapStateToProps,{logout}) (Navbar);