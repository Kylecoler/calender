import React, { Component } from 'react';
import Axios from 'axios';

class LoginForm extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            errorMessage:''
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    clearInputs = () => {
        this.setState({
            username: "",
            password: ""
        })
    }

    login = (credentials)=>{
        return Axios.post('auth/login', credentials)
            .then(res=>{
                const {token, user} = res.data
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
        e.preventDefault();
        this.login(this.state)
            .then(()=>this.props.history.push('/calendar'))
            .catch(err=>{this.setState({errorMessage: err.data})})
    }

    render() {
        return (
            <div className="form-wrapper">
                <form onSubmit={this.handleSubmit}>
                    <h3>Log In</h3>
                    <input
                        onChange={this.handleChange}
                        value={this.state.username}
                        name="username"
                        type="text"
                        placeholder="username"/>
                    <input
                        onChange={this.handleChange}
                        value={this.state.password}
                        name="password"
                        type="password"
                        placeholder="password"/>
                    <button type="submit">Submit</button>
                </form>
                {this.state.errorMessage && <p style={{color:'red'}}>{this.state.errorMessage}</p>}
            </div>
        )
    }
}

export default LoginForm;