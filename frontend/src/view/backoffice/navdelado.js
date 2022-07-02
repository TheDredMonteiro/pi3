import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import ip from '../../ip'
import '../../styles/navdelado.css'
import LogoIncommun from '../../assets/imgs/logotipoincommun.png'

import authService from '../auth.service';
import authHeader from '../auth-header'

export default function NavDeLadoComponent(props) {

    const [pedidosPendentes, setPedidosPendentes] = useState(0)
    const [username, setUsername] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        axios
            .get(ip + '/pedidos/count?estado_id=1', authHeader())
            .then(res => {
                setPedidosPendentes(res.data.count)
            })

        let username = authService.getCurrentUser()?.username ?? 'User'
        setUsername(username)
    }, [])



    return (
        <div className='col-12 col-sm-3 col-lg-2 col-sm-2 d-flex sticky-top px-0 bg-dark-secondary'>
            <div className='d-flex flex-sm-column flex-row flex-grow-1 align-items-center align-items-sm-start pt-2'
            >
                <Link to='/' className='navbar-brand w-100 my-0 my-sm-4 text-light d-flex justify-content-start align-items-center'>
                    <img src={LogoIncommun} alt='incommun' className='w-75 ms-4' />
                </Link>

                {process.env.REACT_APP_MODE === 'development' &&
                    <div className='text-danger text-center  w-100 mb-0 mb-sm-3'>BAR ABERTO</div>
                }


                {/* <ul id='menu' className=' nav nav-pills d-flex flex-sm-column flex-row flex-nowrap flex-shrink-1 flex-sm-grow-0 flex-grow-1 mb-sm-auto mb-0 justify-content-center align-items-center align-items-sm-start'> */}
                <ul id='menu' className='nav d-flex flex-row flex-sm-column h-100 w-100'>

                    {/* Inicio */}
                    <li className='mb-2'>
                        <Link to='/back-office/'
                            className='btn btn-outline-secondary border-0 rounded-0 px-2 px-sm-0 d-flex align-items-center'
                            onFocus={e => setTimeout(() => { e.target.blur() }, 200)}
                        >
                            <i className='bi bi-house fs-4 ms-sm-3 ms-md-4 me-sm-2'></i>
                            <span className=' d-none d-sm-inline'>Início</span>
                        </Link>
                    </li>

                    {/* Inicio v2*/}
                    <li className='mb-2'>
                        <Link to='/back-office/inicio_v2'
                            className='btn btn-outline-secondary border-0 rounded-0 px-2 px-sm-0 d-flex align-items-center'
                            onFocus={e => setTimeout(() => { e.target.blur() }, 200)}
                        >
                            <i className='bi bi-house fs-4 ms-sm-3 ms-md-4 me-sm-2'></i>
                            <span className='d-none d-sm-inline '>
                                Inicio
                                <span className='badge bg-success px-1 ms-2'>v2</span>
                            </span>
                        </Link>
                    </li>

                    {/* Pedidos */}
                    <li className='mb-2'>
                        <Link to='/back-office/pedidos'
                            className='btn btn-outline-secondary border-0 rounded-0 px-2 px-sm-0 d-flex align-items-center'
                            onFocus={e => setTimeout(() => { e.target.blur() }, 200)}
                        >
                            <i className='bi bi-file-earmark-spreadsheet fs-4 ms-sm-3 ms-md-4 me-sm-2'></i>
                            <span className='d-none d-sm-inline'>
                                Pedidos
                                {pedidosPendentes > 0 &&
                                    <span className='badge bg-warning text-dark border-0 rounded-pill ms-2'>{pedidosPendentes}</span>
                                }
                            </span>
                        </Link>
                    </li>

                    {/* Formulário */}
                    <li className='mb-2'>
                        <Link to='/back-office/formularios'
                            className='btn btn-outline-secondary border-0 rounded-0 px-2 px-sm-0 d-flex align-items-center'
                            onFocus={e => setTimeout(() => { e.target.blur() }, 200)}
                        >
                            <i className='bi bi-ui-checks fs-4 ms-sm-3 ms-md-4 me-sm-2'></i>
                            <span className='d-none d-sm-inline '>
                                Formulários
                            </span>
                        </Link>
                    </li>


                    {/* Clientes */}
                    <li className='mb-2'>
                        <Link to='/back-office/clientes'
                            className='btn btn-outline-secondary border-0 rounded-0 px-2 px-sm-0 d-flex align-items-center'
                            onFocus={e => setTimeout(() => { e.target.blur() }, 200)}
                        >
                            <i className='bi bi-people fs-4 ms-sm-3 ms-md-4 me-sm-2'></i>
                            <span className='d-none d-sm-inline '>Clientes</span>
                        </Link>
                    </li>

                    {/* PieChart */}
                    <li className='mb-2'>
                        <Link to='/back-office/piechart'
                            className='btn btn-outline-secondary border-0 rounded-0 px-2 px-sm-0 d-flex align-items-center'
                            onFocus={e => setTimeout(() => { e.target.blur() }, 200)}
                        >
                            <i className='bi bi-pie-chart fs-4 ms-sm-3 ms-md-4 me-sm-2'></i>
                            <span className='d-none d-sm-inline '>Resumo</span>
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