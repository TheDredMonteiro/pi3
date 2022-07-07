import axios from 'axios';
// import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Count from './count'
import ip from '../../ip'
import authHeader from '../auth-header'
import mailImg from '../../assets/imgs/mail2.png'



export default function PedidosComponent() {

    const [pedidos, setPedidos] = useState([])
    const [totalPedidos, setTotalPedidos] = useState(0)
    const [estados, setEstados] = useState([])
    const [filtroPedido, setFiltroPedido] = useState('id')
    const [ordemPedido, setOrdemPedido] = useState('ASC')
    const [filtroEstadoPedido, setFiltroEstadoPedido] = useState(0)
    const [filtroEstadoPedidoDesc, setFiltroEstadoPedidoDesc] = useState('Todos os pedidos')

    const [dicaDoDia, setDicaDoDia] = useState('')
    const [autorDica, setAutorDica] = useState('')
    useEffect(() => {

        axios.get(ip + '/pedidos/all?ordem=' + ordemPedido + '&filtro=' + filtroPedido, authHeader() )
        .then(res => {
            if (res.data.success) {
                const data = res.data.data;
                setPedidos(data);
               
            } else {
                alert("Error Web Service!");
            }
        })
        .catch(error => {
            alert(error)
        });
    }, [filtroPedido,ordemPedido])


    useEffect(() => {
        // Get os pedidos todos (por vezes filtrados e ordenados)
        axios
            .get(ip + '/pedidos/all?estado_id=' + filtroEstadoPedido, authHeader())
            .then(res => {
                // console.log(res.data)
                setPedidos(res.data.data)
            })
    }, [filtroEstadoPedido])


    useEffect(() => {

        // Get total de pedidos
        // por defeito, sem mandar nenhuma query (nem estado nem dias),
        // conta todos os pedidos dos ultimos 30 dias
        axios.get(ip + '/pedidos/count?estado_id=0&oquecontar=todos', authHeader())
            .then(res => {
                setTotalPedidos(res.data.count)
            })

        // Get os estados todos que houver na bd (para o filtro/dropdown)
        axios.get(ip + '/pedidos/all_estados', authHeader())
            .then(res => {
                setEstados(res.data)
            })

        // Get dica do dia
        axios.get('https://api.quotable.io/random?tags=success|inspirational|happiness')
            .then(res => {
                setAutorDica(res.data.author)
                setDicaDoDia(res.data.content)
            })


    }, [])


    function LoadPedidos() {
        return (
            pedidos.map(pedido => {
                return (
                    <tr className='align-middle' key={pedido.id}>
                        {/* Data */}
                        <td className='text-center '>
                            <span className='text-muted badge fw-normal align-middle'>
                                {new Date(pedido.created_at).toISOString().split('T')[0]}
                            </span>
                        </td>
                        {/* Cliente */}
                        <td className='text-start text-dark lh-sm'>
                            <span className='fs-5 fw-semibold position-relative'>
                                {pedido.cliente.nome}
                            </span>
                            <span className='d-none fs-5 fw-semibold text-warning ms-2 '>
                                {'#' + pedido.cliente_id}
                            </span>
                            <br />
                            <span className='badge p-0 fw-semibold text-light-dark lh-sm'>
                                {pedido.cliente.empresa}
                            </span>
                        </td>
                        {/* Estado */}
                        <td className='text-start'>
                            <span
                                className={'badge text-start w-100 fw-semibold bg-' + pedido.estado_pedido.cor + '-semi text-' + pedido.estado_pedido.cor + ' fs-6'}
                                title={pedido.estado_pedido.obs}
                            >
                                <i className={'me-2 bi ' + pedido.estado_pedido.icon}></i>
                                {pedido.estado_pedido.descricao}
                            </span>
                        </td>
                        {/* Valor */}
                        <td className='text-end text-success fs-4 pe-3'>
                            {pedido.valor_total.toFixed(2)}
                        </td>

                        {/* Opções */}
                        <td className=''>
                            {(pedido.estado_id === 1 || pedido.estado_id === 2) &&
                                <button className='btn btn-warning w-100 fw-semibold' >
                                    <i className='me-2 bi bi-send-fill'></i>
                                    Contactar cliente
                                </button>
                            }
                            {(pedido.estado_id === 3 || pedido.estado_id === 4) &&
                                <button className='btn btn-warning w-100' disabled>
                                    <i className='me-2 bi bi-send-slash-fill'></i>
                                    Contactar cliente
                                </button>
                            }
                        </td>

                        <td className=''>
                            <button className='btn btn-secondary w-100'>
                                <i className='me-2 bi bi-card-checklist'></i>
                                Ver pedido
                            </button>
                        </td>

                        <td className=''>
                            <button className='btn btn-outline-secondary w-100'>

                                <i className='bi bi-gear-fill'></i>
                            </button>
                        </td>
                    </tr>
                )
            })
        )
    }
    function handleFiltro(filtro, ordem, texto) {
        setFiltroPedido(filtro);
        setOrdemPedido(ordem);
        document.getElementById('filtro_pedido').textContent = texto
    }

    function LoadEstados() {
        return (
            estados.map(estado => {
                return (
                    <li key={estado.id}>
                        <button
                            className="dropdown-item"
                            type='button'
                            onClick={e => {
                                setFiltroEstadoPedido(estado.id)
                                setFiltroEstadoPedidoDesc(estado.descricao + 's')
                            }}
                        >
                            {estado.descricao + 's'}
                        </button>
                    </li>
                )
            })
        )
    }

    return (


        <div className="col overflow-auto h-sm-100 px-5 pt-4">

            {/* Titulo */}
            <div className="mb-3 row">
                <div className='col-6'>
                    <span className='h2 text-dark fw-bold'>
                        Pedidos
                    </span>
                    <br />
                    <span className='fs-6 fw-normal text-muted'>
                        {'Foram criados ' + totalPedidos + ' pedidos nos últimos 30 dias.'}
                    </span>
                </div>
                <div className='col-6 text-end'>
                    <span className='fs-5 lh-sm text-indigo fw-bold ' title={dicaDoDia + ' - ' + autorDica}>
                        Dica do dia :)
                    </span><br />
                    <span className=' p-2 badge fw-normal bg-light lh-sm text-secondary text-end text-wrap w-75'>
                        {dicaDoDia + ' ~' + autorDica}
                    </span>
                </div>
            </div>

            {/* Contadores */}
            <div className='mb-4 g-3 row row-cols-1 row-cols-md-2 row-cols-lg-4 row-cols-xl-4'>
                <Count estadoId={1} oquecontar={"todos"}/>
                <Count estadoId={2} oquecontar={"todos"}/>
                <Count estadoId={3} oquecontar={"todos"}/>
                <Count estadoId={4} oquecontar={"todos"}/>

            </div>

            {/* Filtros */}
            <div className="mb-3 row">
                <div className='col d-flex justify-content-start align-items-center fs-6 fw-normal text-muted'>
                    <span className='me-2'>
                        Ver
                    </span>

                    <div className="dropdown bg-white me-2">
                        <button className=" btn btn-sm btn-outline-dark dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            <span className='me-2'>{filtroEstadoPedidoDesc}</span>
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li>
                                <button
                                    className="dropdown-item"
                                    type='button'
                                    onClick={e => {
                                        setFiltroEstadoPedido(0)
                                        setFiltroEstadoPedidoDesc('Todos os pedidos')
                                    }}>
                                    Todos os pedidos
                                </button>
                            </li>
                            <li><hr className="dropdown-divider" /></li>
                            <LoadEstados />
                        </ul>
                    </div>

                    <span className='me-2'>
                        na ordem de
                    </span>

                    <div className="dropdown bg-white me-2">
                        <button className=" btn btn-sm btn-outline-dark dropdown-toggle" type="button" id="filtro_pedido" data-bs-toggle="dropdown" aria-expanded="false">
                            <span className='me-2'>Pendentes mais antigos primeiro</span>
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><button className="dropdown-item" onClick={e => {handleFiltro('created_at','ASC',  e.target.textContent) }} type='button'>Mais antigos primeiro</button></li>
                            <li><button className="dropdown-item" onClick={e => {handleFiltro('created_at','DESC',  e.target.textContent) }} type='button'>Mais recentes primeiro</button></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><button className="dropdown-item" onClick={e => {handleFiltro('nome',            'ASC',  e.target.textContent) }} type='button'>Nome de cliente (A-Z)</button></li>
                            <li><button className="dropdown-item" onClick={e => {handleFiltro('nome',            'DESC',  e.target.textContent) }} type='button'>Nome de cliente (Z-A)</button></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><button className="dropdown-item" onClick={e => {handleFiltro('valor_total',            'DESC',  e.target.textContent) }} type='button'>Valor mais elevado primeiro</button></li>
                            <li><button className="dropdown-item" onClick={e => {handleFiltro('valor_total',            'ASC',  e.target.textContent) }} type='button'>Valor mais baixo primeiro</button></li>
                        </ul>
                    </div>

                </div>

                <div className='col'>
                    <button
                        type='button'
                        className='btn btn-primary'
                        data-bs-toggle="modal" data-bs-target="#modal-contactar"
                    >
                        Teste
                    </button>
                </div>
            </div>

            {/* Tabela */}
            <div className="mb-3 row px-2">
                <div className='col p-3 bg-white rounded-4 border shadow'>
                    <table className='table'>
                        <thead>
                            <tr className=''>
                                <th className='text-center' style={{ width: '10%' }}>Data</th>
                                <th className='text-start' style={{ width: '25%' }}>Cliente</th>
                                <th className='text-start' style={{ width: '15%' }}>Estado</th>
                                <th className='text-end position-relative' style={{ width: '12%' }}>Valor Total €</th>
                                <th className='text-center' style={{ width: '40%' }} colSpan={3}></th>
                            </tr>
                        </thead>
                        <tbody>
                            <LoadPedidos />
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Contactar cliente */}
            <div className="modal fade" id="modal-contactar" tabIndex="-1" aria-labelledby="modal-contactar-label" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg ">
                    {/* Versão 1 */}
                    <div className="d-none modal-content border-0 rounded-0">
                        <div className='container-fluid'>
                            <div className='row'>
                                <div className='col-4 bg-dark text-light p-3 pb-0 d-flex flex-column justify-content-between'>
                                    <div className="modal-header border-0">
                                        <div className="fs-1 fw-light text-warning modal-title" id="modal-contactar-label">Contactar cliente</div>
                                    </div>
                                    <img className='img-fluid' style={{}} src={mailImg} alt="" />
                                </div>

                                <div className='col-8 bg-light p-3  '>
                                    <div className="modal-body">
                                        ...
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-outline-secondary rounded-0" data-bs-dismiss="modal">Cancelar</button>
                                        <button type="button" className="btn btn-warning rounded-0 fw-semibold">Enviar email</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Versão 2 */}
                    <div className="modal-content border-0">
                        <div className="modal-header rounded-4 border-0">
                            <div className="modal-title fs-4 fw-light" id="exampleModalLabel">Contactar cliente</div>
                        </div>
                        <div className="modal-body">

                            <div className="form-floating mb-3">
                                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                                <label htmlFor="floatingInput">Email address</label>
                            </div>
                            <div className="form-floating">
                                <textarea className="form-control" rows={4} placeholder="Leave a comment here" id="floatingTextarea"></textarea>
                                <label htmlFor="floatingTextarea">Comments</label>
                            </div>

                        </div>
                        <div className="modal-footer border-0">
                            <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-warning fw-semibold">Enviar email</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>



    )
}