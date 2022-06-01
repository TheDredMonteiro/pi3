import axios from 'axios';
// import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import ip from '../../ip'

export default function CountComponent(props) {

    const [count, setCount] = useState(0)
    const [desc, setDesc] = useState('')
    const icons = [
        'bi-envelope',
        'bi-envelope-paper-heart',
        'bi-arrow-through-heart-fill',
        'bi-heartbreak-fill',
    ]
    const cores = [
        'text-warning',
        'text-primary',
        'text-teal',
        'text-danger',
    ]

    useEffect(() => {
        axios.get('http://' + ip + ':4011/pedidos/count?estado=' + props.estado)
        .then(res => {
            console.log(res.data)
            setCount(res.data.count)
            setDesc(res.data.desc)
        })
    }, [])

    return (
        <div className='col'>
            <div className='container-fluid rounded-4 border ps-4 bg-white shadow'>

                <div className='row'>
                    <div className='col-2 py-2 d-flex align-items-center justify-content-center'>
                        <span className='me-1'>
                            <i className={'bi ' + icons[props.estado-1] + ' ' + cores[props.estado-1] + ' fs-3'}></i>
                        </span>

                    </div>
                    <div className='col-6 d-flex align-items-center justify-content-center'>
                        <span className='fw-normal fs-6 lh-sm'>
                            Pedidos {desc}s
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