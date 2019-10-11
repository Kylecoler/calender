import React, {Component} from 'react'
import Axios from 'axios'
const eventAxios = Axios.create()

eventAxios.interceptors.request.use((config)=>{
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

class Events extends Component{
    constructor(){
        super()
        this.state={
            events:[]
        }
    }

componentDidMount(){
    eventAxios.get('/api/calendar').then(res =>{
        this.setState(()=>{
            return {events: res.data}
        })
    })
}

display=()=>{
    return this.state.events
}
    
render(){
    return(
        <div>
            {this.display()}
        </div>
        )
    }
}
        
export default Events