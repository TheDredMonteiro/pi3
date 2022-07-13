import axios from 'axios';
import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import ip from '../ip'

export default function MainComponent() {

    const [forms, setForms] = useState([])

    useEffect(() => {
        document.title = 'Incommun'

        axios.get(ip + '/forms/all_form_names')
            .then(res => { setForms(res.data) })

    }, [])

    function nomeTransform(nome = '') {
        // TODO: transformar o nome com regex
        // maneira rápida de conseguir alterar o nome
        const newNome = nome
            .replaceAll(' ', '-')
            .replaceAll('---', '-')
            .replaceAll('ç', 'c')
            .replaceAll('ã', 'a')
            .replaceAll('í', 'i')
            .toLocaleLowerCase()
        return newNome
    }

    function LoadLinks() {
        return forms.map((form, index) => {
            return (
                /*<div key={form.id} className={((index % 2 === 0) ? 'text-end' : 'text-start') + ' my-5'}>

                    <div className='fs-1 text-indigo lh-1 py-3'>
                        {form.titulo}
                    </div>

                    <div className='fs-5 py-3'>{form.descricao}</div>

                    <Link
                        className='btn btn-warning fs-4 fw-normal rounded-0 py-3'
                        to={'/servicos-personalizados/' + nomeTransform(form.titulo)}
                        state={{ id: form.id }}
                    >
                        Preencher formulário
                    </Link>
                </div>*/

                <div key={form.id} className={((form.id === 1 || form.id === 2 || form.id === 3) ? 'collapse multi-collapse' : 'text-end') + ' my-5'} id={form.id}>
                    <div className='fs-1 text-indigo lh-1 py-3'>
                        {form.titulo}
                    </div>

                    <div className='fs-5 py-3'>{form.descricao}</div>

                    <Link
                        className='btn btn-warning fs-4 fw-normal rounded-0 py-3'
                        to={'/servicos-personalizados/' + nomeTransform(form.titulo)}
                        state={{ id: form.id }}
                    >
                        Preencher formulário
                    </Link>
                </div>
            )
        })
    }

    function ButtonsLink() {
        return forms.map((form, index) => {
            return (
                <div key={form.id}>
                    <button
                        className='btn btn-warning fs-4 fw-normal rounded-0 py-3'
                        type="button"
                        data-bs-toggle="collapse" 
                        data-bs-target={'#' + (form.id)} 
                        aria-expanded="false" 
                        aria-controls="collapseExample"
                    >
                        {form.titulo}
                    </button>
                </div>
            )
        })
    }

    return (
        <div className='container'>
            <div className='row flex-column flex-md-row justify-content-center text-center' style={{ marginTop: '10rem', marginBottom: '10rem' }}>

                <div className='col-3 border border-warning border-3 rounded-4 py-2'>
                    <i className="bi bi-journal-text text-warning fs-1"></i>
                    <div className='fs-3'>Complete um formulário</div>
                </div>

                <div className='col-1 d-flex justify-content-center align-items-center'>
                    <i className="bi bi-chevron-right text-warning fs-1"></i>
                </div>

                <div className='col-3 border border-warning border-3 rounded-4 py-2'>
                    <i className="bi bi-wallet2 text-warning fs-1"></i>
                    <div className='fs-3'>Receba o orçamento</div>
                </div>

                <div className='col-1 d-flex justify-content-center align-items-center'>
                    <i className="bi bi-chevron-right text-warning fs-1"></i>
                </div>

                <div className='col-3 border border-warning border-3 rounded-4 py-2'>
                    <i className="bi bi-geo-alt-fill text-warning fs-1"></i>
                    <div className='fs-3'>Pedido entregue!</div>
                </div>
            </div>

            <ButtonsLink />

            {forms.length === 0 &&
                <div className='row justify-content-center my-5'>
                    <div className="spinner-grow text-secondary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            }
            <LoadLinks />


            <div style={{ marginTop: '10rem', marginBottom: '10rem' }}>
                <h1 className='text-center my-4 align-middle'>Acompanhe o nosso trabalho:</h1>
                <div className='text-indigo row row-cols-8 text-center justify-content-center align-middle'>
                    <i className="col-1 fs-2 bi bi-twitter" />
                    <i className="col-1 fs-2 bi bi-instagram" />
                    <i className="col-1 fs-2 bi bi-facebook" />
                    <i className="col-1 fs-2 bi bi-linkedin" />
                    <i className="col-1 fs-2 bi bi-youtube" />
                    <i className="col-1 fs-2 bi bi-tiktok" />
                </div>
            </div>



        </div>
    )

}        