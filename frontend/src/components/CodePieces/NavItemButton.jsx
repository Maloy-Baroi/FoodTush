import React from 'react'
import { Link } from 'react-router-dom'
import navItemBtnStyle from './NavItemButton.module.css'

const NavItemButton = (props) => {
    return (
        <li className={'nav-item' + navItemBtnStyle.buttonStyle}>
            <Link to={props.path} className={navItemBtnStyle.link}>
                <i className={props.iconName}></i>
            </Link>
        </li>
    )
}

export default NavItemButton
