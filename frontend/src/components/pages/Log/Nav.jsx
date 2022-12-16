import React from 'react'
import { Link } from 'react-router-dom'
import loginNavStyle from './Nav.module.css'

const Nav = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg" style={{ background: "#000", padding: "0" }}>
                <div className="container-fluid" style={{ marginLeft: "50px", height: "64px" }}>
                    <Link className={"navbar-brand " + loginNavStyle.logo} to={'/'}>
                        <i className={'fas fa-utensils ' + loginNavStyle.logo_icon}></i> Foodtush.
                    </Link>
                </div>
            </nav>
        </div>
    )
}

export default Nav
