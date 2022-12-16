import React, { useState } from 'react';
import signupStyle from './Signup.module.css'
import Navbar from './Navbar';
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

const SignupForRestaurantStepTwo = () => {
  const [token] = useCookies(['myToken'])
  const navigator = useNavigate()

  const [addressFormShow, setAddressFormShow] = useState(true)
  const [name, setName] = useState("")
  const [house, setHouse] = useState("")
  const [area, setArea] = useState("")
  const [city, setCity] = useState("")
  const [ownerName, setOwnerName] = useState("")
  const [restauPhone, setRestauPhone] = useState("")
  const [zone, setZone] = useState("")
  const [openningTime, setOpenningTime] = useState("")
  const [closeTime, setCloseTime] = useState("")
  const [foodType, setFoodType] = useState("")
  const [image, setImage] = useState("")
  const [termsAndConditions, setTermsAndConditions] = useState("")

  const onAddressSetup = () => {
    console.log(addressFormShow)
    const addressFormID = document.getElementById('addressFormID')
    addressFormShow == false ? setAddressFormShow(true) : setAddressFormShow(false)
    addressFormShow ? addressFormID.style.display = 'inline-flex' : addressFormID.style.display = 'none'
  }

  const formdata = new FormData();
  const date = new Date();


  formdata.append('restaurant_name', name)
  formdata.append('restaurant_owner_name', ownerName)
  formdata.append('restaurant_phone_number', restauPhone)
  formdata.append('restaurant_area', area)
  formdata.append('restaurant_city', city)
  formdata.append('restaurant_address', `${house}, ${area}, ${city}`)
  formdata.append('restaurant_country', 'Bangladesh')
  formdata.append('restaurant_open_time', openningTime)
  formdata.append('restaurant_closing_time', closeTime)
  formdata.append('restuarant_service_type', "Order Online")
  formdata.append('restaurant_type', foodType)
  formdata.append('image', image)
  formdata.append('terms_and_conditions', true)

  const restaurantSetUp = (e) => {
    e.preventDefault()
    fetch('http://127.0.0.1:8000/restaurant/restaurant-create/', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token['myToken']
      },
      body: formdata
    })
    .then(response => response.json())
    .then(response => {
      console.log(response)
      Swal.fire(
        'Congratulations!',
        'All Done!',
        'success',
      )
      navigator('/restaurant/dashboard')
    })
    .catch(error => console.log(error))
  }

  return (
    <div>
      <Navbar />
      <div>
        <div className={signupStyle.signupBody}>
          <div className='container'>
            <div className='row'>
              <div className='col-6'>
                <div className='content'></div>
              </div>
              <div className={'col-6 bg-light mt-5 ' + signupStyle.css_jvgTvV}>
              <form onSubmit={restaurantSetUp}>
                <div className='row'>
                  <h4 className={signupStyle.legend_css_begaQc}>Get Started</h4>
                  <input type={'text'} className={signupStyle.input_css_jtTSPd} value={name} onChange={e => setName(e.target.value)} placeholder={'Restaurant Name'} />
                  <div className={signupStyle.input_css_jtTSPd}>
                    <p type='button' onClick={onAddressSetup} style={{ cursor: 'pointer' }}>
                      Address
                      <i className='fa fa-caret-down float-end'></i>
                    </p>
                  </div>
                  <div className='row' id="addressFormID" style={{ display: 'none' }}>
                    <div className='col-md-4'>
                      <input type={'text'} className={signupStyle.input_css_jtTSPd} value={house} onChange={e => setHouse(e.target.value)} placeholder={'House No.'} />
                    </div>
                    <div className='col-md-4'>
                      <input type={'text'} className={signupStyle.input_css_jtTSPd} value={area} onChange={e => setArea(e.target.value)} placeholder={'Area'} />
                    </div>
                    <div className='col-md-4'>
                      <input type={'text'} className={signupStyle.input_css_jtTSPd} value={city} onChange={e => setCity(e.target.value)} placeholder={'City'} />
                    </div>
                  </div>
                  <input type={'text'} className={signupStyle.input_css_jtTSPd} value={ownerName} onChange={e => setOwnerName(e.target.value)} placeholder={'Owner Name'} />
                  <input type={'text'} className={signupStyle.input_css_jtTSPd} value={restauPhone} onChange={e => setRestauPhone(e.target.value)} placeholder={'phone_number'} />
                  <input type={'text'} className={signupStyle.input_css_jtTSPd} value={zone} onChange={e => setZone(e.target.value)} placeholder={'Serving zone'} />
                  <input type={'time'} className={signupStyle.input_css_jtTSPd} value={openningTime} onChange={e => setOpenningTime(e.target.value)} placeholder={'Openning Time'} />
                  <input type={'time'} className={signupStyle.input_css_jtTSPd} value={closeTime} onChange={e => setCloseTime(e.target.value)} placeholder={'Closing Time'} />
                  <input type={'text'} className={signupStyle.input_css_jtTSPd} value={foodType} onChange={e => setFoodType(e.target.value)} placeholder={'Food Type'} />
                  <input type={'file'} className={signupStyle.input_css_jtTSPd} onChange={e => setImage(e.target.files[0])} placeholder={'Logo/Image'} />
                  <label>
                    <input type={'checkbox'} /> Terms and Conditions
                  </label>
                  <div className='mt-3'>
                    <button className='btn btn-success w-100' type='submit'>Setup</button>
                  </div>
                </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupForRestaurantStepTwo;
