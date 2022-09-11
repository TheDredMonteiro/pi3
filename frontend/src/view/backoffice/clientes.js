import axios from 'axios';
// import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import NavDeLado from './navdelado';
import ip from '../../ip'
import authHeader from '../auth-header';
import { Link } from "react-router-dom"
import ContactarCliente from './contactar_cliente';
import authService from '../auth.service';

export default function ClientesComponent() {
    const [clientes, setClientes] = useState([])
    const [totalClientes, setTotalClientes] = useState(0)
    const [filtroCliente, setFiltroCliente] = useState('id')
    const [ordemCliente, setOrdemCliente] = useState('ASC')
    const [Email, setEmail] = useState("")
    const [assunto, setAssunto] = useState("Temos o seu orçamento pronto!")
    const [titulo, setTitulo] = useState("Incommun - Serviços personalizados à sua medida!")
    const [corpo, setCorpo] = useState("Escreve alguma coisa.")
    const [loading, setLoading] = useState(false)

    

    useEffect(() => {

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
    }, [filtroCliente, ordemCliente])

    useEffect(() => {

        axios.get(ip + '/clientes/total', authHeader())
            .then(res => {
                setTotalClientes(res.data.data)
            });
    }, [])
    function handleFiltro(filtro, ordem, texto) {
        setFiltroCliente(filtro);
        setOrdemCliente(ordem);
        document.getElementById('dropdown-filtro').textContent = texto
    }
    function Cancelar() {

        setEmail("")
        setAssunto("Temos o seu orçamento pronto!")
        setTitulo("Incommun - Serviços personalizados à sua medida!")
        setCorpo("Escreve alguma coisa.")

    }
    function mudarEmail(id) {
        const div1 = document.getElementById(id)
        const exampleAttr = div1.getAttribute('data-email');
        setEmail(exampleAttr); 
    }
    function Estado(id) {
        const div1 = document.getElementById(id)
        const exampleAttr = div1.getAttribute('data-estado');
        if(exampleAttr == 2)
        {
            const body = {
                id: id,
                estado: 1
            }
          
            axios
                .put(
                    ip + '/clientes/update_estado',
                    body,
                    authHeader()
                )
                .then(res => {
                    if (res.data.success) {
                        window.location.reload(false);
                    }
                    else {
                        alert("Error Web SeAArvice!");
                    }
                })
                .catch(error => { alert(error); })
        }
        else if(exampleAttr == 1)
        {
            const body = {
                id: id,
                estado: 2
            }
          
            axios
            .put(
                ip + '/clientes/update_estado',
                body,
                authHeader()
            )
            .then(res => {
                if (res.data.success) {
                    window.location.reload(false);
                }
                else {
                    alert("Error Web SeAArvice!");
                }
            })
            .catch(error => { alert(error); })
        }
        
    }
    
    function handleContactar(e) {
        e.preventDefault();

        const btn = document.getElementById('contactar-cliente-btn')
        const btnText = document.getElementById('btn-criar-user-text')
        btnText.textContent = 'A enviar...'
        setLoading(true)



        axios
            .post(
                ip + '/clientes/enviar_email',
                {
                    email_cliente: Email,
                    email_admin: authService.getCurrentUser()?.email,
                    assunto: assunto,
                    titulo: titulo,
                    corpo: corpo
                },
                authHeader()
            )
            .then(res => {
                if (res.data.success) {
                    btnText.textContent = res.data.message
                    setLoading(false)

                    setTimeout(() => {
                        btn.click()
                        btnText.textContent = 'Enviar'
                        setAssunto('Temos o seu orçamento pronto!')
                        setTitulo('Incommun - Serviços personalizados à sua medida!')
                        setCorpo('Escreve alguma coisa...')
                    }, 1000);

                }
            })
    }
    function LoadClientes() {
        return (
            clientes.map(cliente => {
                return (
                    <tr className='align-middle' key={cliente.id} id={cliente.id}  data-estado={cliente.estado} data-email={cliente.email}>
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
                            <br></br>
                            <span className='badge p-0 fs-6 fw-semibold text-muted lh-sm'>
                                {cliente.tlm}
                            </span>
                        </td>
                        <td className='text-start text-dark lh-sm'>
                            <span className='fs-5 fw-semibold position-relative'>
                                {(cliente.estado == 1)&&
                                <button
                                
                                className='btn btn-warning w-100 fw-semibold' onClick={() => {Estado(cliente.id)}}>
                                
                                Pendente
                                
                            </button>
                                }
                                {(cliente.estado == 2)&&
                                <button
                                
                                className='btn btn-success w-100 fw-semibold' onClick={() => {Estado(cliente.id)}}>
                                
                                Aceite
                                
                            </button>
                                }
                            </span>
                            
                            
                        </td>
                        <td >
                            <Link to={"/back-office/lc_cliente/" + cliente.id} className="btn btn-secondary fs-6 me-2">
                            <i className='me-2 bi bi-book text-white fs-5'></i>
                                &nbsp;Livros e Categorias do Cliente</Link>
                        </td>
                    </tr>
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
                        Clientes
                    </span>
                    <br />
                </div>

                
            </div>  
            <br />
            
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
                            <li><button className="dropdown-item" onClick={e => { handleFiltro('nome', 'ASC', e.target.textContent) }} type='button'>Nome de cliente (A-Z)</button></li>
                            <li><button className="dropdown-item" onClick={e => { handleFiltro('nome', 'DESC', e.target.textContent) }} type='button'>Nome de cliente (Z-A)</button></li>
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
                                <th className='text-start' style={{ width: '20%' }}>Nome</th>
                                <th className='text-start' style={{ width: '20%' }}>Contactos</th>
                                <th className='text-start' style={{ width: '15%' }}>Estado</th>
                                <th className='text-center' style={{ width: '25%' }} colSpan={1}></th>
                            </tr>
                        </thead>
                        <tbody>
                            <LoadClientes />
                        </tbody>
                    </table>
                </div>
            </div>

            
            <ContactarCliente destinatario={Email}/>
        </div>
    )

}