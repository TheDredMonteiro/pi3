import axios from 'axios';
// import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import React, { useEffect, useState, useCallback } from 'react';
import NavDeLado from './navdelado';
import ip from '../../ip'
import authHeader from '../auth-header';
import { Link } from "react-router-dom"
import ContactarCliente from './contactar_cliente';
import authService from '../auth.service';
import Livraria from '../../assets/imgs/livraria.jpg'

export default function AddLivrosComponent() {
    const [campTitulo, setcampTitulo] = useState("");
    const [campAutor, setcampAutor] = useState("");
    const [campSinopse, setcampSinopse] = useState("");
    const [campFoto, setcampFoto] = useState("");
    const [campStock, setcampStock] = useState("");
    const [categoriaid, setCategoriaid] = useState("")
    const [categorianome, setCategorianome] = useState("")
    const [categorias, setCategorias] = useState([])

    useEffect(() => {
        axios.get(ip + '/livros/categorias', authHeader())
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

    }, [])
    function Add() {
        const datapost ={
            titulo: campTitulo,
                    autor: campAutor,
                    sinopse: campSinopse,
                    foto: campFoto,
                    stock: parseInt(campStock),
                    id_categoria: categoriaid,
                    categoria: categorianome
        }
        console.log(datapost);
        axios
            .post( ip + '/livros/add', datapost,authHeader())
               
            
            
            
            .then(res => {
                if (res.data.success) {
                    
                    alert("Livro registado!");
                    setCategoriaid('')
                    setCategorianome('')
                    setcampAutor('')
                    setcampTitulo('')
                    setcampFoto('')
                    setcampStock('')
                    setcampSinopse('')
                }
                else {
                    alert("Error Web Service!");
                }
            })
            .catch(error => { alert(error); })
    }
    function Categoria(id, texto){
        setCategoriaid(id)
        setCategorianome(texto)
        document.getElementById('dropdown-categorias').textContent = texto
    }
    function LoadCategorias() {
        return (
            categorias.map(categoria => {
                return (
                    <li><button  className="dropdown-item" onClick={e => { Categoria(categoria.id,e.target.textContent) }} type='button'>{categoria.nome}</button></li>
                )
            })
        )
    }
    return (

        <div className='container-fluid vh-100 col overflow-auto  px-5 pt-4 bg-light'>

            <div className='justify-content-top align-items-left d-flex flex-column '>


                <div className='h3 text-dark'>
                    Adicionar Livro
                </div>
                <br></br>
                <input
                    // id='user-username-input'
                    className='form-control focus-warning text-dark w-50 rounded-3'
                    type='text'
                    placeholder='Título'
                    autoComplete='none'
                    autoCapitalize='words'
                    required
                    value={campTitulo}
                    onChange={e => { setcampTitulo(e.target.value) }}
                    onInput={e => {
                        if (!e.target.validity.valid) {
                            e.target.classList.add('focus-danger')

                            if (e.target.validity.valueMissing) {
                                e.target.setCustomValidity('O título é de preenchimento obrigatório.')
                                e.target.reportValidity()
                            } else {
                                e.target.setCustomValidity('')
                                e.target.classList.remove('focus-danger')
                            }
                        }
                    }}
                />
                &nbsp;
                <input
                    // id='user-username-input'
                    className='form-control focus-warning text-dark w-50 rounded-3'
                    type='text'
                    placeholder='Autor'
                    autoComplete='none'
                    autoCapitalize='words'
                    required
                    value={campAutor}
                    onChange={e => { setcampAutor(e.target.value) }}
                    onInput={e => {
                        if (!e.target.validity.valid) {
                            e.target.classList.add('focus-danger')

                            if (e.target.validity.valueMissing) {
                                e.target.setCustomValidity('O autor é de preenchimento obrigatório.')
                                e.target.reportValidity()
                            } else {
                                e.target.setCustomValidity('')
                                e.target.classList.remove('focus-danger')
                            }
                        }
                    }}
                />
                &nbsp;

                <textarea
                    // id='user-email-input'
                    className='form-control focus-warning text-dark w-50 rounded-3'
                    placeholder='Sinopse'
                    autoComplete='none'
                    autoCapitalize='none'
                    required
                    style={{ height: '10rem' }}
                    value={campSinopse}
                    onChange={e => { setcampSinopse(e.target.value) }}
                    onInput={e => {
                        if (!e.target.validity.valid) {
                            e.target.classList.add('focus-danger')

                            if (e.target.validity.valueMissing) {
                                e.target.setCustomValidity('O corpo é de preenchimento obrigatório.')
                                e.target.reportValidity()
                            } else {
                                e.target.setCustomValidity('')
                                e.target.classList.remove('focus-danger')
                            }
                        }
                    }}
                ></textarea>
                &nbsp;
                <div style={{ width:"100px" }} className="dropdown bg-light me-2">
                        <button  className=" btn btn-sm btn-outline-dark dropdown-toggle" id="dropdown-categorias" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <span  className='me-2'>Categoria</span>
                        </button>
                        <ul  className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li className='text-dark fw-bold dropdown-header fs-6'>Categoria:</li>
                        <li><hr className="dropdown-divider" /></li>
                           <LoadCategorias/>
                        </ul>
                    </div>
                &nbsp;
                <input
                    // id='user-username-input'
                    style={{ width:"100px" }}
                    className='form-control focus-warning text-dark rounded-3'
                    type='text'
                    placeholder='Stock'
                    autoComplete='none'
                    autoCapitalize='words'
                    required
                    value={campStock}
                    onChange={e => { setcampStock(e.target.value) }}
                    onInput={e => {
                        if (!e.target.validity.valid) {
                            e.target.classList.add('focus-danger')

                            if (e.target.validity.valueMissing) {
                                e.target.setCustomValidity('O stock é de preenchimento obrigatório.')
                                e.target.reportValidity()
                            } else {
                                e.target.setCustomValidity('')
                                e.target.classList.remove('focus-danger')
                            }
                        }
                    }}
                />
                &nbsp;
                <input
                    // id='user-username-input'
                    className='form-control focus-warning text-dark w-75 rounded-3'
                    type='text'
                    placeholder='Foto'
                    autoComplete='none'
                    autoCapitalize='words'
                    required
                    value={campFoto}
                    onChange={e => { setcampFoto(e.target.value) }}
                    onInput={e => {
                        if (!e.target.validity.valid) {
                            e.target.classList.add('focus-danger')

                            if (e.target.validity.valueMissing) {
                                e.target.setCustomValidity('O stock é de preenchimento obrigatório.')
                                e.target.reportValidity()
                            } else {
                                e.target.setCustomValidity('')
                                e.target.classList.remove('focus-danger')
                            }
                        }
                    }}
                />
                &nbsp;
                <img className="photo" width={"15%"} height={"15%"} src={campFoto}/>
                <br></br>



            </div>
            <button

                className='btn btn-success w-20 fw-semibold'
                onClick={() => {Add(); alert("2");}}
            >
                Adicionar

            </button>
        </div>
    )

}