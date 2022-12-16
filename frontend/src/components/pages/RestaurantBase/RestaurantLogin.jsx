import React, { useState } from 'react'
import signupStyle from './Signup.module.css'
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie'

const RestaurantLogin = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [token, setToken] = useCookies(['myToken'])
    const [groups, setGroups] = useCookies(['group_name'])
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

    const submitToLogin = (e) => {
        e.preventDefault()
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
                if (response['user_group'] === 'restaurant') {
                    setToken('myToken', response['token']['access'])
                    setGroups('group_name', response['user_group'])
                    navigator('/restaurant/dashboard/')
                }
                else {
                    setEmail("")
                    setPassword("")
                }
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
                                <form onSubmit={submitToLogin}>
                                    <div className='row'>
                                        <h4 className={signupStyle.legend_css_begaQc}>Login</h4>
                                        <input type={'email'} className={signupStyle.input_css_jtTSPd} value={email} onChange={e => setEmail(e.target.value)} placeholder={'Email'} />
                                        <input type={'password'} className={signupStyle.input_css_jtTSPd} value={password} onChange={e => setPassword(e.target.value)} placeholder={'Password'} id="passwordID" />
                                        <p onClick={onSeePassword}>
                                            <i className='fa fa-eye' id="seePasswordIconID"></i> See Password
                                        </p>
                                        <div className='mt-3'>
                                            <button type='submit' className='btn btn-success w-100'>Signup</button>
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

export default RestaurantLogin
