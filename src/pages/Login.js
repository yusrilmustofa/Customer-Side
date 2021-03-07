import axios from 'axios'
import './style.css'
import React, { Component } from 'react'
import { base_url } from '../config'
export default class Login extends Component {
    constructor() {
        super()
        this.state = {
            username: "",
            password: "",
            message: "",
            logged: true
        }
    }
    Login = event => {
        event.preventDefault()
        let sendData = {
            username: this.state.username,
            password: this.state.password
        }
        let url = base_url + "/customer/auth"
        axios.post(url, sendData)
            .then(response => {
                this.setState({ logged: response.data.logged })
                if (this.state.logged) {
                    let customer = response.data.data
                    let token = response.data.token
                    localStorage.setItem("customer", JSON.stringify(customer))
                    localStorage.setItem("token", token)
                    this.props.history.push("/")
                } else {
                    this.setState({ message: response.data.message })
                }
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <html>
                <head>
                </head>
                <body>
                    <form className="box" onSubmit={ev => this.Login(ev)}>
                        <i class="fas fa-user" />
                        <h1>Login</h1>
                        <i class="fas fa-user"></i>
                        <h5 className="text-white m-1">Username</h5> 
                        <input type="text" className="form-control mb-1" value={this.state.username}
                            onChange={ev => this.setState({ username: ev.target.value })} required />
                        <h5 className="text-white"> Password </h5>
                        <input type="password" className="form-control mb-1" value={this.state.password}
                            onChange={ev => this.setState({ password: ev.target.value })}
                            autoComplete="false" required />
                        <input type="checkbox" onclick="Toggle()" />
                        <strong className="text-white">Show Password</strong>
                        <input type="submit" name="" value="Login" />
                    </form>
                    <div className="card-body">
                        {!this.state.logged ?
                            (
                                <div className="alert alert-danger mt-1">
                                    <h5 align="center"> {this.state.message} </h5>
                                </div>
                            ) : null}
                    </div>
                </body>
            </html>
        )
    }
}