const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {check,  validationResult} = require('express-validator');



//MODELS

const User = require('../models/User');
const Profile = require('../models/Profile');

//@ post api/report/
//@desc report a non compliant place
//@access public


router('/',async(req,res)=>{

    const
})





module.exports = router;