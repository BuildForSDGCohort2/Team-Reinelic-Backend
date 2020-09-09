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



            res.json(place)

        } catch (error) {

            console.error(error.message);
            res.status(500).send('Server error')

        }

    }
)



//@route get/place
//@desc get all the places 
//@access public


router.get('/', async (req, res) => {

    try {
        let places = await Place.find();
        if (!places) {
            res.status(400).json({
                msg: "There is no places "
            })
        }

        res.json(places)


    } catch (error) {
        console.error(message.error);
        res.status(500).send('server error')
    }

})


//@route get api /place/place_id
//@desc get one place 
//@access private

router.get('/:place_id', auth, async (req, res) => {

    try {

        let place = await Place.findById({
            _id: req.params.place_id
        })
        console.log(place)

        if (!place) {
            res.status(400).json({
                mgs: 'There is no place with that id '
            })
        }

        res.json(place)

    } catch (error) {
        console.error(message.error);
        res.status(500).send('server error')

    }
})


//@route get api/place/review/place_id
//@desc  post a review on a place
//@access private


router.post('/:place_id/review', [auth, [
        check('review_text', 'You must write something in your review').not().isEmpty()
    ]],
    async (req, res) => {

        console.log('Check if I have hit the route')
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400).json({
                errors: errors.array
            })
        }

        const {
            review_text
        } = req.body


        try {
            console.log('OK!')
            let place = await Place.findOne({
                _id: req.params.place_id
            });
            console.log(place)

            const new_review = {
                review_text,
                user: req.user.id
            }

            place.reviews.push(new_review);
            console.log(place)
            await place.save()

            res.json(place)

        } catch (error) {
            console.error(message.error);
            res.status(500).send('server error')
        }
    }
)




module.exports = router;