import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import Swal from 'sweetalert2'
import CustomizedButton from '../../../CodePieces/CustomizedButton'
import CustomizedInput from '../../../CodePieces/CustomizedInput'

const LoginForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigator = useNavigate()
    const [token, setToken] = useCookies(['myToken'])

    const onHandleLogin = (e) => {
        e.preventDefault()
        console.log(email, password)
        fetch('http://127.0.0.1:8000/auth/login/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': email,
                'password': password
            })
        })
            .then(response => response.json())
            .then(response => {
                setToken('myToken', response['token']['access'])
                navigator('/')
            })
            .catch(error => console.log(error))
    }

    const onEmailChange = (inputValue) => {
        setEmail(inputValue)
    }

    const onPasswordChange = (inputValue) => {
        setPassword(inputValue)
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
                                <form onSubmit={onHandleLogin}>
                                    <div className="mb-3">
                                        <CustomizedInput value={email} onMyChange={onEmailChange} type="email" placeholder="Enter your email address" width="328px"
                                            label="Email" />
                                    </div>
                                    <div className="mb-3">
                                        <CustomizedInput value={password} onMyChange={onPasswordChange} type="password" placeholder="Enter password" width="328px"
                                            label="Password" />
                                    </div>
                                    <CustomizedButton btnType="submit" innerText="Login" bgColor="black" textColor="#fff"
                                        icon="fa fa-sign-in" />
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

export default LoginForm
