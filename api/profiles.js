const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
    check,
    validationResult
} = require('express-validator');
const request = require('request');
const config = require('config');
const fileUpload = require('express-fileupload');
const path = require('path');
// const multer = require('multer');
// const upload = multer({dest :'upload/'})

router.use(fileUpload(
    {
        debug:true
    }))



//Models
const User = require('../models/User');
const Profile = require('../models/Profile');


// @route GET api/profile/me
// @desc Get current user profile
// @access Public

router.get("/me",auth,  async (req, res) => {

        try {
            
            console.log('Getting my profile',req.user.id);
            
            const profile = await (Profile.findOne({
                user: req.user.id
            })).populate("user", ["name"]).populate("children");

            console.log(profile)

            if (!profile) {
                res.status(400).json({
                    msg: "There is no profile for this user"
                });
            }

            res.json(profile)
        } catch (error) {

    
            res.status(500).send("Server error")

        }
    }

);


// @route POST api/profile
// @desc  Create or update user profile
// @access Private

router.post('/photo',auth,async(req,res) =>{

   const file = req.files.file;


   const profile = await (Profile.findOne({
    user: req.user.id
})).populate("picture");


 console.log('profile',profile)
  let photoPath = path.join(__dirname,`../client/public/upload/${file.name}`);
  let sendPath =file.name

  try {

    profile.picture = sendPath;
    await profile.save()
      
  } catch (error) {
     console.error(error) 
  }
 
  console.log(photoPath)

   file.mv(`${photoPath}`,err =>{
       if(err){
           console.error(err);
           return res.status(500).send(err);
       }
    //    profile.picture = newPath;

    //    console.log(profile);
     
       res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
   })

})


router.post("/", [auth
    //     [
    //         check("children_name", "You must be a parent or tutor").not().isEmpty(),
    //         check("location", "You must enter your location").not().isEmpty(),
    //         check("category", "Your category can not be empty").not().isEmpty(),
    //         check("contact", " You must enter your contact number").not().isEmpty()

    //     ]
     ],
    async (req, res) => {

        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     res.status(400).json({
        //         errors: errors.array()
        //     })
        // }

        const {
           name,
            category,
            work,
            address,
            contact,     
            children,
            available,
            
            
            ...formdata
        } = req.body;

       console.log('I have also hit the second route')
     
      
   



        // photo.mv(`${__dirname}/client/public/${photo.name}`, err =>{
        //     if(err){
        //         console.error(err);
        //         return res.status(500)
        //     }

        //     res.json({
        //         fileName:photo.name,
        //         filePath:`uploads/${file.name}`
        //     })
        // })

      
       

      

        //build a profile field for more organisation

        const profilefields = {};

        profilefields.user = req.user.id;
        if (name) profilefields.name = name;
        if (category) profilefields.category = category;
        if (work) profilefields.work = work;
        if (address) profilefields.address = work;
        if (contact) profilefields.contact = contact;
        if (available) profilefields.available = available;

       
       
       
      

        try {

            let profile = await Profile.findOne({
                user: req.user.id
            });
            if (profile) {
                profile = await Profile.findOneAndUpdate({
                    user: req.user.id
                }, {
                    $set: profilefields
                }, {
                    new: true
                });

                console.log('child object')
                console.log(child)

                children.forEach((child) => {
                    profile.children.push(child)
                
                })
               

                await profile.save();

                return res.json(profile);

            }

            profile = new Profile(profilefields);
            // profile.children.push(children_name, children_school, children_contact);
            // console.log(profile.children)
            children.forEach((child) => profile.children.push(child))

            await profile.save();

            console.log('############################')

            console.log(profile)

            res.json(profile);

        } catch (error) {

            console.error(error.message);
            res.status(500).send('Server message')

        }



    }


)


// @route Get api/profile
// @desc  Get all the profile
// @access Public

router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate("user", ["name", "category"]);

        res.json(profiles);

    } catch (error) {

        console.error(message.error);

        res.status(500).send("Server error")

    }


});


// @route GET api/profile/user/:user_id
// @desc Get profile by userId
// @access Public


router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({
            'user': req.params.user_id
        }).populate('user', ['mane', 'category']);

        if (!profile) {
            return res.status(400).json({
                msg: 'There is no profile set up for this account'
            })
        }

        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error")
    }


})




// @route delete api/profile/user/:user_id
// @desc  Delete your profile
// @access Private 


router.delete('/', auth, async (req, res) => {

    try {
        await Profile.findOneAndRemove({
            user: req.user.id
        });
        await User.findOneAndRemove({
            _id: req.user.id
        })

    } catch (error) {
        console.error(err.message);
        res.status(500).send("Server Error");

    }


})



// @route GET api/profile/:profile_if
// @desc Get profile by userId
// @access Public


router.get('/:profile_id', async (req, res) => {
    try {

        console.log(req.body)
        const profile = await Profile.findById({
             _id:req.params.profile_id
        })

        if (!profile) {
            return res.status(400).json({
                msg: 'There is no profile set up for this account'
            })
        }

        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error")
    }


})




module.exports = router;