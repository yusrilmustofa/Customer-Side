import React,{Component} from 'react'
import {Link} from 'react-router-dom'

export default class Navbar extends Component{
    Logout = () =>{
        localStorage.removeItem("token")
        localStorage.removeItem("customer")
        window.location="/login"
    }
    render(){
        return(
            <div className="navbar navbar-expand-lg bg-dark navbar-dark">
                <a className="navbar-brand">
                    Yusril Computer Store
                </a>

                {/* show and hide menu */}
                <button className="navbar-toggler" data-toggle="collapse" data-target="#menu">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Menu */}
                <div className="navbar-collapse collapse" id="menu">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                Product
                            </Link>
                        </li>
                        
                        <li className="nav-item">
                            <Link to="/cart" className="nav-link">
                                Cart
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/transaction" className="nav-link">
                                Transaction
                            </Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" onClick={()=> this.Logout()}>
                                Logout
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}