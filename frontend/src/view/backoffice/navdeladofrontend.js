import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import ip from '../../ip'
import '../../styles/navdelado.css'

import authService from '../auth.service';
import authHeader from '../auth-header'

export default function Nav_Lado_frontend_Component(props) {
    const [useremail, setUseremail] = useState('')
    const [username, setUsername] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        

        setUsername(authService.getCurrentUser()?.username ?? 'User')
        setUseremail(authService.getCurrentUser()?.email ?? '...')

    }, [])



    return (
        <div className='col-12 col-sm-3 col-lg-2 col-sm-2 d-flex sticky-top px-0 bg-dark-secondary'>
            <div className='d-flex flex-sm-column flex-row flex-grow-1 align-items-center align-items-sm-start pt-2'>
                <ul id='menu' className='nav d-flex flex-row flex-sm-column h-100 w-100'>

                    
                    <li className='mb-2'>
                        <Link to='/back-office/livros'
                            className='btn btn-outline-secondary border-0 rounded-0 px-2 px-sm-0  d-flex'
                            onFocus={e => setTimeout(() => { e.target.blur() }, 200)}>
                            <span className=' d-none d-sm-inline  fs-5'>Os Meus Livros</span>
                        </Link>
                    </li>
                    <li className='mb-2'>
                        <Link to='/back-office/livros'
                            className='btn btn-outline-secondary border-0 rounded-0 px-2 px-sm-0  d-flex'
                            onFocus={e => setTimeout(() => { e.target.blur() }, 200)}>
                            <span className=' d-none d-sm-inline  fs-5'>Recomendações</span>
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

                                <li><button
                                    type='button'
                                    id='btn-users-modal'
                                    className='dropdown-item'
                                    data-bs-toggle="modal"
                                    data-bs-target="#users-modal"
                                    onClick={e => {
                                        // Isto executa uma função na modal para ir buscar outra vez a lista de users à BD
                                        document.querySelector('#refresh-users-list').click()
                                    }}
                                >
                                    <i className='bi bi-people me-2'></i>
                                    <span className='me-2'>Ver todos</span>
                                </button></li>

                                <li><hr className='dropdown-divider' /></li>

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