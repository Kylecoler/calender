const express = require('express')
const App = express()
const mongoose = require('mongoose')
const expressJwt = require('express-jwt')
require('dotenv').config()

const port = process.env.port || 3003

App.use((err, req, res, next)=>{
    console.log(err)
    if(err.name === 'UnauthorizedError'){
        res.status(err.status)
    }
    return res.send({message: err.message})
})
App.use(express.json())
App.use('/auth', require('./routes/user_route'))
App.use('/api', expressJwt({secret: process.env.SECRET}))
App.use('/api/calendar', require('./routes/event_routes'))

mongoose.connect('mongodb://localhost:27017/calendar', {useNewUrlParser: true})
    .then(console.log("Connected to MongoDB"))
    .catch(err => console.log(err))

App. listen(port, ()=>console.log(`listening on port ${port}`)) 