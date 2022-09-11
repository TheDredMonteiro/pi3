import axios from 'axios';
import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Count from './count'
import ip from '../../ip'
import authHeader from '../auth-header'

import ContactarCliente from './contactar_cliente';
import UpdateEstado from './update_estado';



export default function PedidosComponent() {

    const [pedidos, setPedidos] = useState([])
    const [totalPedidos, setTotalPedidos] = useState(0)
    const [estados, setEstados] = useState([])
    const [motivos, setMotivos] = useState([])
    const [Email, setEmail] = useState("")
    const [filtroPedido, setFiltroPedido] = useState('id')
    const [ordemPedido, setOrdemPedido] = useState('ASC')
    const [filtroEstadoPedido, setFiltroEstadoPedido] = useState(0)
    const [filtroEstadoPedidoDesc, setFiltroEstadoPedidoDesc] = useState('Todos os pedidos')

    const [dicaDoDia, setDicaDoDia] = useState('')
    const [autorDica, setAutorDica] = useState('')

    function getPedidos() {
        axios
            .get(
                ip + '/pedidos/all' +
                '?ordem=' + ordemPedido +
                '&filtro=' + filtroPedido +
                '&estado_id=' + filtroEstadoPedido,
                authHeader()
            )
            .then(res => { setPedidos(res.data.data) })
            .catch(console.log)
    }

    useEffect(() => {
        getPedidos()
    }, [filtroPedido, ordemPedido, filtroEstadoPedido])



    useEffect(() => {
        // Get total de pedidos
        // por defeito, sem mandar nenhuma query (nem estado nem dias),
        // conta todos os pedidos dos ultimos 30 dias
        axios.get(ip + '/pedidos/count?estado_id=0&oquecontar=todos', authHeader())
            .then(res => {
                setTotalPedidos(res.data.count)
            })

        axios.get(ip + '/pedidos/all_estados', authHeader())
            .then(res => { setEstados(res.data) })

        axios.get(ip + '/pedidos/all_motivos', authHeader())
            .then(res => { setMotivos(res.data) })

        // Get dica do dia
        axios.get('https://api.quotable.io/random?tags=success|inspirational|happiness')
            .then(res => {
                setAutorDica(res.data.author)
                setDicaDoDia(res.data.content)
            })
    }, [])
    function mudarEmail(id) {
        const div1 = document.getElementById(id)
        const exampleAttr = div1.getAttribute('data-email');
        setEmail(exampleAttr);
    }
    function handleFiltro(filtro, ordem, texto) {
        setFiltroPedido(filtro);
        setOrdemPedido(ordem);
        document.getElementById('filtro_pedido').textContent = texto
    }

    function LoadPedidos() {

        return (
            pedidos.map(pedido => {
                return (
                    
                    <tr className='align-middle' key={pedido.id} id={pedido.cliente.id} data-email={pedido.cliente.email}>
                        {/* Data */}
                        
                        <td className='text-start '>
                            <span className='text-muted badge p-0 fw-normal align-middle'>
                                {new Date(pedido.created_at).toISOString().split('T')[0]}
                            </span>
                        </td>
                        {/* Cliente */}
                        <td className='text-start text-dark lh-sm'>
                            <span className='fs-5 fw-semibold position-relative'>
                                {pedido.cliente.nome}
                                
                            </span>
                            <br />
                            <span className='fs-6 fw-semibold text-light-dark lh-sm'>
                                {pedido.cliente.email}
                            </span>
                        </td>
                        {/* Estado */}
                        <td className='text-start'>
                            <div className='dropdown'>
                                <button
                                    className={
                                        'btn btn-sm btn-light border-0 w-100 text-start' +
                                        ' d-flex justify-content-between align-items-center  dropdown-toggle ' +
                                        ' bg-' + pedido.estado_pedido.cor +
                                        '-semi text-' + pedido.estado_pedido.cor +
                                        ' focus-' + pedido.estado_pedido.cor + ' fs-6'
                                    }
                                    type='button'
                                    data-bs-toggle='dropdown'
                                    data-bs-auto-close='outside'
                                    title={pedido.estado_pedido.obs}
                                >
                                    <span>
                                        {/* <i className={'ms-1 me-2 bi ' + pedido.estado_pedido.icon}></i> */}
                                        {pedido.estado_pedido.descricao}
                                    </span>
                                </button>
                                <UpdateEstado id={pedido.id} getPedidos={getPedidos} estados={estados} motivos={motivos}/>
                            </div>
                        </td>
                        {/* Valor */}
                        <td className='text-end text-success fs-4 pe-3'>
                            {pedido.valor_total.toFixed(2)}
                        </td>

                        {/* Opções */}
                        <td className=''>
                            <Link 
                            to={'/back-office/pedidos/' + pedido.id}
                            className='btn btn-outline-dark w-100'
                            >
                                <i className='me-2 bi bi-file-earmark-check-fill'></i>
                                Alterar pedido
                            </Link>
                        </td>
                        <td className=''>
                        
                            {(pedido.estado_id === 1 || pedido.estado_id === 2 || pedido.estado_id === 3) && 
                                   <button
                                   id='contactar-cliente-btn'
                                   className='btn btn-warning w-100 fw-semibold'
                                   data-bs-toggle='modal'
                                   data-bs-target="#contactar-cliente-modal"
                                   onClick={() => mudarEmail(pedido.cliente.id)}
                               >
                                   <i className='me-2 bi bi-send-fill'></i>
                                   Contactar cliente
                                   
                               </button>
                                
                            }
                            {(pedido.estado_id === 4) &&
                            <div title='Não podes contactar o cliente acerca deste pedido.'>
                                <button className='btn btn-warning w-100' disabled>
                                    <i className='me-2 bi bi-slash-circle-fill text-danger'></i>
                                    Contactar cliente
                                </button>
                            </div>
                            }
                        </td>


                    </tr>
                )
            })
        )
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
        <div className="col overflow-auto h-sm-100 px-5 pt-4 bg-light">

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
                <Count estadoId={1} oquecontar={"todos"} />
                <Count estadoId={2} oquecontar={"todos"} />
                <Count estadoId={3} oquecontar={"todos"} />
                <Count estadoId={4} oquecontar={"todos"} />

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
                            <li><button className="dropdown-item" onClick={e => { handleFiltro('created_at', 'ASC', e.target.textContent) }} type='button'>Mais antigos primeiro</button></li>
                            <li><button className="dropdown-item" onClick={e => { handleFiltro('created_at', 'DESC', e.target.textContent) }} type='button'>Mais recentes primeiro</button></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><button className="dropdown-item" onClick={e => { handleFiltro('nome', 'ASC', e.target.textContent) }} type='button'>Nome de cliente (A-Z)</button></li>
                            <li><button className="dropdown-item" onClick={e => { handleFiltro('nome', 'DESC', e.target.textContent) }} type='button'>Nome de cliente (Z-A)</button></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><button className="dropdown-item" onClick={e => { handleFiltro('valor_total', 'DESC', e.target.textContent) }} type='button'>Valor mais elevado primeiro</button></li>
                            <li><button className="dropdown-item" onClick={e => { handleFiltro('valor_total', 'ASC', e.target.textContent) }} type='button'>Valor mais baixo primeiro</button></li>
                        </ul>
                    </div>

                </div>

            </div>

            {/* Tabela */}
            <div className="mb-3 row px-2">
                <div className='col p-3 bg-white rounded-4 border shadow'>
                    <table className='table'>
                        <thead>
                            <tr className=''>
                                <th className='text-start' style={{ width: '8%' }}>Data</th>
                                <th className='text-start' style={{ width: '27%' }}>Cliente</th>
                                <th className='text-start' style={{ width: '15%' }}>Estado</th>
                                <th className='text-end position-relative' style={{ width: '15%' }}>Valor Total €</th>
                                <th className='text-center' style={{ width: '35%' }} colSpan={2}></th>
                            </tr>
                        </thead>
                        <tbody>
                            <LoadPedidos />
                        </tbody>
                    </table>
                </div>
            </div>

                <ContactarCliente destinatario={Email}/>
        </div>



    )
}