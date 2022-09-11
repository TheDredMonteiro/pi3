import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import ip from '../../ip'
import Livraria from '../../assets/imgs/livraria.jpg'
import AuthService from "../../view/auth.service";
const divStyle = {
    width: '100%',
    height: '750px',
    backgroundImage: `url(${Livraria})`,
    backgroundSize: 'cover'
};
const divStyle2 = {
    width: '100%',
    height: '350px',
    alignItems: 'center'

};
const btnStyle = {
    width: '120px',
    height: '50px',
    fontSize: '20px'

};

export default function FrontPage(props) {

    const [forms, setForms] = useState([])
    const [loading, setLoading] = useState(false)
    const [Email, setEmail] = useState('')
    const [Pass, setPass] = useState('')
    const navigate = useNavigate()
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
    function Cancelar() {
        setEmail("")
        setPass("")

    }
    function handleLogin(e) {
        e.preventDefault()
        setLoading(true)
        let btn = e.nativeEvent.submitter
        let btnText = document.getElementById('login-btn-text')

        e.nativeEvent.submitter.classList.add('btn-danger')

        setTimeout(() => {
            e.nativeEvent.submitter.classList.remove('btn-danger')
        }, 3000);
        console.log("3")
        AuthService
            .login(Email, Pass)
            .then(res => {
                console.log("4")
                if (res.success) {
                    console.log("1")
                    props.setLogin(true)
                    navigate('/back-office/clientes')
                } else {
                    console.log(res)
                    setLoading(false)
                    
                    btn.classList.add('btn-danger')
                    btnText.textContent = res.response.data.message
                    

                   
                }

            })
            .catch(error => { setLoading(false); alert(error); })
    }
    /*function RestantesFormulários() {

        return (
            forms.map(form => {
                if (form.id < 4) { return (<div key={form.id} className='d-none'></div>) }
                return (
                    <div className='col' key={form.id}>
                        <div className='bg-transparent border border-warning border-3 p-4 pb-2 rounded-4'>
                            <div className='fs-2 fw-bold mb-3 text-dark'>
                                {form.titulo}
                            </div>
                            <div className='fs-5 fw-normal text-dark lh-sm mb-4'>
                                {form.descricao}
                            </div>

                            <Link
                                to={'/servicos-personalizados/' + nomeTransform(form.titulo)}
                                state={{id: form.id}}
                                className='btn btn-warning fw-semibold rounded-3 mb-3 w-100'
                            >
                                Vamos lá!
                            </Link>

                        </div>
                    </div>
                )
            })
        )
    }*/

    return (
        <div className='container-fluid' style={divStyle}>
            {/* header */}

            <div className='col-4 d-flex flex-column py-5 justify-content-center' style={divStyle2}>
                <h1 className='text-center ' style={{ color: "white", fontSize: "60px",textShadow: "3px 3px 5px #000000" }}>Livraria Monteiro</h1>
                <h3 className='text-center ' style={{ color: "white",textShadow: "2px 2px 4px #000000" }}>Encontra o teu livro</h3>

            </div>

            <div className='mb-4 row row-cols-xl-2'>

            <div className='col'>
                   
                   <div className='d-flex align-items-center justify-content-end'>
                       <Link to='/back-office/registar' className='btn btn-light fw-bold border border-dark  text-center shadow' style={btnStyle}>
                           Registar
                       </Link>
                   
               </div>
           </div>
                <div className='col'>
                   
                        <div className='d-flex  text-center align-items-center justify-content-start'>
                        <Link to='/back-office/login' className='btn btn-light fw-bold border border-dark  text-center shadow' style={btnStyle}>
                           Login
                       </Link>
                           
                        
                    </div>
                </div>
                <div className="modal fade" id="contactar-cliente-modal" tabIndex="-1" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="criar-user-modal-label" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content rounded-4 border-0 bg-dark-secondary shadow">
                        <div className="modal-header border-0 rounded-0 bg-dark-secondary text-white">
                            
                            <button id='btn-close-criar-user' type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" onClick={() => Cancelar()} aria-label="Close"></button>
                        </div>
                        <div className="modal-body rounded-4 bg-light border-0 shadow">
                            <form onSubmit={e => handleLogin(e)}>
                                <div className="form-floating mb-3">
                                    <input
                                        // id='user-username-input'
                                        className='form-control focus-warning text-dark rounded-3'
                                        type='text'
                                        placeholder='titulo'
                                        autoComplete='none'
                                        autoCapitalize='words'
                                        required
                                        value={Email}
                                        onChange={e => { setEmail(e.target.value) }}
                                        onInput={e => {
                                            if (!e.target.validity.valid) {
                                                e.target.classList.add('focus-danger')

                                                if (e.target.validity.valueMissing) {
                                                    e.target.setCustomValidity('O assunto é de preenchimento obrigatório.')
                                                    e.target.reportValidity()
                                                } else {
                                                    e.target.setCustomValidity('')
                                                    e.target.classList.remove('focus-danger')
                                                }
                                            }
                                        }}
                                    />
                                    <label className='text-dark' htmlFor="user-username-input">Email</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        // id='user-username-input'
                                        className='form-control focus-warning text-dark rounded-3'
                                        type='text'
                                        placeholder='titulo'
                                        autoComplete='none'
                                        autoCapitalize='words'
                                        required
                                        value={Pass}
                                        onChange={e => { setPass(e.target.value) }}
                                        onInput={e => {
                                            if (!e.target.validity.valid) {
                                                e.target.classList.add('focus-danger')

                                                if (e.target.validity.valueMissing) {
                                                    e.target.setCustomValidity('O assunto é de preenchimento obrigatório.')
                                                    e.target.reportValidity()
                                                } else {
                                                    e.target.setCustomValidity('')
                                                    e.target.classList.remove('focus-danger')
                                                }
                                            }
                                        }}
                                    />
                                    <label className='text-dark' htmlFor="user-username-input">Password</label>
                                </div>

                                <div className='w-100 d-flex justify-content-end'>
                                    <button id='btn-criar-user' type="submit" data-bs-dismiss="modal" className="btn btn-warning rounded-3 ">
                                        
                                        <span id='login-btn-text'>Login</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            </div>

        </div>
    )

}        