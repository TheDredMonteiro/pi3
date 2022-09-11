import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import ip from '../../ip'
import authHeader from '../auth-header';
import { Link, useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom";

export default function Registar2Component() {
    const [categorias, setCategorias] = useState([])
    const [categorias2, setCategorias2] = useState([])
    const [livros, setLivros] = useState([])
    const [totalClientes, setTotalClientes] = useState(0)
    const [filtroLivro, setFiltroLivro] = useState('id')
    const [ordemLivro, setOrdemLivro] = useState('ASC')
    const [filtroCategoria, setfiltroCategoria] = useState('id')
    const [ordemCategoria, setOrdemCategoria] = useState('ASC')
    const [cliente, setCliente] = useState([])
    const { pass } = useParams();
    const { mail } = useParams();
    const [campTitulo, setcampTitulo] = useState("");
    const [campIDLivro, setcampIDLivro] = useState("");
    const [campAutor, setcampAutor] = useState("");
    const [campSinopse, setcampSinopse] = useState("");
    const [campFoto, setcampFoto] = useState("");
    const [campCategoria, setcampCategoria] = useState("");
    const [campCategorianome, setcampCategorianome] = useState("");
    const [campClassificacao, setcampClassificacao] = useState("");
    const [categoria, setCategoria] = useState("")
    const navigate = useNavigate()



    useEffect(() => {
        axios.get(ip + '/livros/categorias?ordem=' + ordemCategoria + '&filtro=' + filtroCategoria, authHeader())
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
        axios.get(ip + '/livros/list?ordem=' + ordemLivro + '&filtro=' + filtroLivro, authHeader())
            .then(res => { setLivros(res.data.data) })
            .catch(console.log)
        axios.get(ip + '/clientes/cliente?mail=' + mail + '&pass=' + pass, authHeader())
            .then(res => { setCliente(res.data.data) })
            .catch(console.log)
    }, [filtroLivro, ordemLivro, filtroCategoria, ordemCategoria, mail, pass])
    function Add2(id)
    {
        const div1 = document.getElementsByName(id)
            
            const exampleAttr = div1.getAttribute('data-titulo');
        const datapost = {
           
            id: cliente.id,
            nome:exampleAttr,
            id_categoria: id
            
        }
        console.log(datapost);
        axios
            .post(ip + '/clientes/add_categoria_cliente', datapost, authHeader())




            .then(res => {
                if (res.data.success) {

                    alert("Categoria Adicionada!");

                }
                else {
                    alert("Error Web Service!");
                }
            })
            .catch(error => { alert(error); })
    }
    function Add(id) {
        const div1 = document.getElementById(id)
        setcampIDLivro(id);
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


        const datapost = {
            titulo: exampleAttr,
            autor: exampleAttr1,
            sinopse: exampleAttr3,
            foto: exampleAttr2,
            id: cliente.id,
            id_categoria: exampleAttr4,
            id_livro: id,
            categoria: exampleAttr5
        }
        console.log(datapost);
        axios
            .post(ip + '/clientes/add_livro_cliente2', datapost, authHeader())




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
    function handleFiltroCategoria(filtro, ordem, texto) {
        setfiltroCategoria(filtro);
        setOrdemCategoria(ordem);
        document.getElementById('dropdown-filtro-Categoria').textContent = texto
    }
    function LoadCategorias() {
        return (
            categorias.map(categoria => {
                return (
                    <tr className='align-middle' name={categoria.id} data-titulo={categoria.nome}  key={categoria.id} >
                        {/* Cliente */}
                        <td className='text-center text-dark lh-sm'>
                            <span className='fs-5 fw-semibold position-relative'>
                                {categoria.nome}
                            </span>

                        </td>
                        <td className='text-center text-dark lh-sm'>

                            <span className='fs-5 fw-semibold position-relative'>
                                <button

                                    className='btn btn-success w-25 fw-semibold'
                                    onClick={() => {Add2(categoria.id) }}
                                >
                                    <i className=' bi bi-check-lg fs-5 text-white'></i>

                                </button>
                            </span>
                        </td>
                    </tr>
                )
            })
        )
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
                                            <span className='fs-4 position-relative'>
                                                {livro.categoria}
                                            </span>
                                        </div>
                                        <div class="col-sm">
                                            <i className='me-2 bi bi-star-fill fs-4' style={{ color: "Yellow" }}></i>
                                            <span className='fs-4 position-relative'>
                                                {livro.classificacao}
                                            </span>
                                        </div>
                                    </div>

                                    <br />
                                    {(livro.stock > 0) &&
                                        <button

                                            className='btn btn-success w-20 fw-semibold'
                                            onClick={() => { Add(livro.id) }}
                                        >
                                           <i className=' bi bi-check-lg fs-5 text-white'></i>

                                        </button>
                                    }
                                    {(livro.stock <= 0) &&
                                        <button

                                            className='btn btn-danger w-20 fw-semibold'
                                            onClick={() => { Add(livro.id) }}
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

        <div className="col overflow-auto h-sm-100 px-5 pt-4 bg-light">
            {/* Titulo */}
            <div className=" justify-content-center align-items-center  d-flex flex-column " >
                <div className=''>
                    <span className='h2 text-dark  fw-bold'>
                        Meus Livros & Categorias
                    </span>

                    <br />
                    <br />
                </div>
            </div>
            <div className=" justify-content-center align-items-center  d-flex flex-column " >
                <div className=''>
                    <Link to='/' className='mb-3 btn btn-success w-100' >
                        <i className='me-2  text-danger'></i>
                        Adicionei todas as minhas categorias favoritas e os meus livros lidos
                    </Link>

                    <br />
                    <br />
                </div>
            </div>

            <br></br>
            <span className='h5 text-dark fw-bold'>
                Categorias
            </span>

            <div className="mb-3 row">
                <div className='col d-flex justify-content-start align-items-center fs-6 fw-normal text-muted'>
                    <span className='me-2'>
                        Ver na ordem de
                    </span>

                    <div className="dropdown bg-white me-2">
                        <button className=" btn btn-sm btn-outline-dark dropdown-toggle" type="button" id="dropdown-filtro-Categoria" data-bs-toggle="dropdown" aria-expanded="false">
                            <span className='me-2'></span>
                            Data de criação
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdown-filtro-Categoria">
                            <li><button className="dropdown-item" onClick={e => { handleFiltroCategoria('nome', 'ASC', e.target.textContent) }} type='button'>Nome (A-Z)</button></li>
                            <li><button className="dropdown-item" onClick={e => { handleFiltroCategoria('nome', 'DESC', e.target.textContent) }} type='button'>Nome (Z-A)</button></li>
                            <li><button className="dropdown-item" onClick={e => { handleFiltroCategoria('createdAt', 'ASC', e.target.textContent) }} type='button'>Data de criação</button></li>
                        </ul>
                    </div>

                </div>
            </div>
            <div className="mb-3 row px-2">
                <div className='col p-3 '>
                    <table className='table'>
                        <thead>
                            <tr className=''>
                                <th className='text-center' style={{ width: '25%' }}>Nome</th>
                                <th className='text-center' style={{ width: '20%' }}></th>

                            </tr>
                        </thead>
                        <tbody>
                            <LoadCategorias />
                        </tbody>
                    </table>
                </div>
            </div>
            <span className='h5 text-dark fw-bold'>
                Livros
            </span>
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
                            <li><button className="dropdown-item" onClick={e => { handleFiltro('titulo', 'ASC', e.target.textContent) }} type='button'>Título (A-Z)</button></li>
                            <li><button className="dropdown-item" onClick={e => { handleFiltro('titulo', 'DESC', e.target.textContent) }} type='button'>Título (Z-A)</button></li>
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