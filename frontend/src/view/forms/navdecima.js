import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import LogoIncommun from '../../assets/imgs/logotipoincommun.png'
import authService from '../auth.service';
const divStyle2 = {
    width: '100%',
    height: '350px',
    alignItems: 'center'

};
export default function NavDeCimaComponent(props) {
    const [username, setUsername] = useState('')
    const [useremail, setUseremail] = useState('')
    const navigate = useNavigate()

   
    useEffect(() => {


        setUsername(authService.getCurrentUser()?.username ?? 'User')
        setUseremail(authService.getCurrentUser()?.email ?? '...')

    }, [])
    return (
        <nav style={{ height: '100px', zIndex: 10000 }} className='position-relative d-flex flex-row  bg-dark-secondary'>

             <div className='align-items-right justify-content-center d-flex flex-column  w-25 mb-0' >
                <h3 className='text-center align-items-right justify-content-center d-flex flex-column  w-100 mb-0' style={{ color: "white",textShadow: "3px 3px 5px #000000" }}>Livraria Monteiro</h3>
                <h5 className='text-center align-items-right justify-content-center d-flex flex-column  w-100 mb-0' style={{ color: "white",textShadow: "2px 2px 4px #000000" }}>Encontra o teu livro</h5>
                
            </div>
           
            <div className='text-light align-items-center justify-content-center d-flex flex-column w-50 mb-0'>
                <Link to='/back-office/livros'
                    className='btn btn-outline-secondary border-0  rounded-0 fs-5  d-flex'
                    onFocus={e => setTimeout(() => { e.target.blur() }, 200)}>
                    <span>Meus Livros</span>
                </Link>
            </div>
            <div className='text-light align-items-center justify-content-center d-flex flex-column w-50 mb-0'>
                <Link to='/back-office/livros'
                    className='btn btn-outline-secondary border-0  rounded-0 fs-5  d-flex'
                    onFocus={e => setTimeout(() => { e.target.blur() }, 200)}>
                    <span>Categorias Favoritas</span>
                </Link>
            </div>
            
            




            <div className='align-items-right justify-content-center py-sm-4 '>
                <Link
                    id='dropdown-user'
                    className='btn btn-outline-secondary border-0 rounded-0  d-flex align-items-center dropdown-toggle'
                    to='#'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'
                >
                    <i className='bi bi-person fs-4'></i>
                    
                </Link>

                <ul className='dropdown-menu dropdown-menu-dark rounded-0 m-0' aria-labelledby='dropdown-user'>





                    <li><button className='dropdown-item'
                        onClick={e => { authService.logout();props.setLogin(false); navigate('/'); alert("logout");}}
                    >
                        <i className='bi bi-door-open me-2'></i>
                        Log out
                    </button></li>
                </ul>
            </div>

            &nbsp;&nbsp;&nbsp;&nbsp;
        </nav>
    )
}