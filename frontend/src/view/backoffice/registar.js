import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

import axios from 'axios';
import AuthService from "../../view/auth.service";
import ip from '../../ip'
import authHeader from '../auth-header';



export default function RegistarComponent() {

    const [Nome, setNome] = useState("")
    const [Email, setEmail] = useState("")
    const [Pass, setPass] = useState("")
    const [Tlm, setTlm] = useState("")
    const [categorias, setCategorias] = useState([])
    const [categorias_cliente, setCategorias_cliente] = useState([])
    const navigate = useNavigate()

    useEffect(() => {

        
            axios.get(ip + '/livros/categorias', authHeader())
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    setCategorias(data);

                } else {
                    alert("Error Web Service!");
                }
            })
            .catch(error => {
                alert(error)
            });
    },[])
    function GuardarCategoria(id) {
        setCategorias_cliente(categorias_cliente + id)
    }
    function Registar() {
        axios
            .post(
                ip + '/clientes/new',
                {
                    nome: Nome,
                    email: Email,
                    tlm: Tlm,
                    password: Pass,
                    categorias_cliente: categorias_cliente,
                },
                authHeader()
            )
            .then(res => {
                if (res.data.success) {
                    alert("Conta de cliente registada! Vamos agora selecionar as suas categorias favoritas e livros lidos.");
                    navigate('/back-office/registar2/' + Email + '/' + Pass)
                    setEmail('')
                    setNome('')
                    setPass('')
                    setTlm('')
                }
            })
    }
    

    return (
        <div className='container-fluid vh-100 col overflow-auto  px-5 pt-4 bg-light'>
            <div className='justify-content-top align-items-left   d-flex flex-column '>
                    
                    <Link to='/'>
                    <i className='me-2 bi bi-arrow-left fs-2' style={{color: "Black"}}></i>
                       </Link>
                </div>
            <div className='justify-content-top align-items-center   d-flex flex-column '>
                
                
                <div className='h3 text-dark'>
                    Registar
                </div>
                <br></br>
                <input
                    // id='user-username-input'
                    className='form-control focus-warning text-dark w-25 rounded-3'
                    type='text'
                    placeholder='Nome'
                    autoComplete='none'
                    autoCapitalize='words'
                    required
                    value={Nome}
                    onChange={e => { setNome(e.target.value) }}
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
                    // id='user-username-input'
                    className='form-control focus-warning text-dark w-25 rounded-3'
                    type='text'
                    placeholder='Email'
                    autoComplete='none'
                    autoCapitalize='words'
                    required
                    value={Email}
                    onChange={e => { setEmail(e.target.value) }}
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
                    // id='user-username-input'
                    className='form-control focus-warning text-dark w-25 rounded-3'
                    type='text'
                    placeholder='Telemóvel'
                    autoComplete='none'
                    autoCapitalize='words'
                    required
                    value={Tlm}
                    onChange={e => { setTlm(e.target.value) }}
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
                    // id='user-username-input'
                    className='form-control focus-warning text-dark w-25 rounded-3'
                    type='password'
                    placeholder='Password'
                    autoComplete='none'
                    autoCapitalize='words'
                    required
                    value={Pass}
                    onChange={e => { setPass(e.target.value) }}
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
                <br></br>
               
               
                <button

                    className='btn btn-success w-20 fw-semibold'
                    onClick={() => Registar()}
                >
                    Registar

                </button>




            </div>
        </div>

    )
}