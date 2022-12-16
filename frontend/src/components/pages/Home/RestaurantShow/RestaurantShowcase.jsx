import React from 'react';
import { Link } from 'react-router-dom';
import restaurantShowcasingStyle from './RestaurantShowcase.module.css'

const RestaurantShowcase = (props) => {
    return (
        <div>
            <div className='container mt-5'>
                <div className='row'>
                    {props.restaurants ?
                        props.restaurants.map(restaurant => {
                            return (
                                <div className={'col-md-6 mr-5 ' + restaurantShowcasingStyle.restaurantBox} 
                                key={restaurant.id}>
                                    <div className='row'>
                                        <div className='col-md-4 p-1'>
                                            <img src={restaurant.get_main_image} alt={restaurant.restaurant_name} style={{ width: "94%", height: "130px" }} />
                                        </div>
                                        <div className='col-md-8'>
                                            <div className='row'>
                                                <div className='col-md-9'>
                                                    <p>
                                                    <Link to={"/restaurant-details/"+restaurant.id+"/"} className={restaurantShowcasingStyle.restauName}>{restaurant.restaurant_name}</Link>
                                                    </p>
                                                </div>
                                                <div className='col-md-3'></div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-md-11 mt-2'>
                                                    <small>{restaurant.restaurant_type ? restaurant.restaurant_type :"Not specified"}</small>
                                                    <br />
                                                    <small>{restaurant.restaurant_address}, {restaurant.restaurant_area}, {restaurant.restaurant_city}</small>
                                                    <br />
                                                    <p className={restaurantShowcasingStyle.footerParagraph}>
                                                        <small className={restaurantShowcasingStyle}>
                                                            {restaurant.restaurant_open_time} - {restaurant.restaurant_closing_time}
                                                        </small>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        : ""}
                </div>
            </div>
        </div>
    );
}

export default RestaurantShowcase;
