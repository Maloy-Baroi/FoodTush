import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import navStyle from '../styles/Navbar.module.css'
import NavItemButton from './NavItemButton'

const Navbar = (props) => {
  const navigator = useNavigate()
  const [token] = useCookies(['myToken'])

  return (
    <div>
      <nav className={"navbar navbar-expand-lg " + props.background + " " + navStyle.navHeight}>
        <div className="container">
          <Link className={"navbar-brand " + navStyle.logo} to={'/'}>
            <i className={'fas fa-utensils ' + navStyle.logo_icon}></i> Foodtush.
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={"collapse navbar-collapse " + navStyle.collapsed} id="navbarSupportedContent">
            {token['myToken'] ?
              <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                <i className={'fa fa-location ' + navStyle.locationPointingIcon}></i>
                <form className={"d-flex " + navStyle.locationForm} role="search">
                  <input className="form-control me-2" type="search" placeholder="Set Your Location" aria-label="Search" onFocus={() => navigator('/set-location')} />
                </form>
              </ul>
              : <ul className='navbar-nav mx-auto'></ul>}
            {token['myToken'] ?
              <ul className={'navbar-nav mr-auto'}>
                <NavItemButton path="/search-restaurant" iconName="fa fa-search" />
                <NavItemButton path={'/cart-view'} iconName="fa fa-shopping-cart" />
                <NavItemButton path={'/profile-view'} iconName="fa fa-user" />
              </ul>
              :
              <ul className={'navbar-nav mr-auto'}>
                <li className={'nav-item float-right'}>
                  <button className={'nav-link btn btn-white text-black ' + navStyle.loginBtn} onClick={() => navigator('/login')}>
                    <i className={'fa fa-user'}></i>  Login
                  </button>
                </li>
                <li className={'nav-item float-right'}>
                  <button className={'nav-link btn btn-white text-black ' + navStyle.signupBtn} onClick={() => navigator('/signup')}>
                    <i className={'fa fa-plus'}></i>  Signup
                  </button>
                </li>
              </ul>
            }
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
