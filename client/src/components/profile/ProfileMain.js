import React ,{Fragment,useState} from 'react';
import {Link,withRouter} from 'react-router-dom';
import {connect } from 'react-redux';
import PropTypes from 'prop-types';
import {createProfile} from '../../actions/profile';






 const ProfileMain = ({createProfile,history}) => {

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
  
    const {name, category, work, address,contact,childNum} = formData;
   

    const[childrenData, setChildren] = useState(
        [
    
            {
                child_name: null,
                child_age : null,
                child_school :null,
               child_contact:null
            }
      ]
      );

    //   const[{child_name,child_age,child_school,child_contact}] = childrenData;


    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onChangeChild =(e) => {

    console.log(childrenData)

    let temp_children=[...childrenData];
   
    temp_children[e.target.dataset.id][e.target.name] = e.target.value;

    setChildren([...temp_children])

    

    setFormData({...formData,children : childrenData});

        
    }

    

    const onSubmit = (e) =>{
        e.preventDefault();
      
        createProfile(formData,history);
    }

    const addChildren  = async(e) =>{
    
        
        e.preventDefault(e);
        
        

        setChildren([...childrenData, 
            {
          child_name: null,
          child_age : null,
          child_school :null,
         child_contact:null}]) 
               
         
    }

   
  

    return (
        <Fragment> 
        <div className="profile">
        <div className="profile-search card card-full bg-blue py-2">

            <form >
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
                    
                     <button> Add Children</button>
                     
                     </span>
                </div>


            </div>
            <div className=" profile-main-review p-2">

             <span>Badge</span>

            </div>

            <div className="profile-main-form p-2">
 
           
                <form  onSubmit ={ e => onSubmit(e)} >
                    
                <div className="form-body">
           
                    <div className="form-group">
                        <div className="form-label"  > Name </div>
                        <input type="text" name ="name" onChange={e => onChange(e)}/>
                    </div>
                    <div className="form-group">
                        <div className="form-label"> Category </div>
                        <input type="text" name="category" value ={category}  onChange = {e =>onChange(e)}/>
                    </div>
                    <div className="form-group">
                        <div className="form-label" > Address</div>
                        <input name="address" value={address}  onChange = {e =>onChange(e)} type="text"/>
                    </div>
                    <div className="form-group">
                        <div className="form-label"> Work</div>
                        <input type="text" name="work" value ={work} onChange = {e =>onChange(e)}/>
                    </div>
                    <div className="form-group">
                        <div className="form-label" > Contact</div>
                        <input type="text" name="contact" value ={contact} onChange = {e =>onChange(e)}/>
                    </div>
                     <button onClick = {(e) => addChildren(e)} > Add a children</button>
                    <Fragment>

                        {

                         childrenData.map((child,index) => 
                         {
                        
                         return (
                             <Fragment key ={index}>
                             <h3> Please add  information for your children {index +1}:</h3>    
                            <div  className="form-group">
                            <div className="form-label" >Children Name</div>
                            <input  type="text"  data-id={index} name="child_name" value={childrenData.child_name}  onChange = {(e) =>onChangeChild(e)}/>
                           </div>
                            <div className="form-group">
                            <div className="form-label" >Children Age</div>
                            <input type="text" data-id={index} name ="child_age" value={childrenData.child_age} data ={index} onChange = {e =>onChangeChild(e)}/>
                           </div>
                           <div className="form-group">
                            <div className="form-label" > Children School</div>
                            <input type="text"  data-id={index} name="child_school" data-id={index} value={childrenData.child_school}   onChange = {e =>onChangeChild(e)}/>
                           </div>
                           <div  className="form-group">
                            <div className="form-label" >Children Contact</div>
                            <input type="text" data-id={index} name="child_contact" data-id={index}  value={childrenData.child_contact}  onChange = {e =>onChangeChild(e)}/>
                           </div>
                           </Fragment>

                         )
                         
                         }
                        )
                    }
                    </Fragment>

                     

                    
            
                    <div className="form-group">
                        <button > Create profile</button>
                     </div>

                </div>
        
        
        
                </form>
            

            </div>
           
            </div>
           

        </div>
            
        </Fragment>
    )

                }



ProfileMain.propTypes = {

    createProfile: PropTypes.func.isRequired,
}




export default connect(null,{createProfile}) (withRouter(ProfileMain));
