import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FoodShowcasing from '../../CodePieces/FoodShowcasing';
import Navbar from '../../CodePieces/Navbar';
import Header from './Header';
import MenuShowcase from './MenuShowcase';

const RestaurantDetailsPage = () => {
  const restauID = useParams()
  const [foodItems, setFoodItems] = useState([]);
  const [thisRestaurant, setThisRestaurant] = useState();

  const restaurantDetails = () => {
    fetch(`http://127.0.0.1:8000/main/single-restaurant/${restauID['id']}/`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(response => {
        console.log(response)
        setThisRestaurant(response)
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    restaurantDetails()

    fetch(`http://127.0.0.1:8000/main/all-item-in-menu/${restauID['id']}/`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(response => {
        console.log(response)
        setFoodItems(response)
      })
      .catch(error => console.log(error)) 
  }, []);
  return (
    <div>
      <Navbar />
      {thisRestaurant? 
        <Header img={thisRestaurant['image']} restau_name={thisRestaurant['restaurant_name']} 
        rating={(thisRestaurant['rest_rating'].reduce((a, b) => parseInt(a) + parseInt(b), 0)/thisRestaurant['rest_rating'].length)*5} totalRated={thisRestaurant['rest_rating'].length}
        address={thisRestaurant.restaurant_address+", " + thisRestaurant.restaurant_area + " " + thisRestaurant.restaurant_city}
        restaurantType={(thisRestaurant.restaurant_type)} veg={false} vegan={false} />
        : ""}
      {foodItems.length > 0 ?
          <FoodShowcasing items={foodItems} />
        : ""}
    </div>
  );
}

export default RestaurantDetailsPage;
