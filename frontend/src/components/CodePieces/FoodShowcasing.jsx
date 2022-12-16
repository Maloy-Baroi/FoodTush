import React from 'react';
import { useCookies } from 'react-cookie';
import foodShowcasingStyle from './FoodShowcasing.module.css'
import Swal from 'sweetalert2'

const FoodShowcasing = (props) => {
    const [token] = useCookies(['myToken'])

    const onHandleAddToCart = (food_id, restau_id) => {
        fetch('http://127.0.0.1:8000/main/add-to-cart/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token['myToken']
            },
            body: JSON.stringify({
                "food_menu_id": food_id,
                "restaurant_id": restau_id,
                "quantity": '1',
            })
        })
            .then(response => response.json())
            .then(response => {
                console.log(response)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: response['Success'],
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            .catch(error => console.log(error))
    }

    return (
        <div>
            <div className='container mt-5'>
                <div className='row'>
                    {props.items ?
                        props.items.map(item => {
                            return (
                                <div className='col-md-6 mr-5' key={item.id} style={{ marginBottom: "24px" }}>
                                    <div className='row'>
                                        <div className='col-md-4 p-1'>
                                            <img src={item.food_image} alt={item.food_name} style={{ width: "94%", height: "130px" }} />
                                        </div>
                                        <div className='col-md-8'>
                                            <div className='row'>
                                                <div className='col-md-9'>
                                                    <p className={foodShowcasingStyle.foodName}>{item.food_name}</p>
                                                </div>
                                                <div className='col-md-3'></div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-md-11'>
                                                    <small>{item.vegan ? "Vegan & Vegetarian" : item.veg === true && item.vegan === false ? "Only Vegetarian" : "Non Veg & Non-vegan"}</small>
                                                    <br />
                                                    <small style={{ marginTop: "20px" }}>{item.food_description}</small>
                                                    <br />
                                                    <p className={foodShowcasingStyle.footerParagraph}>
                                                        <small className={foodShowcasingStyle.price}>
                                                            &#2547; &nbsp; {item.food_price}
                                                        </small>
                                                        <button className='btn btn-outline-success' onClick={() => onHandleAddToCart(item.id, item.restaurant_id)}>Add to cart</button>
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

export default FoodShowcasing;
