import React, { useEffect, useState } from 'react'
import Navbar from '../../CodePieces/Navbar'
import homeStyle from '../../styles/Home.module.css'
import Hero from './Hero/Hero'
import SuggestToCreateAccount from '../../CodePieces/SuggestToCreateAccount'
import { useCookies } from 'react-cookie'
import RestaurantShowcase from './RestaurantShow/RestaurantShowcase'

const Home = () => {
    const [token] = useCookies(['myToken'])
    const [area] = useCookies(['Area'])
    const [city] = useCookies(['City'])
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        if (city['City']) {
            fetch(`http://127.0.0.1:8000/main/city-restaurants/${area['Area']}/${city['City']}/`, {
                method: 'GET'
            })
                .then(response => response.json())
                .then(response => {
                    console.log(response)
                    setRestaurants(response)
                })
                .catch(error => console.log(error))
        }
    }, []);

    return (
        <div>
            <div className={homeStyle.bg_img}>
                <Navbar background="bg-white" />
                <Hero />
            </div>
            {token['myToken'] ? "" : <SuggestToCreateAccount />}
            {restaurants.length > 0 ? <RestaurantShowcase restaurants={restaurants} /> : ""}
        </div>
    )
}

export default Home
