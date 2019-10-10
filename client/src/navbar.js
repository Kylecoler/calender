import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = ()=>{
    const Style={
        display:'grid',
        gridTemplateColumns:'repeat(auto-fit, minmax(30pt, 1fr))'
    }

    const logout=()=>{
        localStorage.removeItem('user')
        localStorage.removeItem('token')
    }

    const token = localStorage.getItem('token')

    return(
        <div style={Style}>
            {token ? 
                <>
                    <Link to='/calendar'>Calendar</Link>
                    <Link to='/events'>Events</Link>
                    <button onClick={logout}>Logout</button>
                </>:
                <>
                   <Link to='/'>Login In</Link>
                    <Link to='/signup'>Sign Up</Link> 
                </>
            }
        </div>
    )
}

export default Navbar