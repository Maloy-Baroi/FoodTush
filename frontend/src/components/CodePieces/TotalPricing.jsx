import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import totalPricingStyle from './TotalPricing.module.css'
import Swal from 'sweetalert2'
import { useCookies } from 'react-cookie'

const TotalPricing = ({ subTotal, CheckoutOkay, delivery_address }) => {
    const [token] = useCookies(['myToken'])

    const navigator = useNavigate()
    const orderPlaceHandle = () => {
        fetch(`http://127.0.0.1:8000/main/order-update-api-view/`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + token['myToken']
            },
            body: JSON.stringify({
                'delivery_address': delivery_address
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
            response['alert'] === "Order Successfully Placed!!!" ? navigator('/') 
            : 
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: "Couldn't place the order!!!",
                showConfirmButton: false,
                timer: 1500
            })
        })
        .catch(error => console.log(error))
    }
    return (
        <div>
            <div className={`${totalPricingStyle.subtotal} ${totalPricingStyle.cf}`}>
                <ul>
                    <li className={`${totalPricingStyle.totalRow}`}>
                        <span className={`${totalPricingStyle.label}`}>Subtotal</span><span className={`${totalPricingStyle.value}`}>
                            ৳ {subTotal}
                        </span>
                    </li>
                    <li className={`${totalPricingStyle.totalRow}`}>
                        <span className={`${totalPricingStyle.label}`}>Shipping</span><span className={`${totalPricingStyle.value}`}>
                            ৳ 30.00
                        </span>
                    </li>
                    <li className={`${totalPricingStyle.totalRow} ${totalPricingStyle.final}`}>
                        <span className={`${totalPricingStyle.label}`}>Total</span><span className={`${totalPricingStyle.value}`}>
                            ৳ {parseFloat(subTotal) + 30.00}.0
                        </span>
                    </li>
                    <li className={`${totalPricingStyle.totalRow}`}>
                        {
                            CheckoutOkay === 'true' ? 
                            <Link to={"/checkout/" + parseFloat(subTotal)*7.759 + '/'} className={`btn btn-success btn-lg w-50 ` + totalPricingStyle.continue}>
                            Checkout
                            </Link>
                                :
                            <button className={`btn ${totalPricingStyle.continue}`} onClick={orderPlaceHandle}>Place Order</button>
                        }
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default TotalPricing
