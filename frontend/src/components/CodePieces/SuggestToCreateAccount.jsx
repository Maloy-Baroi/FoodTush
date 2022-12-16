import React from 'react'
import customerSugImg from '../../static/images/customer_signup_sug.png'
import restaurantSugImg from '../../static/images/restaurant_signup_sug.png'
import DeliveryManSugImg from '../../static/images/foodDeliverman.jpg'
import SuggestionCard from './SuggestionCard'

const SuggestToCreateAccount = () => {
    return (
        <div style={{ padding: "0 40px" }}>
            <div className='row'>
                <div className='col-md-4'>
                    <div>
                        <SuggestionCard path={'/signup'} width="100%" imageSrc={customerSugImg} alternative={"Customer"} 
                        headerText={'Add Customer'}
                        anchorText={"Create Account to Order"} />
                    </div>
                </div>
                <div className='col-md-4'>
                    <SuggestionCard path={'/signup-for-restaurant-step-one/'} width="100%" imageSrc={restaurantSugImg} alternative={"Restaurant"} 
                    headerText={'Your restaurant, delivered'}
                    anchorText={"Add your restaurant"} />
                </div>
                <div className='col-md-4'>
                    <SuggestionCard width="100%" imageSrc={DeliveryManSugImg} alternative={"Deliveryman"} 
                    headerText={'Deliver with Foodtush'}
                    anchorText={"Signup to deliver"} />
                </div>
            </div>
        </div>
    )
}

export default SuggestToCreateAccount
