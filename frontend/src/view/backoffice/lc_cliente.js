import axios from 'axios';
// import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import NavDeLado from './navdelado'
import Count from './count'
import ip from '../../ip'
import { useParams } from "react-router-dom";
import authHeader from '../auth-header';
import UpdateEstado from './update_estado';
import authService from '../auth.service';
import ContactarCliente from './contactar_cliente';

export default function LC_clienteComponent() {
    const [categorias, setCategorias] = useState([])
    const [categorias2, setCategorias2] = useState([])
    const [livros, setLivros] = useState([])
    const [totalClientes, setTotalClientes] = useState(0)
    const [filtroLivro, setFiltroLivro] = useState('id')
    const [ordemLivro, setOrdemLivro] = useState('ASC')
    const [filtroCategoria, setfiltroCategoria] = useState('id')
    const [ordemCategoria, setOrdemCategoria] = useState('ASC')
   
    const { idCliente } = useParams();
    function getLivros() {

        axios.get(
            ip + '/clientes/list_livros/' +
            '?cliente=' + idCliente +
            '&filtro=' + filtroLivro +
            '&ordem=' + ordemLivro,
            authHeader()
        )
            .then(res => {
                if (res.data.success) {
                    setLivros(res.data.data);

                }
            })
            .catch(error => { throw new Error(error) });
            axios.get(
                ip + '/clientes/list_categorias/' +
                '?cliente=' + idCliente +
                '&filtro=' + filtroCategoria +
                '&ordem=' + ordemCategoria,
                authHeader()
            )
                .then(res => {
                    if (res.data.success) {
                        setCategorias(res.data.data);
    
                    }
                })
                .catch(error => { throw new Error(error) });
    }
    useEffect(() => {
        getLivros()
    }, [idCliente, filtroCategoria, ordemCategoria,filtroLivro,ordemLivro])
    
    function handleFiltro(filtro, ordem, texto) {
        setFiltroLivro(filtro);
        setOrdemLivro(ordem);
        document.getElementById('dropdown-filtro').textContent = texto
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
                    <tr className='align-middle' key={categoria.id} id={categoria.id}>
                        {/* Cliente */}
                        <td className='text-center text-dark lh-sm'>
                            <span className='fs-5 fw-semibold position-relative'>
                                {categoria.nome}
                            </span>

                        </td>
                        <td className='text-center text-dark lh-sm'>

                            <span className='fs-5 fw-semibold position-relative'>
                                {categoria.n_livros}
                            </span>
                        </td>
                    </tr>
                )
            })
        )
    }
    function LoadLivros() {
        return (
            livros.map(livro => {
                return (
                    <tr className='align-middle' key={livro.id} id={livro.id}>
                        {/* Cliente */}
                        <td className='text-center text-dark lh-sm'>
                            <span className='fs-5 fw-semibold position-relative'>
                                {livro.titulo}
                            </span>

                        </td>
                        <td className='text-center text-dark lh-sm'>

                            <span className='fs-5 fw-semibold position-relative'>
                                {livro.autor}
                            </span>
                        </td>
                        <td className='text-center text-dark lh-sm'>

                            <span className='fs-6 fw-semibold position-relative'>
                                {livro.sinopse}
                            </span>
                        </td>
                        <td className='text-center text-dark lh-sm'>

                            <span className='fs-5 fw-semibold position-relative'>
                            {livro.categoria}
                            </span>
                        </td>
                        <td className='text-center text-dark lh-sm'>

                            <span className='fs-5 fw-semibold position-relative'>
                                {livro.classificacao}
                            </span>
                        </td>
                        <td className='text-center text-dark lh-sm'>
                            <img className="photo" width={"55%"} height={"55%"} src={livro.foto} alt="new" />
                        </td>


                    </tr>
                )
            })
        )
    }
    return (
        <div className="col overflow-auto h-sm-100 px-5 pt-4 bg-light">
            {/* Titulo */}
            <div className="mb-3 row" >
                <div className='col-6'>
                    <span className='h2 text-dark fw-bold'>
                        Livros & Categorias do Cliente
                    </span>
                    <br />
                </div>


            </div>
            
            <br></br>
            <span className='h5 text-dark fw-bold'>
                        Categorias
                    </span>
           
            <div className="mb-3 row">
                <div className='col d-flex justify-content-start align-items-center fs-6 fw-normal text-muted'>
                    <span className='me-2'>
                        Ver na ordem de
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
                <div className='col p-3 bg-white rounded-4 border shadow'>
                    <table className='table'>
                        <thead>
                            <tr className=''>
                                <th className='text-center' style={{ width: '25%' }}>Nome</th>
                                <th className='text-center' style={{ width: '10%' }}>Número de Livros</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            <LoadCategorias />
                        </tbody>
                    </table>
                </div>
            </div>
            <span className='h5 text-dark fw-bold'>
                        Livros
                    </span>
            <div className="mb-3 row">
                <div className='col d-flex justify-content-start align-items-center fs-6 fw-normal text-muted'>
                    <span className='me-2'>
                        Ver na ordem de
                    </span>

                    <div className="dropdown bg-white me-2">
                        <button className=" btn btn-sm btn-outline-dark dropdown-toggle" type="button" id="dropdown-filtro" data-bs-toggle="dropdown" aria-expanded="false">
                            <span className='me-2'></span>
                            Data de criação
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdown-filtro">
                            <li><button className="dropdown-item" onClick={e => { handleFiltro('titulo', 'ASC', e.target.textContent) }} type='button'>Título (A-Z)</button></li>
                            <li><button className="dropdown-item" onClick={e => { handleFiltro('titulo', 'DESC', e.target.textContent) }} type='button'>Título (Z-A)</button></li>
                            <li><button className="dropdown-item" onClick={e => { handleFiltro('created_at', 'ASC', e.target.textContent) }} type='button'>Data de criação</button></li>
                        </ul>
                    </div>

                </div>
            </div>
            <div className="mb-3 row px-2">
                <div className='col p-3 bg-white rounded-4 border shadow'>
                    <table className='table'>
                        <thead>
                            <tr className=''>
                                <th className='text-center' style={{ width: '25%' }}>Título</th>
                                <th className='text-center' style={{ width: '10%' }}>Autor</th>
                                <th className='text-center' style={{ width: '30%' }}>Sinopse</th>
                                <th className='text-center' style={{ width: '10%' }}>Categoria</th>
                                <th className='text-center' style={{ width: '5%' }}>Classificação</th>
                                <th className='text-center' style={{ width: '20%' }} >Foto</th>
                            </tr>
                        </thead>
                        <tbody>
                            <LoadLivros />
                        </tbody>
                    </table>
                </div>
            </div>



        </div>
    )
}