
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
import { faFlag} from '@fortawesome/free-solid-svg-icons';

export const DashboardIcons = () => {
    return (
        <Fragment>
            <div className="dashboard-icons">
                <ul>
                    <li>  <Link to ='/create-report' >Create a New Report</Link> </li> 
                    <li>   <FontAwesomeIcon icon={faFlag} />  <Link to ='/flag' > Flag</Link></li>
                    <li> <FontAwesomeIcon icon={faBullhorn} /> <Link to ='/alert' > Alert</Link></li>  
                    
                </ul>
            </div>
            
        </Fragment>
    )
}
