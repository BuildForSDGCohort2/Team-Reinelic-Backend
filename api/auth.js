const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {
    check,
    validationResult
} = require('express-validator');
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const config = require('config');


//MODELS

const User = require('../models/User');



// @route GEt api/Auth
// @desc Test route
// @access Public

router.get('/', auth, async (req, res) => {

    // console.log(req.user.id);

    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);

    } catch (err) {
        console.log('error message')
        res.status(500).send('Server error');
    }


})

// @route POST api/Auth
// @desc Login route
// @access Public

router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'password is required').exists()
], async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array()
        });
    }

    const {
        email,
        password
    } = req.body;

    console.log(req.body);
    try {

        let user = await User.findOne({
            email
        });

        if (!user) {
            res.status(400).json({
                errors: [{
                    msg: "Invalid credentials"
                }]
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                errors: [{
                    msg: "Invalid credentials"
                }]
            })
        }

        const payload = {
            user: {
                id: user.id,
            }
        }
        jwt.sign(
            payload,
            config.get('jwtToken'),
            (err, token) => {
                if (err) throw err;
                res.json({
                    token
                })
            }
        )

    } catch (error) {
        console.log(error);
        res.status(500).send('Server error')
    }




})


module.exports = router;