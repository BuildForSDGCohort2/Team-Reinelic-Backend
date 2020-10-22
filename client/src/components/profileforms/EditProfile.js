import React ,{Fragment,useState,useEffect} from 'react';
import {Link,withRouter} from 'react-router-dom';
import {connect } from 'react-redux';
import PropTypes from 'prop-types';
import {createProfile} from '../../actions/profile';
import {getCurrentProfile} from '../../actions/profile';


export const EditProfile = ({profile:{profile,loading},createProfile,getCurrentProfile,history}) => {

    const [formData,setFormData] =useState(
        {
            name:'',
            category:'',
            work:'',
            address:'',
            contact:'',  
            childNum:0,
         
            
        }
    );
  
    const {name, category, work, address,contact,children,childNum} = formData;
   
    
 

    const[childrenData, setChildren] = useState(
        [

        ]
    
            
      
      );
      let userProfile;
      const [file,setFile] = useState('');
      let photoData ='' ;

      const onChangePhoto =(e) =>{
          e.preventDefault();
          // setFile(e.target.files[0])
           setFile( e.target.files[0])
       
       
  
       console.log(Array.from(photoData))
  
       
          
      }

      useEffect(()=>{
          getCurrentProfile();
          userProfile = profile

          let userChildren = userProfile&&userProfile.children
        
          if(userChildren){
          setChildren([...userChildren])
          }
          console.log('ChildrenData',childrenData)
         
         
          setFormData({
            name:loading || !profile.name ? '':profile.name,  
            category:loading || !profile.category ? '':profile.category,
            work:loading || !profile.work ? '':profile.work,
            address:loading || !profile.address ? '':profile.address,
            contact:loading || !profile.contact ? '':profile.contact,
            children:loading || !profile.children ? '': childrenData,
            

          })

          console.log('userprofile',userProfile)
        
      },[getCurrentProfile])

      let image = profile&&profile.picture;
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onChangeChild =(e) => {

        console.log(childrenData)

        let temp_children=[...childrenData];

        console.log('Temp Children', temp_children, e.target.value,e.target.name)
       
        temp_children[e.target.dataset.id][e.target.name] = e.target.value;
        
        console.log(childrenData)
    
        setChildren([...temp_children])

        
    
        
    
        setFormData({...formData,children : childrenData})


  
   
        
    }

    

    const onSubmit = (e) =>{
        e.preventDefault();
        photoData = new FormData();
        photoData.append('file',file);
        const edit = true;
        createProfile(formData,edit,history,photoData);
    }


    let child = 0
    const addChildren  = (e) =>{
        e.preventDefault(e);
        
        setChildren([...childrenData, 
            {
          'child_name': '',
          'child_age' : '',
          'child_school' :'',
         'child_contact':''
        }]) 
       
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
                        <input type="text" name ="name" value= {name} onChange={e => onChange(e)}/>
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
                             <h3> Please Edit  information for your children {index +1}:</h3>    
                            <div  className="form-group">
                            <div className="form-label" >Children Name</div>
                            <input  type="text" name="child_name" data-id ={index} value={childrenData[index].child_name}  onChange = {e =>onChangeChild(e)}/>
                           </div>
                            <div className="form-group">
                            <div className="form-label" >Children Age</div>
                            <input type="text" name="child_age" data-id ={index} value={childrenData[index].child_age}  data ={index} onChange = {e =>onChangeChild(e)}/>
                           </div>
                           <div className="form-group">
                            <div className="form-label" > Children School</div>
                            <input type="text" name="child_school" data-id ={index} value={childrenData[index].child_school}  data ={index}  onChange = {e =>onChangeChild(e)}/>
                           </div>
                           <div  className="form-group">
                            <div className="form-label" >Children Contact</div>
                            <input type="text" name="child_contact" data-id ={index}  value={childrenData[index].child_contact}   onChange = {e =>onChangeChild(e)}/>
                           </div>
                           </Fragment>

                         )
                         
                         }
                        )
                    }
                    </Fragment>

                     

                    
            
                    <div className="form-group">
                        <button > Edit  Profile</button>
                     </div>

                </div>
        
        
        
                </form>
            

            </div>
           
            </div>
           

        </div>
            
        </Fragment>
    )

                }



EditProfile.propTypes = {

    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired
}

const mapStateToProps = state =>{
    return{profile:state.profile}
}


export default connect(mapStateToProps,{createProfile,getCurrentProfile}) (withRouter(EditProfile));

