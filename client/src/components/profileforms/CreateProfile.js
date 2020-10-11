import React ,{Fragment,useState} from 'react';
import {connect } from 'react-redux';
import PropTypes from 'prop-types';
import addChildren from '../../actions/profile';
import ProfileSub from './ProfileSub';





 const ProfileMain = () => {

    const [formData,setFormData] =useState(
        {
            name:'',
            category:'',
            work:'',
            address:'',
            contact:'',
            children :[],
            childNum:0
        }
    );




    const {name, category, work, address,contact,children} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const addANewChildren =(e) => {
        console.log('I am adding a children');
        e.preventDefault(); 
        const newFormData ={...formData}      
        newFormData.children.push(<ProfileSub />)
        setFormData(newFormData);
      
        // setFormData(formData)

    }

   
  
  
   

    return (
        <Fragment> 
        <div className="profile">
        <div className="profile-search card card-full bg-blue py-2">

            <form action="">
                <span className="form-label">Search ...</span>
                <input type="text" name="search" value ={name} onChange={e => onChange(e)}/>

            </form>
        </div>

        <div className="profile-main">

            <div className=" profile-main-picture p-2">

                <img src="../img/profile-img.jpg" alt=""/>
            </div>

            <div className="profile-main-about p-2">
                <p>Jeremy Rose</p>
                <p>Work: Business Owner</p>

                <div className="my-3">
                    <span >ABOUT</span>
                     <span className="m-4"> 
                    
                     <button onClick = {(e) =>{ addANewChildren (e)}}> Add Children</button>
                     
                     </span>
                </div>


            </div>
            <div className=" profile-main-review p-2">

             <span>Badge</span>

            </div>

            <div className="profile-main-form p-2">
 

                <form >
                    
                <div className="form-body">
           
                    <div className="form-group">
                        <div className="form-label" name ="name" value ={name} onChange={e => onChange(e)} > Name </div>
                        <input type="text"/>
                    </div>
                    <div className="form-group">
                        <div className="form-label"> Category </div>
                        <input type="text" name="category" value ={category}  onChange = {e =>onChange(e)}/>
                    </div>
                    <div className="form-group">
                        <div className="form-label" name="address" value={address}  onChange = {e =>onChange(e)}> Address</div>
                        <input type="text"/>
                    </div>
                    <div className="form-group">
                        <div className="form-label"> Work</div>
                        <input type="text" name="work" value ={work} onChange = {e =>onChange(e)}/>
                    </div>
                    <div className="form-group">
                        <div className="form-label" name="contact" value ={contact} onChange = {e =>onChange(e)}> Contact</div>
                        <input type="number"/>
                    </div>
                    <div>

                        {
                         children.map((child) => <ProfileSub />)

                        }
                    </div>

                     

                    
            
                    <div className="form-group">
                        <button>next</button>
                     </div>

                </div>
        
        
        
                </form>
            

            </div>
           
            </div>
           

        </div>
            
        </Fragment>
    )
}




export default ProfileMain;
