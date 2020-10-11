import React, {Fragment,useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

// import addAbout  from '../../actions/profile';

export const ProfileSub = ({addAbout}) => {

    const onSubmit = async e =>{}

    const onChange = e => setFormData({...formData1, [e.target.name]: e.target.value});
    const [formData1,setFormData] =useState(
        {
            child_name:'',
            child_age:'',
            child_school:'',
            child_contact:''
        }
    );


    const { child_name, child_age, child_school,child_contact} = formData1;

    return (
        <Fragment>
        

                   
                    <div className="form-group">
                        <div className="form-label" >Children Name </div>
                        <input type="text"  name ="child_name" value ={child_name} onChange={e => onChange(e)}/>
                    </div>
                    <div className="form-group">
                        <div className="form-label"> Children Age: </div>
                        <input type="text" name="child_age" value ={child_age} onChange = {e =>onChange(e)}/>
                    </div>
                    <div className="form-group">
                        <div className="form-label" >Children School</div>
                        <input type="text" name="child_school" value ={child_school} onChange = {e =>onChange(e)}/>
                    </div>
                    <div className="form-group">
                        <div className="form-label"> Children Contact</div>
                        <input type="text" name="child_contact" value ={child_contact} onChange = {e =>onChange(e)}/>
                    </div>
                    
                   
            
                 
            

        </Fragment>
    )
}



export default connect(null,) (ProfileSub);
