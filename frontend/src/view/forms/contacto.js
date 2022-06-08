import React from 'react'

export default function ContactoComponent(props) {

    return (
        <div className='row mb-5'>
            <div className='col-12 my-5 '>
                <div className='display-5'>
                    <i className='bi bi-person-plus text-indigo fs-1 me-3'></i>
                    Fale-nos sobre si!
                </div>
                <div className='fs-6 fw-normal mt-1 text-muted'>
                    Toda a informação que partilhar é usada <strong>apenas</strong> para o contactar,
                    e não é partilhada com outros.
                </div>
            </div>

            <div className='col-8 mx-auto'>
                <form onSubmit={e => { e.preventDefault(); props.postPedido(e) }}>
                    {/* Nome */}
                    <div className="form-floating mb-3">
                        <input
                            id="input-nome"
                            className="form-control rounded-0 focus-warning"
                            type="text"
                            pattern='[a-zA-ZçãáàõóàÇÃÁÀÕÓÒ\s]*$'
                            maxLength={50}
                            placeholder="Nome"
                            autoComplete='name'
                            autoCapitalize='words'
                            required
                            value={props.clienteNome}
                            onChange={e => {props.setClienteNome(e.target.value)}}
                            onInput={e => {
                                if (!e.target.validity.valid) {
                                    e.target.classList.add('focus-danger')

                                    if (e.target.validity.patternMismatch) {
                                        e.target.setCustomValidity('O seu nome só pode conter letras e espaços.')
                                        e.target.reportValidity()
                                    } else if (e.target.validity.valueMissing) {
                                        e.target.setCustomValidity('O seu nome é de preenchimento obrigatório.')
                                        e.target.reportValidity()
                                    } else if (e.target.validity.tooLong) {
                                        e.target.setCustomValidity('O seu nome é demasiado grande. Bastam o primeiro e último nome.')
                                        e.target.reportValidity()
                                    } else {
                                        e.target.setCustomValidity('')
                                        e.target.classList.remove('focus-danger')
                                    }
                                }
                            }}
                        />
                        <label htmlFor="input-nome">
                            Nome completo
                            <span className='text-danger fw-bold ms-1'>*</span>
                        </label>
                    </div>
                    {/* Email */}
                    <div className="form-floating mb-3">
                        <input
                            id="input-email"
                            className="form-control rounded-0 focus-warning"
                            type="email"
                            pattern='[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$'
                            maxLength={63}
                            placeholder="email"
                            autoComplete='email'
                            autoCapitalize='none'
                            required
                            value={props.clienteEmail}
                            onChange={e => {props.setClienteEmail(e.target.value)}}
                            onInput={e => {
                                if (!e.target.validity.valid) {
                                    e.target.classList.add('focus-danger')

                                    if (e.target.validity.patternMismatch) {
                                        e.target.setCustomValidity('Por favor introduza um email válido')
                                        e.target.reportValidity()
                                    } else if (e.target.validity.valueMissing) {
                                        e.target.setCustomValidity('O seu email é de preenchimento obrigatório.')
                                        e.target.reportValidity()
                                    } else {
                                        e.target.setCustomValidity('')
                                        e.target.classList.remove('focus-danger')
                                    }
                                }
                            }}
                        />
                        <label htmlFor="input-email">
                            Email
                            <span className='text-danger fw-bold ms-1'>*</span>
                        </label>
                    </div>
                    {/* Empresa */}
                    <div className="form-floating mb-3">
                        <input
                            id="input-empresa"
                            className="form-control rounded-0 focus-warning"
                            type="text"
                            maxLength={50}
                            placeholder="empresa"
                            autoComplete='organization'
                            autoCapitalize='words'
                            value={props.clienteEmpresa}
                            onChange={e => {props.setClienteEmpresa(e.target.value)}}
                        />
                        <label htmlFor="input-empresa">Nome da sua empresa</label>
                    </div>
                    {/* Tlm */}
                    <div className="form-floating mb-3">
                        <input
                            id="input-tlm"
                            className="form-control rounded-0 focus-warning"
                            type="tel"
                            minLength={9}
                            maxLength={9}
                            placeholder="tlm"
                            autoComplete='tel-national'
                            value={props.clienteTlm}
                            onChange={e => {props.setClienteTlm(e.target.value)}}
                        />
                        <label htmlFor="input-tlm">Número de telemóvel</label>
                    </div>

                    <div className='mb-3'>
                        <span className='text-danger fw-bold me-1'>*</span>
                        <span className='text-secondary fw-normal'>Requisito obrigatório</span>
                    </div>
                    
                    <div className='d-grid'>
                        <button
                            type='submit'
                            className='btn btn-warning focus-warning py-2 rounded-0 fs-4 fw-semibold '
                        >
                            Finalizar
                        </button>
                    </div>
                </form>
            </div>

        </div>
    )

}

