import React, {Fragment,useEffect} from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import ProfileMain from './components/profile/ProfileMain';
import Register from './components/auth/Register';
import PrivateRoute from './components/dashboard/routing/PrivateRoute';
import Dashboard from './components/dashboard/Dashboard';
import Alert from './components/auth/Alert';
import {loadUser} from './actions/auth';
import Report from './components/report/Report';

import EditProfile from './components/profileforms/EditProfile';
import Flag from './components/Flag/Flag';
import AllProfile from './components/profile/AllProfile';
import AllReport  from './components/report/AllReport';
import ViewReport  from './components/report/ViewReport';
import ViewProfile from './components/profile/ViewProfile';


import setAuthToken from './utils/setauthtoken';

import './App.css';
// Redux imports
import {Provider} from 'react-redux';
import store  from './store';

if(localStorage.token){
  console.log("LOCAL STORAGE",localStorage.token)
  setAuthToken(localStorage.token)

}

const App = () =>{ 

  useEffect(()=>{
    store.dispatch(loadUser())
  },[])
  return (

<Provider store={store}> 
<Router>
  <Fragment >
    <Navbar />
    <Route exact path='/' component={Landing} />
     <Alert />
     <Switch>
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />  
      <Route exact path="/create-report" component={Report} />  
      <Route exact path="/flag" component={Flag} />  
      <Route exact path="/profiles" component={AllProfile} />  
      <PrivateRoute exact path="/dashboard" component ={Dashboard} />
      <PrivateRoute exact path="/create-profile" component ={ProfileMain} />
      <PrivateRoute exact path="/edit-profile" component ={EditProfile} />
      <PrivateRoute exact path="/report" component ={AllReport} />
      <PrivateRoute exact path="/report/:report_id" component ={ViewReport} />
      <PrivateRoute exact path="/profile/:profile_id" component ={ViewProfile} />

      
   
     </Switch>    
</Fragment>      

</Router>
</Provider>
)}

export default App;