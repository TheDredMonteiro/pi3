import axios from 'axios';
import React, { useEffect, useState } from "react";
import ip from '../../ip'
import authHeader from '../auth-header'

export default function EditPerguntaModal(props) {

    const [forms, setForms] = useState([])
    const [edittituloperguntamodal, seteditTituloPerguntamodal] = useState("")
    const [editdescricaoperguntamodal, seteditdescricaoperguntamodal] = useState("")
    const [edittipoperguntamodal, setedittipoperguntamodal] = useState("")
    const [editvalorperguntamodal, seteditvalorperguntamodal] = useState("")


    function UpdateModal(e) {
        e.preventDefault()
        let idpergunta = e.target.getAttribute('data-id')

        axios.post(ip + '/forms/edit?id=' + idpergunta,
            {
                titulo: edittituloperguntamodal,
                descricao: editdescricaoperguntamodal,
                tipo_pergunta: parseInt(edittipoperguntamodal),
                valor_unitario: parseFloat(editvalorperguntamodal),

            }, authHeader())

            .then(function (data) {
                window.location.reload()
            })
            .catch(error => {
                return error;
            })
    }


    return (


        <div className="modal fade" id="editar-pergunta-modal" tabIndex="-1" aria-labelledby="editar-pergunta-label" aria-hidden="true">
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="editar-pergunta-modal-label">Editar Pergunta</h5>
                        <button id='btn-close-editar-pergunta' type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>


                    <div className="modal-body">

                        <form onSubmit={e => UpdateModal(e)}>
                            <input
                                className="form-control focus-warning"
                                type="text"
                                name="titulo"
                                required="required"
                                placeholder="Introduz o titulo"
                                value={edittituloperguntamodal} onChange={e => seteditTituloPerguntamodal(e.target.value)}
                            />

                            <input
                                className="form-control focus-warning"
                                type="text"
                                name="descricao"
                                required="required"
                                placeholder="Introduz a descrição"
                                value={editdescricaoperguntamodal} onChange={e => seteditdescricaoperguntamodal(e.target.value)}
                            />

                            <div className="dropdown bg-white me-2">
                                <button className=" btn btn btn-outline-dark dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">

                                </button> <ul className="dropdown-menu">
                                    <li>
                                        <button
                                            type='button'
                                            className="dropdown-item"
                                            placeholder="Introduz o tipo de pergunta"
                                            value={edittipoperguntamodal} onChange={e => setedittipoperguntamodal(e.target.value)}
                                        >
                                        </button>
                                    </li>
                                </ul>
                            </div>



                            <input
                                className="form-control focus-warning"
                                type="number"
                                name="valor_unitario"
                                required="required"
                                placeholder="Introduz o valor da pergunta"
                                value={editvalorperguntamodal} onChange={e => seteditvalorperguntamodal(e.target.value)}
                            />

                            <button type="submit" className="btn btn-primary" >Update</button>

                        </form>


                    </div>

                </div>
            </div>
        </div>
    )
    // })
}