const express = require('express')
const App = express()
const mongoose = require('mongoose')
const expressJwt = require('express-jwt')
require('dotenv').config()
const path = require("path")

const port = process.env.PORT || 3003
const secret = process.env.SECRET || "banana"

App.use((err, req, res, next)=>{
    console.log(err)
    if(err.name === 'UnauthorizedError'){
        res.status(err.status)
    }
    return res.send({message: err.message})
})
App.use(express.json())
App.use('/auth', require('./routes/user_route'))
App.use('/api', expressJwt({secret: secret}))
App.use('/api/calendar', require('./routes/event_routes'))
App.use(express.static(path.join(__dirname, "client", "build")))

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/calendar', {useNewUrlParser: true})
    .then(console.log("Connected to MongoDB"))
    .catch(err => console.log(err))
App.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"))
})

App. listen(port, ()=>console.log(`listening on port ${port}`)) 