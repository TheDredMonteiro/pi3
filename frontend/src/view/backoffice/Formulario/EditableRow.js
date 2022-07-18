import React, { useEffect, useState, Fragment } from "react";
import axios from 'axios';
import ip from '../../../ip';
import authHeader from '../../auth-header'

export default function EditableRow({ handleCancelClick, id, pergunta, getForms }) {

    const [edittitulopergunta, seteditTituloPergunta] = useState("")
    const [editdescricaopergunta, seteditdescricaopergunta] = useState("")
    const [edittipopergunta, setedittipopergunta] = useState("")
    const [editvalorpergunta, seteditvalorpergunta] = useState("")

    const [listaTiposPergunta, setlistaTiposPergunta] = useState([])



    function UpdatePergunta(e) {
        e.preventDefault()
        let idpergunta = id

        axios.put(ip + '/forms/edit',
            {
                id: idpergunta,
                titulo: edittitulopergunta,
                descricao: editdescricaopergunta,
                tipo_pergunta: parseInt(edittipopergunta),
                valor_unitario: parseFloat(editvalorpergunta),

            }, authHeader())

            .then(function (data) {
                window.location.reload()
            })
            .catch(error => {
                return error;
            })
    };

    useEffect(() => {
        GetTiposPergunta()
    }, []);


    function GetTiposPergunta() {
        axios.get(ip + '/forms/all_tipos_pergunta', authHeader())
            .then(res => {
                console.table(res.data.TipoPergunta, ['id', 'nome'])
                setlistaTiposPergunta(res.data.TipoPergunta)
            })
    };



    return (
        <form onSubmit={e => UpdatePergunta(e)}>
            <table className="table table-hover">


                <tbody>


                    <tr>

                        <td style={{ width: "30%" }}>
                            <input
                                className="form-control focus-warning"
                                type="text"
                                name="titulo"
                                required="required"
                                placeholder={pergunta.titulo}
                                value={edittitulopergunta}
                                onChange={e => seteditTituloPergunta(e.target.value)}
                            />
                        </td>

                        <td style={{ width: "40%" }}>
                            <input
                                className="form-control focus-warning"
                                type="text"
                                name="descricao"
                                required="required"
                                placeholder={pergunta.descricao}
                                value={editdescricaopergunta}
                                onChange={e => seteditdescricaopergunta(e.target.value)}
                            />
                        </td>



                        <td style={{ width: "10%" }}>






                            <div className="dropdown">
                                <button className="form-control focus-warning dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    {pergunta.tipo_pergunta.titulo}
                                </button>

                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    {listaTiposPergunta.map(TipoPergunta => {

                                        return (

                                            <li>
                                                <a className="dropdown-item">
                                                    {TipoPergunta.titulo}

                                                </a>
                                            </li>
                                        )
                                    })}

                                </ul>
                            </div>



                        </td>



                        {/* <div className="dropdown">
                                            <input                                           
                                            className="form-control focus-warning dropdown-toggle"                                         
                                                type="button"
                                                id="dropdownMenu2"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                                required="required"
                                                placeholder={pergunta.tipo_pergunta.titulo}
                                                value= {edittipopergunta}
                                                onChange={e => seteditvalorpergunta(e.target.value)}
                                                >   
                                               //////////    AQUI FICA "PRE DEFINIDO O TIPO DE PERGUNTA MAS NAO ATUALIZA A PERRGUNTA"   /////
                                                {pergunta.tipo_pergunta.titulo}                                   
                                                   
                                            </input>

                                            
                                            <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                                <li>
                                                    <button className="dropdown-item"
                                                        type="button">
                                                        ///// aqui clrho///////
                                                    </button>

                                                </li>
                                            </ul>
                                        </div> */}




                        <td style={{ width: "10%" }}>
                            <input
                                className="form-control focus-warning"
                                type="number"
                                name="valor_unitario"
                                required="required"
                                placeholder={pergunta.valor_unitario}
                                value={editvalorpergunta}
                                onChange={e => seteditvalorpergunta(e.target.value)}
                            />
                        </td>


                        <td style={{ width: "10%" }}>

                            <button type="submit"
                                className="btn btn-success mx-2">
                                <i className="bi bi-check-lg"></i>
                            </button>

                            <button type="button"
                                className="btn btn-danger mx-2"
                                onClick={handleCancelClick}>
                                <i className="bi bi-x-lg"></i>
                            </button>

                        </td>
                    </tr>

                </tbody>
            </table>

        </form >
    )

};


