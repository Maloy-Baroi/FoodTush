import React from 'react';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import OrderBox from './OrderBox';
import previousOrderStyle from './PreviousOrderStyle.module.css'

const PreviousOrders = () => {
    const [orders, setOrders] = useState([]);
    const [token] = useCookies(['myToken'])
    const [allOrders, setAllOrders] = useState([]);

    const getPreviousOrders = async () => {
        await fetch("http://127.0.0.1:8000/main/order-view/", {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + token['myToken']
          }
        })
          .then(response => response.json())
          .then(orders => {
            console.log(orders)
            setAllOrders(orders)
          })
          .catch(error => console.log('error', error));
      }

    useEffect(() => {
      getPreviousOrders()
    }, []);
  return (
    <div>
    <h2 className={previousOrderStyle.pastOrder}>Past Orders</h2>
      {allOrders ? allOrders.map(order => {
        return (
            order.status === 'Completed' ? 
            <div key={order.id}>
            <OrderBox restaurantLogo={order.restaurant.image} restaurantName={order.restaurant.restaurant_name} order_items={order.order_item} getTotal={order.get_totals} orderStatus={order.status} />
            </div>
            : ""
        )
      }) : "No Previous Order"}
    </div>
  );
}

export default PreviousOrders;
