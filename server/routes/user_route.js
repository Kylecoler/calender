const express = require('express')
const User = require("../modules/user_module")
const userRouter = express.Router()
const jwt = require('jsonwebtoken')

userRouter.post('/signup', (req, res, next)=>{
    User.findOne({username: req.body.username}, (err, existingUser)=>{
        if(err){
            res.status(500).send(err)
        }
        if(existingUser !== null){
            res.status(400).send('User already exists')
            return next(new Error('User already exists'))
        }
        const newUser = new User(req.body)
        newUser.save((err, user)=>{
            if(err){
                res.status(500)
                return next(err)
            }
            const token = jwt.sign(user.withoutPassword(), process.env.SECRET)
            return res.status(201).send({success:true, user: user.withoutPassword(), token})
        })
    })
})

userRouter.post('/login', (req, res, next)=>{
    User.findOne({username: req.body.username.toLowerCase()}, (err, user)=>{
        if(err)return res.status(500).send(err);
        if(!user){
            return res.status(403).send({success: false, err:"Username and/or password are incorrect"});
        }
        user.checkPassword(req.body.password, (err, match)=>{
            if(err) return res.status(500).send(err);
            if(!match) res.status(401).send({success: false, message: "Username and/or password are incorrect"})
            const token = jwt.sign(user.withoutPassword(), process.env.SECRET);
            return res.send({token: token, user: user.withoutPassword(), success: true})
        })
    })
    // User.findOne({username: req.body.username.toLowerCase()}, (err, user)=>{
    //     if(err){ return next(err)}
    //     if(!user || user.password !== req.body.password){
    //         res.status(403)
    //         return next(new Error('username or password are incorrect'))
    //     }
    //     const token = jwt.sign(user.toObject(), process.env.SECRET)
    //     return res.send({token: token, user: user.toObject(), success: true})
    // })
})

module.exports = userRouter