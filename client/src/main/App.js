import React from 'react'
import Calender from './calendar'
import Navbar from './navbar'
import Login from './login'
import Signup from './signup'
import Events from './events'
import {Switch, Route} from 'react-router-dom'
import Protectroute from './protectroute'

const App = ()=>{

    return(
         <div>
            <Navbar/>
            <Switch>
                <Route exact path='/' component={Login}/>
                <Route path='/signup' component={Signup}/>
                <Protectroute path='/calendar' component={Calender}/>
                <Protectroute path='/events' component={Events}/>
            </Switch>
        </div>
    )
}

export default App