// import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import ip from '../../ip'
import authHeader from '../auth-header';
import { useParams } from "react-router-dom";
import authService from '../auth.service';

export default function LivrariaComponent() {

    const [filtroLivro, setFiltroLivro] = useState('id')
    const [ordemLivro, setOrdemLivro] = useState('ASC')
    const [livros, setLivros] = useState([])
    const [campTitulo, setcampTitulo] = useState("");
    const [campIDLivro, setcampIDLivro] = useState("");
    const [campAutor, setcampAutor] = useState("");
    const [campSinopse, setcampSinopse] = useState("");
    const [campFoto, setcampFoto] = useState("");
    const [campCategoria, setcampCategoria] = useState("");
    const [campCategorianome, setcampCategorianome] = useState("");
    const [campClassificacao, setcampClassificacao] = useState("");
    const [categorias2, setCategorias2] = useState([])
    const [categoria, setCategoria] = useState("")
    const [cliente, setCliente] = useState([])
    const navigate = useNavigate()
    const { id } = useParams();


    useEffect(() => {
        axios.get(ip + '/livros/list?ordem=' + ordemLivro + '&filtro=' + filtroLivro, authHeader())
            .then(res => { setLivros(res.data.data) })
            .catch(console.log)

       



    }, [filtroLivro, ordemLivro])
    function Add(idl) {
        const div1 = document.getElementById(id)
        setcampIDLivro(id);
        alert(id)
        const exampleAttr = div1.getAttribute('data-titulo');
        setcampTitulo(exampleAttr);
        const exampleAttr1 = div1.getAttribute('data-autor');
        setcampAutor(exampleAttr1);
        const exampleAttr2 = div1.getAttribute('data-foto');
        setcampFoto(exampleAttr2);
        const exampleAttr3 = div1.getAttribute('data-sinopse');
        setcampSinopse(exampleAttr3);
        const exampleAttr4 = div1.getAttribute('data-categoria');
        setcampCategoria(exampleAttr4);
        const exampleAttr5 = div1.getAttribute('data-categorianome');
        setcampCategorianome(exampleAttr5);
        alert(exampleAttr)
        alert(exampleAttr1)
        alert(exampleAttr2)
        alert(exampleAttr3)
        alert(exampleAttr4)
        alert(exampleAttr5)
        alert(id)

       
        const datapost = {
            titulo: exampleAttr,
            autor: exampleAttr1,
            sinopse: exampleAttr3,
            foto: exampleAttr2,
            id: id,
            id_categoria: exampleAttr4,
            id_livro: idl,
            categoria: exampleAttr5
        }
        console.log(datapost);
        axios
            .post(ip + '/clientes/add_livro_cliente', datapost, authHeader())




            .then(res => {
                if (res.data.success) {

                    alert("Livro adquirido!");

                }
                else {
                    alert("Error Web Service!");
                }
            })
            .catch(error => { alert(error); })
    }


    function handleFiltro(filtro, ordem, texto) {
        setFiltroLivro(filtro);
        setOrdemLivro(ordem);
        document.getElementById('dropdown-filtro').textContent = texto
    }




    function LoadLivros() {
        return (
            livros.map(livro => {
                return (
                    <div className='col d-flex flex-column'>
                        <div className='container-fluid rounded-4 border  bg-white shadow' id={livro.id} data-titulo={livro.titulo} data-autor={livro.autor} data-sinopse={livro.sinopse} data-categoria={livro.id_categoria} data-categorianome={livro.categoria} data-foto={livro.foto} data-classificacao={livro.classificacao}>
                            <div className=" text-center my-3 g-3">
                                <img className="photo rounded-4 " width={"95%"} height={"95%"} src={livro.foto} alt="new" />
                                <div className='mt-2 text-center text-dark lh-sm'>
                                    <div class="row">
                                        <div class="col-sm">
                                            <span className='fs-6 fw-bold position-relative'>
                                                {livro.titulo}


                                            </span>
                                        </div>
                                    </div>
                                    <div class="row ">
                                        <div class="col-sm">
                                            <span className='fs-6  position-relative'>
                                                {livro.autor}

                                            </span>
                                        </div>



                                    </div>
                                    <br />
                                    <div class="row">
                                        <div class="col-sm">
                                            <span className='fs-6 position-relative'>
                                                {livro.categoria}
                                            </span>
                                        </div>
                                        <div class="col-sm">
                                            <i className='me-2 bi bi-star-fill fs-4' style={{ color: "Yellow" }}></i>
                                            <span className='fs-5 position-relative'>
                                                {livro.classificacao}
                                            </span>
                                        </div>
                                    </div>

                                    <br />
                                    {(livro.stock>0)  &&
                                    <button

                                    className='btn btn-success w-20 fw-semibold'
                                    onClick={() => {Add(livro.id)}}
                                >
                                    Adicionar

                                </button>
                                    }
                                    {(livro.stock<=0)  &&
                                    <button

                                    className='btn btn-danger w-20 fw-semibold'
                                    onClick={() => {Add(livro.id)}}
                                >
                                    Esgotado

                                </button>
                                    }
                                    
                                </div>
                            </div>
                        </div>

                    </div>

                )
            })
        )
    }



    return (

        <div className="overflow-auto h-sm-100 bg-light" style={{ padding: 0}}>
            <nav style={{ height: '100px', width: '100%',padding: 0, zIndex: 10000 }} className='position-relative d-flex flex-row  bg-dark-secondary container-fluid vw-100'>
                &nbsp;&nbsp;
                <div className='align-items-right justify-content-center d-flex flex-column  w-25 mb-0' >
                    <h4 className='text-center align-items-right justify-content-center d-flex flex-column  w-100 mb-0' style={{ color: "white", textShadow: "3px 3px 5px #000000" }}>Livraria Monteiro</h4>
                    <h6 className='text-center align-items-right justify-content-center d-flex flex-column  w-100 mb-0' style={{ color: "white", textShadow: "2px 2px 4px #000000" }}>Encontra o teu livro</h6>

                </div>
                <div className='text-light align-items-center justify-content-center d-flex flex-column w-25 mb-0'>
                    <Link to={'/livraria/' + id}
                        className='btn btn-outline-secondary border-0  rounded-0 fs-5  d-flex'
                        onFocus={e => setTimeout(() => { e.target.blur() }, 200)}>
                        <span>Livraria</span>
                    </Link>
                </div>
                <div className='text-light align-items-center justify-content-center d-flex flex-column w-25 mb-0'>
                    <Link to={'/recomendados/' + id}
                        className='btn btn-outline-secondary border-0  rounded-0 fs-5  d-flex'
                        onFocus={e => setTimeout(() => { e.target.blur() }, 200)}>
                        <span>Recomendados</span>
                    </Link>
                </div>
                <div className='text-light align-items-center justify-content-center d-flex flex-column w-25 mb-0'>
                    <Link to={'/meuslivros/' + id}
                        className='btn btn-outline-secondary border-0  rounded-0 fs-5  d-flex'
                        onFocus={e => setTimeout(() => { e.target.blur() }, 200)}>
                        <span>Meus Livros</span>
                    </Link>
                </div>
                <div className='text-light align-items-center justify-content-center d-flex flex-column w-25 mb-0'>
                    <Link to={'/minhascategorias/' + id}
                        className='btn btn-outline-secondary border-0  rounded-0 fs-5  d-flex'
                        onFocus={e => setTimeout(() => { e.target.blur() }, 200)}>
                        <span>Categorias Favoritas</span>
                    </Link>
                </div>






                <div className='align-items-right justify-content-center py-sm-4 ' >
                    <Link
                        id='dropdown-user'
                        className='btn btn-outline-secondary border-0 rounded-0  d-flex align-items-center dropdown-toggle'
                        to='#'
                        data-bs-toggle='dropdown'
                        aria-expanded='false'
                    >
                        <i className='bi bi-person fs-4'></i>

                    </Link>

                    <ul className='dropdown-menu dropdown-menu-dark rounded-0 m-0' aria-labelledby='dropdown-user'>





                        <li><button className='dropdown-item'
                            onClick={e => { authService.logout(); navigate('/');}}
                        >
                            <i className='bi bi-door-open me-2'></i>
                            Log out
                        </button></li>
                    </ul>
                </div>

                &nbsp;&nbsp;&nbsp;&nbsp;
            </nav>
            <br></br>
            <div className=" justify-content-center align-items-center  d-flex flex-column " >
                <div className=''>
                    <span className='h2 text-dark  fw-bold'>
                        Livros
                    </span>

                    <br />
                </div>
            </div>
            <div className="mb-3 row">
                <div className='col d-flex justify-content-start align-items-center fs-6 fw-normal text-muted'>

                    <span className='me-2 fw-bold'>
                        &nbsp;&nbsp;&nbsp;&nbsp; Ver na ordem de
                    </span>

                    <div className="dropdown bg-white me-2">
                        <button className=" btn btn-sm btn-outline-dark dropdown-toggle" type="button" id="dropdown-filtro" data-bs-toggle="dropdown" aria-expanded="false">
                            <span className='me-2'></span>
                            Data de criação
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdown-filtro">
                            <li><button className="dropdown-item" onClick={e => { handleFiltro('titulo', 'ASC', e.target.textContent) }} type='button'>Título (A-Z)</button></li>
                            <li><button className="dropdown-item" onClick={e => { handleFiltro('titulo', 'DESC', e.target.textContent) }} type='button'>Título (Z-A)</button></li>
                            <li><button className="dropdown-item" onClick={e => { handleFiltro('autor', 'ASC', e.target.textContent) }} type='button'>Autor</button></li>
                            <li><button className="dropdown-item" onClick={e => { handleFiltro('id_categoria', 'ASC', e.target.textContent) }} type='button'>Categoria</button></li>
                            <li><button className="dropdown-item" onClick={e => { handleFiltro('created_at', 'ASC', e.target.textContent) }} type='button'>Data de criação</button></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className=' g-3 row row-cols-5 p-4 '>
                <LoadLivros />
            </div>
        </div>
    )
}