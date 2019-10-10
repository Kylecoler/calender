import React from 'react'
import {Route, Redirect} from 'react-router-dom'

function Protectroute(props){
    const token = localStorage.getItem('token')
    const {component: Component, ...rest} = props
    return(
        token ?
            <Route {...rest} component={Component}/>:
            <Redirect to='/'/>
    )
}

export default Protectroute