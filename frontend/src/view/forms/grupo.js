import React, { useEffect, useState } from 'react'

// Tipos de Pergunta
import TipoCard from './tipos/card'
import TipoArray from './tipos/array'
import TipoCheckbox from './tipos/checkbox'
import TipoRedeSocial from './tipos/rede_social'

export default function GrupoComponent(props) {

    const [resposta, setResposta] = useState('')

    useEffect(() => {
        let collapsible = document.getElementById('accordion-collapse-' + props.id)
        collapsible.addEventListener('shown.bs.collapse', e => { props.setSelectedGroup(props.id) })
    }, [])

    useEffect(() => {
        setRespostaCheckbox()
    }, [props.perguntasObject])

    // cards
    let arrayDeIdsDosCards = []
    function resetCards(id) {

        const resetCardsObj = {}
        arrayDeIdsDosCards.forEach(card => {
            resetCardsObj[card] = false
        })

        resetCardsObj[id] = true

        const newObj = {
            ...props.perguntasObject,
            ...resetCardsObj
        }
        props.setPerguntasObject(newObj)
    }

    // checkbox resposta
    function setRespostaCheckbox() {
        // responsavel por ir buscar os checkboxes que estiverem 
        // checked, criar uma array com os textos, e mostrar no head do grupo

        const checkboxes = document.querySelectorAll('#accordion-collapse-' + props.id + ' .form-check-input[type=checkbox]')
        let checkboxesChecked = Array
            .from(checkboxes, cb => {
                return cb.checked ? cb.value : null
            })
            .filter(cb => cb !== null)

        const grupoIsCheckbox = (props.grupo.pergunta[0].tipo_pergunta.titulo === 'checkbox')
        if (grupoIsCheckbox) {
            setResposta(checkboxesChecked.join(', '))
        }
    }

    return (
        <>
            <div id={'accordion-header-' + props.id} className='accordion-header position-relative border-start border-1 border-white'>
                <button
                    id={'g-' + props.id}
                    type='button'
                    className='accordion-button collapsed ms-2 border border-white border-1 text-decoration-none'
                    data-bs-toggle='collapse' data-bs-target={'#accordion-collapse-' + props.id}
                    aria-expanded='false' aria-controls={'accordion-collapse-' + props.id}
                    onClick={(e) => { }}
                >
                    <div className='h3 text-warning text-truncate'
                        style={{ textOverflow: 'ellipsis' }}
                    >
                        <span className='h3 text-dark' title={props.grupo.titulo}>
                            {props.grupo.titulo}
                        </span>
                        <span
                            className='text-warning ms-3 fw-semibold'
                            title={resposta}>
                            {resposta}
                        </span>
                    </div>
                    <span className='position-absolute top-50 end-100 translate-middle p-2 bg-warning rounded-circle'></span>
                </button>
            </div>
            <div
                id={'accordion-collapse-' + props.id}
                className={(props.selectedGroup === props.id ? 'show' : '') + ' accordion-collapse collapse '}
                aria-labelledby={'#accordion-header-' + props.id} data-bs-parent='#accordion'
            >
                <div className='accordion-body bg-light rounded-0 pt-4'>
                    <div className='row'>
                        {props.grupo.pergunta.map((pergunta, indexPergunta) => {
                            switch (pergunta.tipo_pergunta.titulo) {
                                case 'card':
                                    arrayDeIdsDosCards.push(pergunta.id)
                                    return (
                                        <TipoCard
                                            key={pergunta.id}
                                            pergunta={pergunta}

                                            idGrupo={props.id}
                                            perguntasObject={props.perguntasObject}
                                            setPerguntasObject={props.setPerguntasObject}

                                            resetCards={resetCards}

                                            setResposta={setResposta}
                                        />
                                    )
                                case 'array':
                                    return (
                                        <TipoArray
                                            key={pergunta.id}
                                            pergunta={pergunta}

                                            perguntasObject={props.perguntasObject}
                                            setPerguntasObject={props.setPerguntasObject}

                                            setResposta={setResposta}


                                        />
                                    )

                                case 'checkbox':
                                    return (
                                        <TipoCheckbox
                                            key={pergunta.id}
                                            pergunta={pergunta}

                                            perguntasObject={props.perguntasObject}
                                            setPerguntasObject={props.setPerguntasObject}

                                            setRespostaCheckbox={setRespostaCheckbox}
                                        />
                                    )

                                case 'r-social-posts':
                                case 'r-social-posts-stories':
                                case 'r-social-posts-reels':
                                case 'r-social-posts-stories-reels':
                                    return (
                                        <TipoRedeSocial
                                            exemplo={pergunta.tipo_pergunta.titulo}

                                            key={pergunta.id}
                                            pergunta={pergunta}

                                            idGrupo={props.id}
                                            perguntasObject={props.perguntasObject}
                                            setPerguntasObject={props.setPerguntasObject}

                                        />
                                    )

                                default:
                                    return (console.log('Tipo de pergunta não aceite ->', pergunta.tipo_pergunta.titulo));
                            }
                        })}
                    </div>
                </div>
            </div>
        </>
    )

}