const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
    check,
    validationResult
} = require('express-validator');
const config = require('config');


//MoDELS

const User = require('../models/User');
const Profile = require('../models/Profile');
const Place = require('../models/Place');




//@route post api/place
//@desc get all the places 
//@access public


router.post('/', [
        auth, [
            check('name', "Please enter the name of the place").not().isEmpty(),
            check('address', "Please enter the address  of the place").not().isEmpty(),
        ]
    ],
    async (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.send(400).json({
                errors: errors.array()
            })
        }

        const {
            name,
            address,
            category
        } = req.body


        try {

            let place = await Place.create({
                name,
                address,
                category
            })

            //Check if place already exist

            // 

            await place.save()

            res.json(place)

        } catch (error) {

            console.error(error.message);
            res.status(500).send('Server error')

        }

    }
)



//@route get/places
//@desc get all the places 
//@access public


router.get('/', async (req, res) => {

})

module.exports = router;