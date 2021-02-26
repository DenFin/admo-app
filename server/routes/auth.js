const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/', (req, res) => {
    res.json({
        message: "You are in auth route"
    })
})

router.get('/login', (req, res) => {
    res.json({
        message: "You are in auth login route"
    })
})

router.post('/login', (req, res) => {
    res.json({
        message: "You are in auth login route"
    })
})

router.post('/register', async (req, res) => {
    const { email, username, password, password2 } = req.body
    let errors = []

    console.log(req.body)


    // Check required fields
    if(!username || !email || !password){
        errors.push({ message: 'Please fill in all fields'})
    }

    // Check if user already exists in database

    // Check if passwords match
    if(password !== password2){
        errors.push({ message: 'Passwords do not match'})
    }

    // Check password length
    if(password.length < 6){
        errors.push({ message: 'Password should be at least 6 characters'})
    }

    if(errors.length > 0){
        res.status(403).json(errors)
    } else {

        // Create user
        const user = new User({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        })
        try {
            const newUser = await user.save()
            res.status(201).json(newUser)
        } catch (error) {
            res.status(400).json(error.message)
        }

    }

})




module.exports = router