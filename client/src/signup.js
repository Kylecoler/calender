import React, {Component} from 'react'
import Axios from 'axios'

class Signup extends Component{
    constructor(){
        super()
        this.state={
            user: JSON.parse(localStorage.getItem('user')) || {},
            token: localStorage.getItem('token') || '',
            username:'',
            password:'',
            errorMessage:''
        }
    }

    signup = (userInfo) =>{
        return Axios.post('/auth/signup', userInfo)
            .then(res =>{
                const {user, token} = res.data
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                this.setState({
                    user,
                    token
                })
                return res
            })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.signup(this.state)
            .then(()=> this.props.history.push('/calendar'))
            .catch(err=>{
                console.log(err)
                return(this.setState({errorMessage: err.data}))})
        this.setState({
            username:'',
            password:''
        })
    }

    handleChange=(e)=>{
        const {name, value} = e.target
        this.setState({[name]: value})
    }

    render(){
        return(
            <div>
                <form action="" onSubmit={this.handleSubmit}>
                    <h3>Sign Up</h3>
                    <input type="text"
                            onChange={this.handleChange}
                            value={this.state.username}
                            name='username'
                            placeholder='Username'/>
                    <input type="password"
                            onChange={this.handleChange}
                            value={this.state.password}
                            name='password'
                            placeholder='Password'/>
                    <button type="submit">Create Account</button>
                </form>
                {this.state.errorMessage && <p style={{color:'red'}}>{this.state.errorMessage}</p>}
            </div>
        )
    }
}

export default Signup