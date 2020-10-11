
const express = require('express');
const router = express.Router();
const {
    check,
    validationResult
} = require('express-validator');
const auth = require('../middleware/auth');




//MODELS

const User = require('../models/User');
const Profile = require('../models/Profile');
const {Report} = require('../models/Report');
const{Investigation} =require('../models/Report');
// const {investigation} = require('../models/Report')



//@ post api/report/
//@desc  post a report  for any type of abuse
//@access public


router.post('/',[
    // check('reporttype','You need to choose a report type').exists(),
    // check('description','You need to describe your report').exists(),
    // check('location','You need to enter where the abuse was occuring i.e Place').exists(),
], async (req, res) => {

    console.log('Inside the api')

    console.log('req.body', req.body)

    const errors  = validationResult(req).Result;

    console.log(errors)


    if (errors) {
        res.status(400).json({
            errors:errors
        });
    }

    const {
       report_type,
        description,
        witness,
        location

    } = req.body.formdata;

   

    try {

     console.log('I am trying to save!!')


        let report = {
            report_type,
            description,
            witness,
            location


        } 

        
    
        let newReport =  await new Report(report)
        await newReport.save()
       

        let investigation  ={
            committe:[],
            status:'open',
            decision:'pending'
        }

        const newInv = new Investigation(investigation)

        await newInv.save()

        
        
        const profiles = await Profile.find().populate("user", ["name", "category"]);
        console.log('profiles',profiles)

        profiles.forEach((profile) =>{
            if(profile.availability ){
                console.log('how about ..')
                  newInv.committe.push(profile.user)
            }
        })
         console.log('The new Investigation', newInv);
        newReport.investigation.push(newInv);
                
        await newReport.save();

        console.log('newReport')
        console.log(newReport)

        res.json(newReport)



    } catch (error) {

        console.error(error.message);

    }
})

//@ put api/report/:report_id
//@desc  update a report
//@access private


// router.put('/:report_id', id,async(req,res)=>{

//     let report = await Report.findById({_id:req.params.report_id});
    
// })



//@ post api/report/
//@desc  post a report  for any type of abuse
//@access public
router.get('/',async(req,res)=>{
    try {
        const reports = await Report.find()

        res.json(reports);

    } catch (error) {

        console.error(message.error);

        res.status(500).send("Server error")

    }







})

//@ get api/report/:report:id
//@desc  get a report by id 
//@access private
router.get('/',async(req,res)=>{
    try {
        const reports = await Report.find()

        res.json(reports);

    } catch (error) {

        console.error(message.error);

        res.status(500).send("Server error")

    }







})



router.get('/:report_id', async (req, res) => {
    try {

        console.log('At least I am hitting the right routes here....')
        console.log('Request :',req.params)
        const report = await Report.findById(req.params.report_id).populate('user', ['mane', 'category']);
        console.log(report)

        if (!report) {
            return res.status(400).json({
                msg: 'There is no report set up for this account'
            })
        }

        res.json(report);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error")

    }


})




module.exports = router;