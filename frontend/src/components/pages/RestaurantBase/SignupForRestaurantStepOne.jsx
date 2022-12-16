import React, { useState } from 'react'
import signupStyle from './Signup.module.css'
import Navbar from './Navbar';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

const SignupForRestaurantStepOne = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigator = useNavigate()

  const onSeePassword = () => {
    const passID = document.getElementById('passwordID')
    const seePasswordIconID = document.getElementById('seePasswordIconID')
    if (passID.type === 'text') {
      seePasswordIconID.classList.remove('fa-eye-slash')
      seePasswordIconID.classList.add('fa-eye')
      passID.type = 'password'
    }
    else {
      seePasswordIconID.classList.remove('fa-eye')
      seePasswordIconID.classList.add('fa-eye-slash')
      passID.type = 'text'
    }
  }

  const applyToSendVerificationEmail = (e) => {
    e.preventDefault()
    console.log("You clicked!")
    fetch('http://127.0.0.1:8000/auth/register-api-with-email/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'email': email,
        'groups': "RESTAURANT"
      })
    })
      .then(response => response.json())
      .then(response => {
        Swal.fire(
          'Great',
          "Now Check your email to verify, and fillup the other details",
          'success'
        )
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
                <form onSubmit={applyToSendVerificationEmail}>
                <div className='row'>
                  <h4 className={signupStyle.legend_css_begaQc}>Signup First</h4>
                  <input type={'email'} className={signupStyle.input_css_jtTSPd} value={email} onChange={e => setEmail(e.target.value)} placeholder={'Email'} />
                  <input type={'password'} className={signupStyle.input_css_jtTSPd} value={password} onChange={e => setPassword(e.target.value)} placeholder={'No Need to write password now'} id="passwordID" disabled />
                  
                  <div className='mt-3'>
                    <button type='submit' className='btn btn-success w-100'>Signup</button>
                    <p className='text-center'>
                      <Link to={'/restaurant/login'}>Login</Link>
                    </p>
                  </div>
                </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupForRestaurantStepOne
