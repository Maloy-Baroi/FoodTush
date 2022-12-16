import React, { useState } from 'react'
import checkoutStyle from './Checkout.module.css'
import TotalPricing from '../../CodePieces/TotalPricing'
import { useParams } from 'react-router-dom'
import { useCookies } from 'react-cookie'

const Checkout = () => {
    const param = useParams()
    const [houseInCookies] = useCookies(['House'])
    const [areaInCookies] = useCookies(['Area'])
    const [cityInCookies] = useCookies(['City'])
    const [deliveryAddress, setDeliveryAddress] = useState(houseInCookies['House'] + ', ' + areaInCookies['Area'] + ', ' + cityInCookies['City'])

    return (
        <div style={{
            backgroundColor: "#fff"
        }}>
            <div className='row'>
                <div className='col-md-4'></div>
                <div className={'col-md-4 ' + checkoutStyle.main_checkout}>
                    <h2>Checkout</h2>
                    <label>Delivery Address</label>
                    <textarea onChange={e => setDeliveryAddress(e.target.value)} value={deliveryAddress} required>
                    {deliveryAddress ? deliveryAddress : "Write the delivery address"}
                    </textarea>
                    <div>
                    {deliveryAddress.length > 10 ?
                        <TotalPricing subTotal={Math.ceil(parseFloat(param['subTotal'])/7.759)} CheckoutOkay='false' 
                        delivery_address={deliveryAddress} />
                         :
                         ""
                        }
                    </div>
                </div>
                <div className='col-md-4'></div>
            </div>
        </div>
    )
}

export default Checkout
