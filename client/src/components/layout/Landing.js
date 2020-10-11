import React,{Fragment} from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link , Redirect} from 'react-router-dom';
import flag from '../../img/flag.svg';
import register from '../../img/register.svg';
import report from '../../img/report.svg';
import alert from '../../img/alert.svg';
import logo from '../../img/logo1.PNG';



 const Landing = ({isauth}) => {


    if(isauth){

      return (< Redirect  to ='/dashboard'/>)
    }

    return ( 
    
   

  <Fragment>

    <section className="landing">
    <div className="landing-start"> </div>
    <div className="landing-center"> </div>
    <div className="landing-end"></div>
    <div className="landing-text"> We Hope For A Bright Future .....</div>
    <div className="landing-text-left">For We Are On This Together</div>
  </section>
  
  <section class="about ">
    <div class=" card card-full   py-3">
      <img src="../../img/logo1.png" alt=""/>
      <p class="large py-1"> WHAT WE STAND FOR</p>
      <div><img src={logo} alt=""/></div>
      <p class="large py-1"> our Children...</p>
      <p class="lead m-5 p4">

        Mtoto  is a  community-based plateform that connect parents  in their effort to build a healtly and Safe <br/>
        environnement for their children

      </p>

    </div>
  </section>
  <section className="process">

  <p class="lead  p-1 "> THE PROCESS</p>

<section class="inner ">
 
<div class="   p-2 m-4">
       <div class='box'> </div>
      <div class="text-lead">1. Register and be part of the community</div> 
    </div>
    
    
    <div class=" card-small  p-4 ">
      <p class="lead"> Register and Fill your profile</p>
          To connect<span class="text-lead"> with Mtoto Community </span> <br/>
       <img class="svg" src={register}  width='600' alt=""/>
    </div>
  
  
  </section>


  

  <section class="inner-left my-10">
  <div class=" card-small bg-card p-4 ">
      <p class="lead"> Be on the lookout for the community</p>
          Report <span class="text-lead"> Child Abuse</span>  A committe of trusted parents will start the investigation <br/>
    
       <img class='svg' src={report}  alt=""/>
    </div>
    <div class="   p-2 m-2">
      <div class='box-left'> </div>
      <div class="text-left ">2. Fill a  Report   </div> 
      
    </div>

</section>


<section class="inner ">
<div class=" card-small  p-2 m-4">
     <div class="box">
      <span class="text-lead">3. Flag</span> 
     </div>
      
    </div>
    
    
    <div class=" card-small  p-4 ">
      <p class="lead"> Check and confirm how safe is the environnement</p>
           For our children,<span class="text-lead">  Let's Flag unsafe locations </span>, gathering places... <br/>
       <img  class ="svg" src={flag} width='600' alt=""/>
    </div>
 
</section>
<section class="inner-left ">
<div class=" card-small bg-card p-4 ">
      <p class="lead"> We are in this Together</p>
          create<span class="text-lead"> Alerts  </span>  and inform the community <br/>
       <img src={alert} width='600' alt=""/>
    </div>
    <div class=" card-small  p-2 ">
     <div class="box-left">
      <span class="text-lead">4. Alert and inform the community</span> 
     </div>
      
    </div>

</section>


  </section>
 
  
  <section class="footer p-3 bg-red ">
    <div>
      &copy; Copyright 2020 Mtoto
    </div>

  </section>



  </Fragment>

    )
}

Landing.propTypes ={
  isauth : PropTypes.bool,
}

const mapStateToProps =(state)=>{
  return{
    isauth: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps) (Landing);