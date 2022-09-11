import axios from 'axios';
// import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import React, { useEffect, useState, useCallback } from 'react';
import NavDeLado from './navdelado';
import ip from '../../ip'
import authHeader from '../auth-header';

export default function AddCategoriaComponent() {
    const [campNome, setcampNome] = useState("");
    

    
    function Add() {
        const datapost ={
            nome: campNome
                    
        }
        console.log(datapost);
        axios
            .post( ip + '/livros/addcategoria', datapost,authHeader())
               
            
            
            
            .then(res => {
                if (res.data.success) {
                    
                    alert("Categoria registada!");
                    setcampNome('')   
                }
                else {
                   
                    alert("Error Web Service!");
                }
            })
            .catch(error => { alert(error); })
    }
    
    return (

        <div className='container-fluid vh-100 col overflow-auto  px-5 pt-4 bg-light'>

            <div className='justify-content-top align-items-left d-flex flex-column '>


                <div className='h3 text-dark'>
                    Adicionar Categoria
                </div>
                <br></br>
                <input
                    // id='user-username-input'
                    className='form-control focus-warning text-dark w-50 rounded-3'
                    type='text'
                    placeholder='Nome'
                    autoComplete='none'
                    autoCapitalize='words'
                    required
                    value={campNome}
                    onChange={e => { setcampNome(e.target.value) }}
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
                </div>
                <br></br>
            <button

                className='btn btn-success w-20 fw-semibold'
                onClick={() => Add()}
            >
                Adicionar

            </button>
        </div>
    )

}