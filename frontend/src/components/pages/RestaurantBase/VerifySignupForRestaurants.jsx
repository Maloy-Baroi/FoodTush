import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'


const VerifySignupForRestaurants = () => {
    let { token } = useParams()
    const [password, setPassword] = useState("")
    const navigator = useNavigate()

    const waitForNextPage = async () => {
        setTimeout(() => {
            navigator('/restaurant/login/')
        }, 5000);
    }

    const onSeePassword = () => {
        const pwd = document.getElementById('password')
        const pwdShowIcon = document.getElementById('passwordShow')
        if (pwd.type === 'password') {
            pwd.type = 'text'
            pwdShowIcon.classList.remove('fa-eye')
            pwdShowIcon.classList.add('fa-eye-slash')
        }
        else {
            pwd.type = 'password'
            pwdShowIcon.classList.remove('fa-eye-slash')
            pwdShowIcon.classList.add('fa-eye')
        }
    }

    const onHandleSavePasswordAndVerification = (e) => {
        e.preventDefault()
        fetch('http://127.0.0.1:8000/auth/verify-email/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "auth_token": token,
                'password': password,
            })
        })
            .then(response => response.json())
            .then(response => {
                response['success'] ?
                    Swal.fire(
                        'Great',
                        response['success'] + " Login and fillup other details.",
                        'success'
                    )
                    :
                    Swal.fire(
                        'Great',
                        response['verified'] + " Login and fillup other details.",
                        'success'
                    )
                waitForNextPage()
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error,
                    footer: '<button onClick={onHandleSavePasswordAndVerification}>Try again</button>'
                })
            })
    }

    return (
        <div>
            <div className='row mt-5'>
                <div className='col-md-4'>
                </div>
                <div className='col-md-4'>
                    <form onSubmit={onHandleSavePasswordAndVerification}>
                        <legend htmlFor="password" className='text-center'>Write a login password</legend>
                        <input className='form-control' type={'password'} name='password' id='password' placeholder='Password' required={true} value={password} onChange={e => setPassword(e.target.value)} />
                        <button className='btn btn-transparent' onClick={onSeePassword} type="button">
                            <i className='fa fa-eye' id='passwordShow'></i>
                        </button>
                        <button className='btn btn-success w-100 mt-2' type="submit">
                            Setup & Go to login
                        </button>
                    </form>
                </div>
                <div className='col-md-4'>
                </div>
            </div>
        </div>
    )
}

export default VerifySignupForRestaurants
