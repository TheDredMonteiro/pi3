import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import ip from '../../ip'
import authHeader from '../auth-header';
import { Link } from "react-router-dom"

export default function EstatisticasComponent() {
    const [categorias, setCategorias] = useState([])
    const [livros, setLivros] = useState([])
    const [filtroLivro, setFiltroLivro] = useState('id')
    const [ordemLivro, setOrdemLivro] = useState('ASC')
    const [filtroCategoria, setfiltroCategoria] = useState('id')
    const [ordemCategoria, setOrdemCategoria] = useState('ASC')
    const [filtroCliente, setFiltroCliente] = useState('id')
    const [ordemCliente, setOrdemCliente] = useState('ASC')
    const [clientes, setClientes] = useState([])
    const [count1, setCount1] = useState(0)
    const [count2, setCount2] = useState(0)

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
        axios.get(ip + '/livros/list?ordem=' + ordemLivro + '&filtro=' + filtroLivro, authHeader())
            .then(res => { setLivros(res.data.data) })
            .catch(console.log)
        axios.get(ip + '/livros/count?oquecontar=cliente', authHeader())
            .then(res => {
                setCount1(res.data.count)

            })
        axios.get(ip + '/clientes/list?ordem=' + ordemCliente + '&filtro=' + filtroCliente, authHeader())
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    setClientes(data);

                } else {
                    alert("Error Web Service!");
                }
            })
            .catch(error => {
                alert(error)
            });

    }, [filtroLivro, ordemLivro, filtroCategoria, ordemCategoria, filtroCliente, ordemCliente])

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
    function LoadClientes() {
        return (
            clientes.map(cliente => {
                return (
                    <tr className='align-middle' key={cliente.id} id={cliente.id} data-email={cliente.email}>
                        {/* Cliente */}
                        <td className='text-start text-dark lh-sm'>
                            <span className='fs-5 fw-semibold position-relative'>
                                {cliente.nome}
                            </span>

                        </td>
                        <td className='text-start text-dark lh-sm'>
                            <span className='fs-5 fw-semibold  position-relative'>
                                {cliente.email}
                            </span>

                        </td>

                        <td className='text-start text-dark lh-sm'>
                            <span className='fs-5 fw-semibold  position-relative'>
                                {cliente.n_livros}
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

                            <span className='fs-5 fw-semibold position-relative'>
                                {livro.categoria}
                            </span>
                        </td>
                        <td className='text-center text-dark lh-sm'>

                            <span className='fs-5 fw-semibold position-relative'>
                                {livro.n_lido}
                            </span>
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
                        Estatisticas
                    </span>
                    <br />
                </div>
            </div>
            <div className='mb-5 g-3 '>
                <div className='col'>
                    <div className='container-fluid rounded-4 border ps-4 bg-white shadow' style={{ width: '30%' }}>

                        <div className='row'>
                            <div className='col-2 py-2 d-flex align-items-center justify-content-center'>
                                <span className='me-1'>
                                    <i className={' text-primary bi bi-people fs-2'}></i>
                                </span>

                            </div>
                            <div className='col-6 d-flex align-items-center justify-content-center'>

                                <span className='fs-5 lh-sm text-dark '>
                                    Total Clientes:
                                </span>
                            </div>
                            <div className='col-2 d-flex align-items-center justify-content-center'>
                                <span className='fw-bold fs-4 p-1'>
                                    {count1}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-3 row px-2">
                <span className='h5 text-dark fw-bold'>
                    Categorias
                </span>
                <br></br>
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
            <div className="mb-3 row px-2">
                <span className='h5 text-dark fw-bold'>
                    Livros
                </span>
                <div className='col p-3 bg-white rounded-4 border shadow'>
                    <table className='table'>
                        <thead>
                            <tr className=''>
                                <th className='text-center' style={{ width: '25%' }}>Título</th>
                                <th className='text-center' style={{ width: '10%' }}>Autor</th>
                                <th className='text-center' style={{ width: '10%' }}>Categoria</th>
                                <th className='text-center' style={{ width: '20%' }} >Número de Vezes Lido</th>
                            </tr>
                        </thead>
                        <tbody>
                            <LoadLivros />
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="mb-3 row px-2">
            <span className='h5 text-dark fw-bold'>
                    Clientes
                </span>
                <div className='col p-3 bg-white rounded-4 border shadow'>
                    <table className='table'>
                        <thead>
                            <tr className=''>
                                <th className='text-start' style={{ width: '20%' }}>Nome</th>
                                <th className='text-start' style={{ width: '25%' }}>Contactos</th>
                                <th className='text-start' style={{ width: '10%' }}>Número de Livros</th>
                            </tr>
                        </thead>
                        <tbody>
                            <LoadClientes />
                        </tbody>
                    </table>
                </div>
            </div>



        </div>
    )

}