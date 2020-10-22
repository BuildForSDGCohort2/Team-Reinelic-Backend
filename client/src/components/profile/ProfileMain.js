import React ,{Fragment,useState} from 'react';
import {withRouter} from 'react-router-dom';
import {connect } from 'react-redux';
import PropTypes from 'prop-types';
import {createProfile} from '../../actions/profile';
import avatar from '../../img/avatar.png';
import {loadUser} from '../../actions/auth';







 const ProfileMain = ({auth,createProfile,history}) => {

    const [formData,setFormData] =useState(
        {
            name:'',
            category:'',
            work:'',
            address:'',
            contact:'',  
            available:'' ,
            photo:'',
            children :[],
            childNum:0
        }
    );
    

    const [file,setFile] = useState('')
  
    const {name, category, work, address,contact,available} = formData;

    let photoData ='' ;

    const onChangePhoto =(e) =>{
        e.preventDefault();
        // setFile(e.target.files[0])
         setFile( e.target.files[0])
     
     

     console.log(Array.from(photoData))

     
        
    }
   

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
       
        photoData = new FormData();
        photoData.append('file',file);
        // photoData.append('formData',formData);
       

    // for(var property in formData){
         
    //     if( typeof formData[property] ==='object'){
         
    //     console.log('I am inside the array')
    //             formData[property].forEach(elt =>{
    //               for(var prop in elt){
    //                   console.log(prop,elt[prop])
    //                   photoData.append(prop, elt[prop])
                    
    //               }
    //             })
    //     }
        
    //     console.log(typeof formData[property])

    //     photoData.append(property, formData[property])

    // }

    // console.log(Array.from(photoData));

       const edit = false;
        createProfile(formData,edit,history,photoData);
        
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

                <img src={avatar} alt=""/>
            </div>

            <div className="profile-main-about p-2">
    <p> Hello, {auth.name&&auth.user.name}</p>
               

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
                        <div className="form-label"   > Category </div>
                        <select name="category" id="categories" onChange = {e =>onChange(e)}  >
                        <option value="Father">Father</option>
                        <option value="Mother">Mother</option>
                        <option value="Tutor">Tutor</option>                   
                        </select>

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
                    <div  className="form-group">
                    <div className ="form-label"> Are you available as a committee member? </div>
                    <input type="radio"  name="available" value="available" onChange = {e =>onChange(e)} />
                    <label for="yes">Yes</label><br />
                    <input type="radio"  name="Unavailable" value="Unavailable" onChange = {e =>onChange(e)} />
                    <label for="no">No</label><br />
                    </div>
                    <div className="form-group">
                        <div className="form-label"> Work</div>
                        <input type="file" name="file"  onChange = {e =>onChangePhoto(e)}/>
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
                            <input type="text"  name ="child_age" value={childrenData.child_age} data-id ={index} onChange = {e =>onChangeChild(e)}/>
                           </div>
                           <div className="form-group">
                            <div className="form-label" > Children School</div>
                            <input type="text"  data-id={index} name="child_school"  value={childrenData.child_school}   onChange = {e =>onChangeChild(e)}/>
                           </div>
                           <div  className="form-group">
                            <div className="form-label" >Children Contact</div>
                            <input type="text" data-id={index} name="child_contact"  value={childrenData.child_contact}  onChange = {e =>onChangeChild(e)}/>
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
    auth:PropTypes.object.isRequired

    
}

const mapStateToProps =(state) =>({

    auth:state.auth

})


export default connect(mapStateToProps,{createProfile,loadUser}) (withRouter(ProfileMain));

// export default connect(mapStateToProps,{createProfile,getCurrentProfile}) (withRouter(EditProfile));