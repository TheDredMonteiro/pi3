import axios from 'axios';
// import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import React, { useEffect, useState, useCallback } from 'react';
import NavDeLado from './navdelado';
import ip from '../../ip'
import authHeader from '../auth-header';
import { useParams } from "react-router-dom";
import authService from '../auth.service';
import { Link, useNavigate } from "react-router-dom"

export default function AddCategoriaFComponent() {
    const [campNome, setcampNome] = useState("");
    const [filtroCategoria, setfiltroCategoria] = useState('id')
    const [ordemCategoria, setOrdemCategoria] = useState('ASC')
    const [categorias, setCategorias] = useState([])
    const navigate = useNavigate()
    const { id } = useParams();
    useEffect(() => {
        axios.get(ip + '/livros/categorias?ordem=' + ordemCategoria + '&filtro=' + filtroCategoria, authHeader())
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
    }, [filtroCategoria, ordemCategoria])
    
    function Add2(idl)
    {
        const div1 = document.getElementById(idl)
            
            const exampleAttr = div1.getAttribute('data-titulo');
        const datapost = {
           
            id: id,
            nome:exampleAttr,
            id_categoria: idl
            
        }
        console.log(datapost);
        axios
            .post(ip + '/clientes/add_categoria_cliente', datapost, authHeader())




            .then(res => {
                if (res.data.success) {

                    alert("Categoria Adicionada!");

                }
                else {
                    alert("Esta Categoria já é uma das tuas favoritas.");
                }
            })
            .catch(error => { alert(error); })
    }
    function handleFiltroCategoria(filtro, ordem, texto) {
        setfiltroCategoria(filtro);
        setOrdemCategoria(ordem);
        document.getElementById('dropdown-filtro-Categoria').textContent = texto
    }
    function LoadCategorias() {
        return (
            categorias.map(categoria => {
                return (
                    <tr className='align-middle' id={categoria.id} data-titulo={categoria.nome}  key={categoria.id} >
                        {/* Cliente */}
                        <td className='text-center text-dark lh-sm'>
                            <span className='fs-5 fw-semibold position-relative'>
                                {categoria.nome}
                            </span>

                        </td>
                        <td className='text-center text-dark lh-sm'>

                            <span className='fs-5 fw-semibold position-relative'>
                                <button

                                    className='btn btn-success w-25 fw-semibold'
                                    onClick={() => {Add2(categoria.id)}}
                                >
                                    <i className=' bi bi-check-lg fs-5 text-white'></i>

                                </button>
                            </span>
                        </td>
                    </tr>
                )
            })
        )
    }
    
    return (

        <div style={{padding: 0}} className=" vh-100  bg-light" >
 <nav style={{ height: '100px', width: '100%',padding: 0, zIndex: 10000 }} className='position-relative d-flex flex-row  bg-dark-secondary container-fluid vw-100'>
                &nbsp;&nbsp;
                <div className='align-items-right justify-content-center d-flex flex-column  w-25 mb-0' >
                    <h4 className='text-center align-items-right justify-content-center d-flex flex-column  w-100 mb-0' style={{ color: "white", textShadow: "3px 3px 5px #000000" }}>Livraria Monteiro</h4>
                    <h6 className='text-center align-items-right justify-content-center d-flex flex-column  w-100 mb-0' style={{ color: "white", textShadow: "2px 2px 4px #000000" }}>Encontra o teu livro</h6>

                </div>
                <div className='text-light align-items-center justify-content-center d-flex flex-column w-25 mb-0'>
                    <Link to={'/livraria/' + id}
                        className='btn btn-outline-secondary border-0  rounded-0 fs-5  d-flex'
                        onFocus={e => setTimeout(() => { e.target.blur() }, 200)}>
                        <span>Livraria</span>
                    </Link>
                </div>
                <div className='text-light align-items-center justify-content-center d-flex flex-column w-25 mb-0'>
                    <Link to={'/recomendados/' + id}
                        className='btn btn-outline-secondary border-0  rounded-0 fs-5  d-flex'
                        onFocus={e => setTimeout(() => { e.target.blur() }, 200)}>
                        <span>Recomendados</span>
                    </Link>
                </div>
                <div className='text-light align-items-center justify-content-center d-flex flex-column w-25 mb-0'>
                    <Link to={'/meuslivros/' + id}
                        className='btn btn-outline-secondary border-0  rounded-0 fs-5  d-flex'
                        onFocus={e => setTimeout(() => { e.target.blur() }, 200)}>
                        <span>Meus Livros</span>
                    </Link>
                </div>
                <div className='text-light align-items-center justify-content-center d-flex flex-column w-25 mb-0'>
                    <Link to={'/minhascategorias/' + id}
                        className='btn btn-outline-secondary border-0  rounded-0 fs-5  d-flex'
                        onFocus={e => setTimeout(() => { e.target.blur() }, 200)}>
                        <span>Categorias Favoritas</span>
                    </Link>
                </div>






                <div className='align-items-right justify-content-center py-sm-4 ' >
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
                            onClick={e => { authService.logout(); navigate('/');}}
                        >
                            <i className='bi bi-door-open me-2'></i>
                            Log out
                        </button></li>
                    </ul>
                </div>

                &nbsp;&nbsp;&nbsp;&nbsp;
            </nav>
            <br></br>
            <div  className=" justify-content-center align-items-center  d-flex flex-column " style={{ padding: 0}}>

            <div className=''>
                    <span className='h2 text-dark  fw-bold'>
                       Adicionar Categorias Favorita
                    </span>

                    <br />
                    <br />
                </div>
                
                </div>
                <br></br>
                <div className="mb-3 row">
                <div className='col d-flex justify-content-start align-items-center fs-6 fw-normal text-muted'>
                    <span className='me-2 text-dark  fw-bold'>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ver na ordem de
                    </span>

                    <div className="dropdown bg-white me-2">
                        <button className=" btn btn-sm btn-outline-dark dropdown-toggle" type="button" id="dropdown-filtro-Categoria" data-bs-toggle="dropdown" aria-expanded="false">
                            <span className='me-2'></span>
                            Data de criação
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdown-filtro-Categoria">
                            <li><button className="dropdown-item" onClick={e => { handleFiltroCategoria('nome', 'ASC', e.target.textContent) }} type='button'>Nome (A-Z)</button></li>
                            <li><button className="dropdown-item" onClick={e => { handleFiltroCategoria('nome', 'DESC', e.target.textContent) }} type='button'>Nome (Z-A)</button></li>
                            <li><button className="dropdown-item" onClick={e => { handleFiltroCategoria('createdAt', 'ASC', e.target.textContent) }} type='button'>Data de criação</button></li>
                        </ul>
                    </div>

                </div>
            </div>
            <div className="mb-3 row px-2">
                <div className='col p-3 '>
                    <table className='table'>
                        <thead>
                            <tr className=''>
                                <th className='text-center' style={{ width: '25%' }}>Nome</th>
                                <th className='text-center' style={{ width: '20%' }}></th>

                            </tr>
                        </thead>
                        <tbody>
                            <LoadCategorias />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )

}