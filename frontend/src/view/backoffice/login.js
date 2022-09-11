import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

import axios from 'axios';
import AuthService from "../../view/auth.service";
import ip from '../../ip'
import authHeader from '../auth-header';



export default function LoginComponent(props) {

    const [loading, setLoading] = useState(false)
    const [clientes, setCliente] = useState([])
    const [userEmail, setUserEmail] = useState('')
    const [userPass, setUserPass] = useState('')
    const navigate = useNavigate()

    useEffect(() => {

    }, [])
function Cliente(userEmail, userPass)
{
    axios.get(ip + '/clientes/cliente?mail=monteiro@gmail.com&pass=123abcd', authHeader())
    .then(res => {
        setCliente(res.data.data)
    })
    .catch(console.log)
    alert(userEmail)
    alert(userPass)

}
    function HandleLogin(e) {
        e.preventDefault()
        setLoading(true)
        let btn = e.nativeEvent.submitter
        let btnText = document.getElementById('login-btn-text')

        

        AuthService
            .login(userEmail, userPass)
            .then(res => {

                if (res.success) {
                    props.setLogin(true)
                    alert(res.response.data.message)
                    navigate('/back-office/clientes')
                } else {
                   
                    AuthService
                    .login2(userEmail, userPass)
                    .then(res => {
        
                        if (res.success) {
                            
                            props.setLogin(true)
                            
                            alert(res.response.data.message)
                            
                            navigate('/back-office/frontLivros/' + userEmail + '/' + userPass)
                        } else {
                            alert(res.response.data.message)
                            console.log(res)
                            setLoading(false)
                            btn.classList.add('btn-danger')
                            btnText.textContent = res.response.data.message
                            setTimeout(() => {
                                btn.classList.remove('btn-danger')
                                btnText.textContent = 'Entrar'
                            }, 3000);
        
                            // alert(res.response.data.message)
                        }
        
                    })
                    
                }

            })
            
    }
    
    return (
        <div className='container-fluid vh-100 col overflow-auto  px-5 pt-4 bg-light text-dark'>
            <div className='justify-content-top align-items-left   d-flex flex-column '>
                    
                    <Link to='/'>
                    <i className='me-2 bi bi-arrow-left fs-2' style={{color: "Black"}}></i>
                       </Link>
                </div>
            <div className='justify-content-top align-items-center   d-flex flex-column '>
            <div className='h3 text-dark'>
                    Login
                </div>
                <br></br>
                
                
                

                    
                <input
                    // id='user-username-input'
                    
                    className='form-control focus-warning text-dark w-25 rounded-3'
                    type='text'
                    placeholder='Email'
                    autoComplete='none'
                    autoCapitalize='words'
                    required
                    value={userEmail}
                    onChange={e => { setUserEmail(e.target.value) }}
                    onInput={e => {
                        if (!e.target.validity.valid) {
                            e.target.classList.add('focus-danger')

                            if (e.target.validity.valueMissing) {
                                e.target.setCustomValidity('O titulo é de preenchimento obrigatório.')
                                e.target.reportValidity()
                            } else {
                                e.target.setCustomValidity('')
                                e.target.classList.remove('focus-danger')
                            }
                        }
                    }}
                />
                        &nbsp;
                   
                        <input
                            type="password"
                            width={100}
                            className="form-control focus-warning text-dark w-25  rounded-3"
                            id="user-pass-input"
                            placeholder="Password"
                            
                            required
                            value={userPass}
                            onChange={e => { setUserPass(e.target.value) }}
                            onInput={e => {
                                if (!e.target.validity.valid) {
                                    e.target.classList.add('focus-danger')

                                    if (e.target.validity.valueMissing) {
                                        e.target.setCustomValidity('A password é de preenchimento obrigatório.')
                                        e.target.reportValidity()
                                    } else {
                                        e.target.setCustomValidity('')
                                        e.target.classList.remove('focus-danger')
                                    }
                                }
                            }}
                        />
                       &nbsp;
                    <div className='justify-content-end'>
                    <button onClick={e => {HandleLogin(e)}} className='btn btn-success w-20  fw-semibold' width={100} type='submit' style={{ transition: '0.5s' }}>
                        {loading &&
                            <div className="spinner-border spinner-border-sm fs-6 text-dark me-2" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        }
                        <span id='login-btn-text'>Entrar</span>
                    </button>
                    </div>
                


            </div>
            
        </div>

    )
}