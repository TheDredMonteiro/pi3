import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import ip from '../../ip'
import '../../styles/navdelado.css'

import authService from '../auth.service';
import authHeader from '../auth-header'

export default function Nav_Lado_Backend_Component(props) {

    const [username, setUsername] = useState('')
    const [useremail, setUseremail] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        

        setUsername(authService.getCurrentUser()?.username ?? 'User')
        setUseremail(authService.getCurrentUser()?.email ?? '...')

    }, [])



    return (
        <div className='col-12 col-sm-3 col-lg-2 col-sm-2 d-flex sticky-top px-0 bg-dark-secondary'>
            <div className='d-flex flex-sm-column flex-row flex-grow-1 align-items-center align-items-sm-start pt-2'>
            
                <div className='text-light text-center  w-100 mb-0 mb-sm-3' style={{ color: "white", fontSize: "25px",textShadow: "3px 3px 5px #000000" }}>AREA DE ADMIN</div>
                <ul id='menu' className='nav d-flex flex-row flex-sm-column h-100 w-100'>

                    
                    <li className='mb-2'>
                        <Link to='/back-office/livros'
                            className='btn btn-outline-secondary border-0 rounded-0 px-2 px-sm-0  d-flex'
                            onFocus={e => setTimeout(() => { e.target.blur() }, 200)}>
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className=' d-none d-sm-inline  fs-5' style={{ color: "white", fontSize: "20px" }}>Livros & Categorias</span>
                        </Link>
                    </li>
                    <li className='mb-2'>
                        <Link to='/back-office/clientes'
                            className='btn btn-outline-secondary border-0 rounded-0 px-2 px-sm-0  d-flex'
                            onFocus={e => setTimeout(() => { e.target.blur() }, 200)}>
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className=' d-none d-sm-inline  fs-5' style={{ color: "white", fontSize: "20px" }}>Clientes</span>
                        </Link>
                    </li>
                    <li className='mb-2'>
                        <Link to='/back-office/estatisticas'
                            className='btn btn-outline-secondary border-0 rounded-0 px-2 px-sm-0  d-flex'
                            onFocus={e => setTimeout(() => { e.target.blur() }, 200)}>
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className=' d-none d-sm-inline  fs-5' style={{ color: "white", fontSize: "20px" }}>Estatisticas</span>
                        </Link>
                    </li>


                    {/* User */}
                    <li className='mb-2 mt-auto'>
                        <div className='dropend py-sm-4 mt-sm-auto ms-auto ms-sm-0 flex-shrink-1'>
                            <Link
                                id='dropdown-user'
                                className='btn btn-outline-secondary border-0 rounded-0 px-2 px-sm-0 d-flex align-items-center dropdown-toggle'
                                to='#'
                                data-bs-toggle='dropdown'
                                aria-expanded='false'
                            >
                                <i className='bi bi-person fs-4 ms-sm-3 ms-md-4 me-sm-2'></i>
                                <span className='fs-6 mx-1'>
                                    {username}
                                </span>
                            </Link>

                            <ul className='dropdown-menu dropdown-menu-dark rounded-0 m-0' aria-labelledby='dropdown-user'>

                                

                                <li><button className='dropdown-item'
                                    onClick={e => { authService.logout(); props.setLogin(false); navigate('/'); }}
                                >
                                    <i className='bi bi-door-open me-2'></i>
                                    Log out
                                </button></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>


        </div>
    )
}