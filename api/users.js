const express = require('express');
const router = express.Router();
const bcrytp = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {
    check,
    validationResult
} = require('express-validator');



//Model

const User = require('../models/User');

// router.post('/', (req, res) => res.send('Wonderful!!'))



// @route POST api/user
// @desc  Create a new user 
// @access Public

router.post('/', [
    check('name', 'Name  is required').not().isEmpty(),
    check('password', 'password is required').isLength({
        min: 6
    }),
    
    check('email', 'Please include a valid email').isEmail()

], async (req, res) => {


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }
    const {
        name,   
        email,
        password
    } = req.body;

    try {

        let user = await User.findOne({
            email
        });

        if (user) {
            return res.status(400).json({
                errors: [{
                    msg: 'User already exists'
                }]
            })
        }

        user = new User({
            name,
            email,
            password
        })

        //Encrypt password
        const salt = await bcrytp.genSalt(10);

        user.password = await bcrytp.hash(password, salt);

        await user.save();

        // Create token

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload,
            config.get('jwtToken'), {
                expiresIn: 360000
            },
            (err, token) => {
                if (err) throw (err)
                res.json({
                    token
                })
            }
        )

    } catch (error) {
        console.error(error);
        res.status(500).send("Server error")
    }
})



module.exports = router;