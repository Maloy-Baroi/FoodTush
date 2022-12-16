import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const VerifySignup = () => {
    let { token } = useParams()
    const [password, setPassword] = useState("")
    const navigator = useNavigate()

    const onHandleSavePasswordAndVerification = (e) => {
        e.preventDefault()
        fetch('http://127.0.0.1:8000/auth/verify-email/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "password": password,
                "auth_token": token,
            })
        })
        .then(response => response.json())
        .then(response => {
            alert("Going Back To Login Page")
            navigator('/login')
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: '<button onClick={onHandleSavePasswordAndVerification}>Try again</button>'
              })
        })
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

    return (
        <div className='row mt-5'>
            <div className='col-md-4'>
            </div>
            <div className='col-md-4'>
            <form>
                <legend htmlFor="password" className='text-center'>Write a login password</legend>
                <input className='form-control' type={'password'} name='password' id='password' placeholder='Password' required={true} value={password} onChange={e => setPassword(e.target.value)} />
                <button className='btn btn-transparent' onClick={onSeePassword} type="button">
                    <i className='fa fa-eye' id='passwordShow'></i>
                </button>
                <button className='btn btn-success w-100 mt-2' type="submit" onClick={onHandleSavePasswordAndVerification}>
                Setup & Go to login
                </button>
                </form>
            </div>
            <div className='col-md-4'>
            </div>
        </div>
    )
}

export default VerifySignup
