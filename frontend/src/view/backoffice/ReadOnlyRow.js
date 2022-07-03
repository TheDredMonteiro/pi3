import React from 'react'

const ReadOnlyRow = ({ pergunta, handleEditClick, handlDeleteClick }) => {
    return (



        <tr>
            <td>
                <div className="">
                    <p className="fs-6 fw-normal text-secundary text-start p-2" >{pergunta.titulo}</p>
                </div>
            </td>

            <td>

                <div className="">
                    <p className="fs-6 fw-normal text-secundary text-start p-2">{pergunta.descricao}</p>
                </div></td>

            <td>

                <div className="">
                    <p className="fs-6 fw-normal text-secundary text-center p-2">{pergunta.tipo_pergunta.titulo}</p>
                </div>

            </td>

            <td>
                <div className="">
                    <p className="fs-6 fw-normal text-secundary text-center p-2">{pergunta.valor_unitario}</p>
                </div>
            </td>

            <td>
                <button type="button"
                    className="btn btn-outline-warning mx-2"
                    onClick={(e) => handleEditClick(e, pergunta)}
                ><i className="bi bi-pencil-square"></i></button>

            </td>
        </tr>


    )
}

export default ReadOnlyRow