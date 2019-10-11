const express = require('express')
const eventRoute = express.Router()
const Event = require('../modules/event_module')

eventRoute.route('/')

    .get((req, res)=>{
        Event.find({user: req.user_id}, (err, get)=>{
            err ? res.status(500).send(err) : res.status(200).send(get)
        })
    })

    .post((req, res)=>{
        const newEvent = new Event(req.body)
        newEvent.user = req.user._id
        newEvent.save(err=>{
            err ? res.status(500).send(err) : res.status(200).send(newEvent)
        })
    })

eventRoute.route('/:id')
    
    .get((res, req)=>{
        Event.findOne({_id: req.params.id, user: req.user._id}, (err, event, next)=>{
            if(err){
                res.status(500)
                return next(err)
            }
            if(!todo){
                res.status(404)
                return next(new Error ('No event found'))
            }
            return res.send(event)
        })
    })

    .put((req, res, next)=>{
        Event.findOneAndUpdate(
            {_id:req.params.id, user: req.user._id},
            req.body,
            {new: true},
            (err, event)=>{
                if(err){
                    res.status(500)
                    return next(err)
                }
                return res.send(event)
            }
        )
    })

    .delete((req, res, next)=>{
        Event.findOneAndRemove({_id: req.params.id, user: req.user._id}, (err, event)=>{
            if(err){
                res.status(500)
                return next(err)
            }
            return res.send(event)
        })
    })

module.exports = eventRoute