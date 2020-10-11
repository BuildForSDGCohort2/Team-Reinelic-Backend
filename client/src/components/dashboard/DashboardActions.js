import React from 'react';

import{Link} from 'react-router-dom'

export const DashboardActions = () => {
    return (
        <div>

     <Link to ='/edit-profile' className ='btn'> Edit Profile</Link> 

            
        </div>
    )
}

export default DashboardActions;