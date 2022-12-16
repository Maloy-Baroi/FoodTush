import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import Swal from 'sweetalert2'
import CustomizedButton from '../../../CodePieces/CustomizedButton'
import CustomizedInput from '../../../CodePieces/CustomizedInput'

const SignupForm = () => {
  const [email, setEmail] = useState("")

  const applyToSendVerificationEmail = (e) => {
    e.preventDefault()
    fetch('http://127.0.0.1:8000/auth/register-api-with-email/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'email': email,
        'groups': "Customer"
      })
    })
    .then(response => response.json())
    .then(response => {
      Swal.fire(
        'Great',
        response['success'],
        'success'
      )
    })
    .catch(error => console.log(error))
  }

  const onEmailChange = (inputValue) => {
    setEmail(inputValue)
  }

  return (
    <section>
      <div className='mt-5'>
        <div className='row'>
          <div className='col-md-4'></div>
          <div className='col-md-4'>
            <div className='row'>
              <div className='col-md-1'></div>
              <div className='col-md-9'>
                <form onSubmit={applyToSendVerificationEmail}>
                  <div className="mb-3">
                    <CustomizedInput value={email} onMyChange={onEmailChange} type="email" placeholder="Enter your email address"
                      label="What's your email?" hintMessage="Email should be unique" />
                  </div>
                  <CustomizedButton btnType="submit" innerText="Send Mail" bgColor="black" textColor="#fff"
                    icon="fa fa-envelope" />
                </form>
                <div>
                  <hr />
                  <div style={{ textAlign: "center" }}>OR</div>
                  <hr />
                </div>
                <div className='mb-3'>
                  <CustomizedButton innerText="Continue with Google" bgColor="#eee" textColor="#000" iconColor="#000"
                    icon="fa-brands fa-google" />
                </div>
                <div className='mb-3'>
                  <CustomizedButton innerText="Continue with Facebook" bgColor="#eee" textColor="#000" iconColor="#3b5998"
                    icon="fa-brands fa-facebook-square" />
                </div>
                <div className='mb-3'>
                  <CustomizedButton innerText="Continue with Twitter" bgColor="#eee" textColor="#000" iconColor=" #00acee"
                    icon="fa-brands fa-twitter" />
                </div>
              </div>
              <div className='col-md-1'></div>
            </div>
          </div>
          <div className='col-md-4'></div>
        </div>
      </div>
    </section>
  )
}

export default SignupForm
