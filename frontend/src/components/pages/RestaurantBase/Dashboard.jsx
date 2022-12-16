import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import dashboardStyle from './Dashboard.module.css'

const Dashboard = () => {
    const [token] = useCookies(['myToken'])
    const [restaurantName, setRestaurantName] = useState("")
    const navigator = useNavigate()

    useEffect(() => {
        fetch('http://127.0.0.1:8000/restaurant/find-restaurant/', {
            method: 'GET',
            headers: {
                'Authorization': "Bearer " + token['myToken']
            }
        })
            .then(response => response.json())
            .then(response => {
                setRestaurantName(response['name'])
                response['error'] ? navigator('/signup-for-restaurant-step-two/') : navigator('/restaurant/dashboard/')
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-dark">
                <div className="container-fluid">
                    <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                        <i className='fa fa-bars'></i>
                    </button>
                    <div className='container'>
                        <Link className="navbar-brand text-white" to={'/restaurant/dashboard'}>
                            {restaurantName}
                        </Link>
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={"nav-link " } aria-current="page" to={'/'} style={{
                                    fontSize: "12px",
                                    color: 'lightblue'
                                }}>
                                    Powered By FoodTush.
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="offcanvas offcanvas-start w-25" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasExampleLabel">
                        {restaurantName}
                    </h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close">
                    </button>
                </div>
                <div className="offcanvas-body" style={{padding: '0'}}>
                    <div className="dropdown mt-3">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className={"nav-item"}>
                                <Link className={"nav-link " + dashboardStyle.sidebarItem} 
                                aria-current="page" to={'/restaurant/dashboard'}>
                                Orders
                                </Link>
                            </li>
                            <li className={"nav-item"}>
                                <Link className={"nav-link " + dashboardStyle.sidebarItem} 
                                aria-current="page" to={'/'}>
                                Orders
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div>
            </div>
        </div>
    )
}

export default Dashboard
