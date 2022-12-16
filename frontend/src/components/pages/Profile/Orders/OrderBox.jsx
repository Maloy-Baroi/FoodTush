import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import orderBox from './OrderBox.module.css'

const OrderBox = (props) => {
    const [token] = useCookies(['myToken']);
    const navigator = useNavigate()

    const onChangeOrderStatus = (orderID) => {
        fetch('http://127.0.0.1:8000/main/order-status-change-api-view/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token['myToken']
            },
            body: JSON.stringify({
                'order_id': orderID,
                'status': 'Completed'
            })
        })
        .then(response => response.json())
        .then(response => {
            console.log(response)
            navigator('/')
        })
        .catch(error => console.log(error))
    }

    return (
        <div className={orderBox.outterBox}>
            <div className={'row ' + orderBox.innerBox}>
                <div className='col-md-2'>
                    <img className={orderBox.image} src={props.restaurantLogo} alt={'Restaurant Image'} />
                </div>
                <div className='col-md-7'>
                    <div className='row'>
                        <h3 className={orderBox.title}>{props.restaurantName}</h3>
                    </div>
                    <div className='row'>
                        {props.order_items.map(foodItems => {
                            return (
                                <div className={'col-md-4 ' + orderBox.foodDesBox} key={foodItems.id}>
                                    <i className={orderBox.foodItem}>{foodItems.quantity}x{foodItems.get_food_name} &nbsp;</i>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className='col-md-3'>
                        <h5 className={orderBox.getTotal}>Tk. {props.getTotal}</h5>
                        <p className={orderBox.orderStatus}>
                            {props.orderStatus === 'Requested' ? "In Query" : props.orderStatus === 'Accepted' ? "Accepted" : props.orderStatus === 'Processing' ? "Processing": props.orderStatus === 'Collected' ? "Collected By Rider" : props.orderStatus === 'Delivered' ? 
                            <span>
                            Delivered?
                            <button className='btn btn-outline-success' onClick={() => onChangeOrderStatus(props.orderID)}>Got It</button>
                            </span> 
                            : props.orderStatus === 'Completed' ? <i className='text-success'>Completed</i> : props.orderStatus === 'Rejected' ? "Order Rejected" : "Searching Heros"}
                        </p>
                </div>
            </div>
        </div>
    );
}

export default OrderBox;
