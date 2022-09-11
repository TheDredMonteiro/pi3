import axios from 'axios';
// import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import ip from '../../ip'
import authHeader from '../auth-header'

export default function CountComponent(props) {

    const [count, setCount] = useState(0)
    const [estado, setEstado] = useState('')
    const [count2, setCount2] = useState(0)
    const [estado2, setEstado2] = useState('')

    useEffect(() => {
       /* if(props.cliente==undefined){
            axios.get(ip + '/pedidos/count?estado_id=' + props.estadoId, authHeader())
            .then(res => {
                setCount(res.data.count)
                setEstado(res.data.estado)
            })
        }*/

           
        
        
    }, [])
    
    
    

    return (
        <div className='col'>
            <div className='container-fluid rounded-4 border ps-4 bg-white shadow'>

                <div className='row'>
                    <div className='col-2 py-2 d-flex align-items-center justify-content-center'>
                        <span className='me-1'>
                            <i className={'bi ' + estado.icon + ' text-' + estado.cor + ' fs-3'}></i>
                        </span>

                    </div>
                    <div className='col-6 d-flex align-items-center justify-content-center'>
                        <span className='fw-normal fs-6 lh-sm'>
                            Pedidos {estado.descricao}s
                        </span>
                    </div>
                    <div className='col-4 d-flex align-items-center justify-content-center'>
                        <span className='fw-bold fs-4 p-1'>
                            {count}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}