import React from 'react'
import { useEffect, useState, useCallback } from 'react'
import { useCookies } from 'react-cookie'
import { Link } from 'react-router-dom'
import cartStyle from './CartView.module.css'
import Swal from 'sweetalert2'
import Navbar from '../../CodePieces/Navbar'
import TotalPricing from '../../CodePieces/TotalPricing'

const CartView = () => {
    const [cart, setCart] = useState([])
    const [token] = useCookies(['myToken'])
    const [restaurantID, setRestaurantID] = useState()
    const [restaurant_name, setRestaurant_name] = useState("")
    const [newQuantity, setNewQuantity] = useState()
    const [subTotal, setSubTotal] = useState(0)

    const cartFetching = async () => {
        await fetch('http://127.0.0.1:8000/main/cart-view/', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token['myToken']
            }
        })
            .then(response => response.json())
            .then(response => {
                setCart(response)
                setRestaurantID(response[0].restaurant)
                setRestaurant_name(response[0].get_restaurant)
                setSubTotal(0)
                response.map(res => {
                    setSubTotal(subTotal => subTotal + parseFloat(res.get_total))
                })
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        cartFetching()
    }, [])

    const updateCartItemQuantity = (cart_id, quantity) => {
        fetch(`http://127.0.0.1:8000/main/updated-cart-view/`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + token['myToken']
            },
            body: JSON.stringify({
                "cart_id": cart_id,
                "quantity": quantity
            })
        })
            .then(response => response.json())
            .then(response => {
                console.log(response)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: response['alert'],
                    showConfirmButton: false,
                    timer: 1500
                })
                cartFetching()
                // setCart(cart[cart_id], quantity)
            })
    }

    return (
        <div>
            <Navbar />
            <div className={`${cartStyle.wrap} ${cartStyle.cf}`}>
                <h1 className={`${cartStyle.projTitle}`}><span>Food Cart</span></h1>
                <div className={`${cartStyle.heading} ${cartStyle.cf}`}>
                    <h1>My Cart</h1>
                    {cart.length > 0 ?
                        <Link to={"/restaurant-details/" + restaurantID + '/'} className={`${cartStyle.continue}`}>
                            Continue Shopping
                        </Link>
                        : ""}
                </div>
                {cart.length > 0 ? cart.map(sc => {
                    return (
                        <div key={sc.id}>
                            <div className={`${cartStyle.cart}`}>
                                <ul className={`${cartStyle.cartWrap}`}>
                                <li className={`${cartStyle.items} ${cartStyle.odd}`}>
                                        <div className={`${cartStyle.infoWrap}`}>
                                            <div className={`${cartStyle.cartSection}`}>
                                                <img src="" alt="" className={`${cartStyle.itemImg}`} />
                                                <p className={`${cartStyle.itemNumber}`}>{sc.created}</p>
                                                <h3>{sc.get_food_name}</h3>
                                                <p>
                                                    <input type="text" className={`${cartStyle.qty}`} placeholder={sc.quantity}
                                                        onChange={(e) => {
                                                            if (e.target.value.length === 1) {
                                                                setTimeout(wifi, 3000)
                                                                function wifi() {
                                                                    if (window.confirm("Do you want to update your quantity?") == true) {
                                                                        updateCartItemQuantity(sc.id, e.target.value)
                                                                    }
                                                                }
                                                            }
                                                        }} />
                                                    x ৳{sc.get_food_price}
                                                </p>

                                                <p className={`${cartStyle.stockStatus}`}>{sc.get_restaurant}</p>
                                            </div>
                                            <div className={`${cartStyle.prodTotal} ${cartStyle.cartSection}`}>
                                                <p>৳ {sc.get_total}</p>
                                            </div>
                                            <div className={`${cartStyle.cartSection} ${cartStyle.removeWrap}`}>
                                                <Link onClick={() => {
                                                    if (window.confirm("Do you want to delete this item?") === true) {
                                                        updateCartItemQuantity(sc.id, 0)
                                                    }
                                                }} className={`${cartStyle.remove}`}>x</Link>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )
                }) :
                    <div>
                        <div className={`${cartStyle.cart}`}>
                            <h2>No Item found</h2>
                        </div>
                    </div>
                }
                {cart.length > 0 ? <TotalPricing subTotal={subTotal} CheckoutOkay='true' delivery_address={"none"} /> 
                : ""
            }
            </div>
        </div>
    )
}

export default CartView


// <div className = "promoCode" >
//     <label htmlFor="promo">Have A Promo Code?</label>
//     <input type="text" name="promo" placholder="Enter Code" />
//     <Link to="/" className="btn"></Link>
// </div>