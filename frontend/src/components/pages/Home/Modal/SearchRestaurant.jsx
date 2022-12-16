import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomizedButton from '../../../CodePieces/CustomizedButton';
import CustomizedInput from '../../../CodePieces/CustomizedInput';
import FoodShowcasing from '../../../CodePieces/FoodShowcasing';
import Hero from '../Hero/Hero';
import Navbar from '../../../CodePieces/Navbar';
import RestaurantShowcase from '../RestaurantShow/RestaurantShowcase'

const SearchRestaurant = () => {
    const navigate = useNavigate()
    const [searchingElement, setSearchingElement] = useState("");
    const [elementType, setElementType] = useState("");
    const [receivedElements, setReceivedElements] = useState([]);

    const changeSearchElement = (value) => {
        setSearchingElement(value)
    }

    const onSearchHandler = (e) => {
        e.preventDefault()
        const searchingPanel = elementType === "restaurant" ? "specific-restaurants" : "item-restaurants";
        fetch(`http://127.0.0.1:8000/main/${searchingPanel}/${searchingElement}/`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(response => {
                console.log("Response", response)
                setReceivedElements(response)
            })
            .catch(err => console.error(err));
    }

    return (
        <div>
            <Navbar />
            <div className='row' style={receivedElements.length === 0 ? {margin: "200px"} : {margin: "20px"} }>
                <div className='col-md-4'></div>
                <div className='col-md-4'>
                    <form onSubmit={onSearchHandler}>
                        <select className='form-select' value={elementType} onChange={(e) => setElementType(e.target.value)} style={{ height: "48px", margin: "20px 0", }}>
                            <option value={""}>---------</option>
                            <option value={"restaurant"}>Restaurant</option>
                            <option value={"food"}>Food</option>
                        </select>
                        <CustomizedInput type="text" value={searchingElement} onMyChange={changeSearchElement} placeholder={elementType === 'restaurant' ? "Restaurant Name" : elementType === 'food' ? "Food Name" : "-------------"} width="100%" />
                        <div className='text-center mt-3'>
                            <CustomizedButton btnType="submit" innerText="Search" bgColor="black" textColor="#fff"
                                icon="fa fa-search" />
                        </div>
                    </form>
                </div>
                <div className='col-md-4'></div>
            </div>
            <div>
            {elementType === 'food' ? <FoodShowcasing items={receivedElements} /> : elementType === 'restaurant' ? 
            <RestaurantShowcase restaurants={receivedElements} />
            : ""}
            </div>
        </div>
    );
}

export default SearchRestaurant;
