import React ,{Fragment,useState,useEffect} from 'react';
import {connect} from 'react-redux';
import{Link, withRouter} from 'react-router-dom';
import { reportData} from '../../actions/report';
import {getAllProfile} from '../../actions/profile';
import  PropTypes from 'prop-types';




export const Report = ({ profile,reportData,report,getAllProfile,history}) => {


    useEffect(()=>{
            getAllProfile();
            let allProfiles = profile.profiles;
            console.log(allProfiles,allProfiles)

    },[profile.loading])

 const [formData,setFormData] = useState ({
    report_type:'',
    description:'',
    witness:'',
    location:''
 })



 const {
    report_type,
    description,
    witness,
    location

 } =formData

 const onChange =(e) =>{
     e.preventDefault();
     console.log(e.target)
     setFormData(
         {...formData,
            [e.target.name]:e.target.value
        });
     
 }

 const submit = (e)=>{

    e.preventDefault();

    reportData(formData,history)

    
 }




    return (
        <Fragment>

            <form  onSubmit = {(e) => submit(e)}>
                    
                    <div className="form-body">
               
                        <div className="form-group">
                            <div className="form-label"  > Type of abuse</div>
                            <select name="report_type" value ={report_type} onChange={e => onChange(e)} >
                                <option value="0">Select the type</option>
                                    <option value="Child Work">Child Work</option>
                                    <option value="Physical Molestation">Physical Molestation</option>
                                    <option value="Sexual Abuse">Sexual Abuse</option>
                                    <option value="Child trafficking">Child trafficking</option>
                                    <option value="Behaviour influence">Behaviour influence</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <div className="form-label"> Description of abuse</div>
                            <textarea  name="description" value={description} rows="4" cols="50" onChange = {e =>onChange(e)} ></textarea>
                        
                        </div>

                        <div className="form-group">
                            <div className="form-label" > Witness Number </div>
                            <input type="text" name="witness" value={witness}  onChange = {e =>onChange(e)}/>
                        </div>

                        <div className="form-group">
                            <div className="form-label"> Location</div>
                            <input type="text" name="location" value ={location} onChange = {e =>onChange(e)}/>
                        </div>
                       
                        <div className="form-group">
                        <button>REPORT</button>
                     </div>
                        </div>

                        
            
</form>
        </Fragment>)
    
}


Report.propTypes ={
    reportData : PropTypes.func.isRequired,
    getAllProfile:PropTypes.func.isRequired,
    report  : PropTypes.bool.isRequired,
    profile:PropTypes.object
}

const mapStateToProps =(state)=>{
 return {
     report: state.report,
     profile:state.profile
    
    }

}

export default connect(mapStateToProps,{reportData,getAllProfile }) (withRouter(Report));

// export default connect(mapStateToProps,{createProfile,getCurrentProfile}) (withRouter(EditProfile));