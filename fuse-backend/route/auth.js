const router = require('express').Router();
const User = require('../model/user')
const parking = require("../model/parking");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const auth = require("../middleware/auth");

router.post('/register', async (req, res) => {

    // Our register logic starts here
    try {
        // Get user input
        const { name, room_number, building_number, password, email } = req.body;

        // Validate user input
        if (!(email && password && name && room_number && building_number)) {
            res.status(400).send("All input is required");
        }
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }
        encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await User.create({
            name,
            room_number,
            building_number,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
        });

        // Create token
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "365d",
            }
        );
        user.token = token;

        // return new user
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
    // Our register logic ends here 
})


router.post('/login', async (req, res) => {

    // Our login logic starts here
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );

            // save user token
            user.token = token;

            // user
            res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }
    // Our register logic ends here 

})


router.get('/parking', auth, async (req, res) => {
    try {
        const userId = req.user.user_id;
        const query = {
            userId: userId,
        };
        const myParking = await parking.find(query);
        const otherSpots = {
            userId: {
                $ne: mongoose.Types.ObjectId(userId),
            },
        };

        console.log(otherSpots);

        const otherParking = await parking.find(otherSpots);
        console.log(otherParking);

        const result = {
            userParking: myParking,
            otherParking: otherParking,
        };

        res.status(201).json(result);
    } catch (err) {
        console.log(err);
        res.status(401).json({ message: err, notwork: 'not work' });
    }
})

router.post('/parking', auth, async (req, res) => {
    try {
        const userId = req.user.user_id;
        const userEmail = req.user.email;
        const { pletNumber } = req.body;
        const query = {
            pletNumber,
        };

        const parkingSpot = await parking.findOne(query);

        if ((!parkingSpot || !parkingSpot === null)) {

            const parkingData = await parking.create({
                type: req.body.type,
                pletNumber: req.body.pletNumber,
                howTime: req.body.howTime,
                name: req.body.name,
                userId: userId
            });

            res
                .status(201)
                .json({ isParked: true, message: "Car parked successfully", parkingData });
        } else {
            res
                .status(201)
                .json({ isParked: false, message: "Parking spot occupied already" });
        }
    } catch (err) {
        console.log(err);
        res.status(401).json({ isParked: false, message: err });
    }
})

router.delete('/parking', auth, async (req, res) => {
    try {
        const userId = req.user.user_id;
        const { pletNumber } = req.body;
        const query = {
            pletNumber,
        };

        const parkingSpot = await parking.findOne(query);
        if (parkingSpot) {
            const update = {
                $set: {
                    User: null,
                },
            };
            const result = await parking.findOneAndRemove(query, update);
            console.log(result);
            res.status(201).json({ status: true, message: "Parking cleared" });
        } else {
            res.status(201).json({ status: false, message: "Unsuccessful" });
        }
    } catch (err) {
        console.log(err);
        res.status(401).json({ status: false, message: err });
    }
})




module.exports = router;