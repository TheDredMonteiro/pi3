var { Formulario, Grupo, Pergunta, TipoPergunta, Resposta, Pedido, EstadoPedido, MotivoRecusa, Cliente, UserIncommun, UserIncommunRole, Visita } = require('../model/tabelas')
var sequelize = require('../model/db')
const { Op } = require("sequelize");



module.exports = {

    count: async (req, res) => {
        // count conta por estado_id
        // Para contar todos os pedidos, nao passes estado na query
        const estadoId = req.query.estado_id ?? 0
        const cliente = req.query.cliente_id ?? 0
        // filtra por dias de idade (conta pedidos com até 30 dias de idade por exemplo)
        const dias = req.query.dias ?? 30
        const oquecontar = req.query.oquecontar ?? ""
        //motivo recusa bd
        const motivoId = req.query.motivo_id ?? 0

        let response = {}

        await sequelize.sync()
            /*.then(async () => {
                if (estadoId > 0) {
                    await EstadoPedido
                        .findOne({
                            where: { id: estadoId }
                        })
                        .then(res => { response.estado = res })
                }
            })
            .then(async () => {
                if (estadoId > 0) {
                    await Pedido
                        .count({
                            where: {
                                estado_id: estadoId
                            }
                        })
                        .then(count => { response = { ...response, count: count } })
                }
                if (estadoId === '0') {
                    await Pedido.count({
                        where: {
                            created_at: {
                                [Op.gte]: sequelize.literal('NOW() - INTERVAL \'' + dias + 'd\'')
                            }
                        }
                    }).then(count => {

                        response = {
                            count: count,
                            estado: {
                                icon: 'bi-ui-radios',
                                cor: 'primary',
                                descricao: 'Todo'
                            }
                        }
                    })
                }
            })*/
            .then(async () => {
                if (estadoId > 0) {
                    await EstadoPedido
                        .findOne({
                            where: {
                                id: estadoId,

                            }
                        })
                        .then(res => { response.estado = res })
                }
            })

            .then(async () => {
                switch (oquecontar) {
                    case "cliente":
                        if (estadoId > 0) {
                            await Pedido
                                .count({
                                    where: {
                                        estado_id: estadoId,
                                        cliente_id: cliente
                                    }
                                })
                                .then(count => { response = { ...response, count: count } })
                        }
                        break;
                    case "todos":
                        if (estadoId > 0) {
                            await Pedido
                                .count({
                                    where: {
                                        estado_id: estadoId
                                    }
                                })
                                .then(count => { response = { ...response, count: count } })
                        }
                        if (estadoId === '0') {
                            await Pedido.count({
                                where: {
                                    created_at: {
                                        [Op.gte]: sequelize.literal('NOW() - INTERVAL \'' + dias + 'd\'')
                                    }
                                }
                            }).then(count => {

                                response = {
                                    count: count,
                                    estado: {
                                        icon: 'bi-ui-radios',
                                        cor: 'primary',
                                        descricao: 'Todo'
                                    }
                                }
                            })
                        }
                        break;
                    case "motivo":
                        if (motivoId > 0) {
                            await Pedido.count({
                                where: {
                                    motivo_id: motivoId
                                }
                            })
                                .then(count => { response = { ...response, count: count } })
                        }
                        break;

                }

            })
        res.json(response)
    },


    all: async (req, res) => {

        const pedidoId = parseInt(req.query?.pedido_id ?? 0)
        const estadoId = parseInt(req.query?.estado_id ?? 0)
        const filtro = req.query?.filtro ?? 'id'
        const ordem = req.query?.ordem ?? 'ASC'
        const limite = parseInt(req.query?.limite ?? 30)

        let orderArray = (filtro === 'nome') ? [Cliente, filtro, ordem] : [filtro, ordem];
        await sequelize.sync()
            .then(async () => {
                await Pedido
                    .findAll({
                        where: {
                            id:
                                !!pedidoId ?
                                    { [Op.eq]: pedidoId } :
                                    { [Op.ne]: pedidoId },
                            estado_id:
                                !!estadoId ?
                                    { [Op.eq]: estadoId } :
                                    { [Op.ne]: estadoId },
                        },
                        include: [
                            { model: Cliente },
                            { model: EstadoPedido },
                            { model: MotivoRecusa },
                            {
                                model: Resposta,
                                include: { model: Pergunta }
                            }
                        ],
                        order: [orderArray, [Resposta, 'id', 'ASC']],
                        limit: limite
                    })
                    .then(response => res.status(200).json({ success: true, data: response }))
                    .catch(console.log)
            })
    },

    all_estados: async (req, res) => {
        await sequelize.sync()
            .then(async () => {
                await EstadoPedido.findAll({ order: [['id', 'ASC']] }).then(response => {
                    res.send(response)
                })
            })
    },

    all_motivos: async (req, res) => {
        await sequelize.sync()
            .then(async () => {
                await MotivoRecusa.findAll({ order: [['id', 'ASC']] }).then(response => {
                    res.send(response)
                })
            })
    },

    new: async (req, res) => {
        const bodyPedido = req.body.pedido
        const bodyRespostas = req.body.pedido.respostas ?? []
        const bodyCliente = req.body.cliente

        if (bodyPedido == undefined ||
            bodyPedido == null ||
            Object.keys(bodyPedido).length === 0 ||
            bodyRespostas.length === 0 ||
            bodyCliente == undefined ||
            bodyCliente == null ||
            Object.keys(bodyCliente).length === 0) {

            throw new Error('\x1b[31m\nAlgum dado não foi inserido. \nO body deve ser constituido por 2 objectos: pedido e cliente.\nO pedido deve ter uma array "respostas" com mais de um item.\x1b[0m')
        }

        // TODO
        // * Antes de inserir o que quer que seja, é preciso:
        // 1. ir buscar o preço das perguntas associadas
        // 2. inserir esse preço nas respostas
        // 3. calcular o valor total do pedido

        await sequelize.sync()
            // calcular preços 🥵
            .then(() => {

                bodyRespostas.forEach(async resposta => {
                    await Pergunta
                        .findOne({ where: { id: resposta.pergunta_id } })
                        .then(pergunta => {
                            resposta.valor_unitario = pergunta.valor_unitario
                            bodyPedido.valor_total += (resposta.valor_unitario * resposta.inteiro).toFixed(2)
                        })
                })
            })
            // inserir pedido 🥶
            .then(async () => {
                // ver se o cliente já existe através do email
                await Cliente
                    .findOne({
                        where: {
                            email: bodyCliente.email
                        }
                    })
                    .then(async cliente => {

                        if (cliente !== null) {
                            // Se o cliente já existe
                            await Pedido
                                .create({
                                    valor_total: bodyPedido.valor_total.toFixed(2),
                                    estado_id: 1, // pendente
                                    cliente_id: cliente.id,
                                    resposta: bodyRespostas
                                }, {
                                    include: [Resposta]
                                })
                                .then(async pedido => {
                                    await Pedido
                                        .findOne({
                                            where: { id: pedido.id },
                                            include: [
                                                { model: Cliente },
                                                { model: EstadoPedido },
                                                { model: MotivoRecusa },
                                                { model: Resposta }
                                            ]
                                        })
                                        .then(response => res.status(200).json(response))
                                })
                        } else {
                            // Se é um cliente novo
                            await Pedido
                                .create({
                                    valor_total: bodyPedido.valor_total,
                                    estado_id: 1,
                                    resposta: bodyRespostas,
                                    cliente: {
                                        nome: bodyCliente.nome,
                                        email: bodyCliente.email,
                                        empresa: bodyCliente.empresa ?? null,
                                        tlm: bodyCliente.tlm ?? null,
                                        distrito: bodyCliente.distrito ?? null
                                    }
                                }, {
                                    include: [Resposta, Cliente]
                                })
                                .then(async pedido => {
                                    await Pedido
                                        .findOne({
                                            where: { id: pedido.id },
                                            include: [
                                                { model: Cliente },
                                                { model: EstadoPedido },
                                                { model: MotivoRecusa },
                                                { model: Resposta }
                                            ]
                                        })
                                        .then(response => res.status(200).json(response))
                                })
                        }
                    })
            })
    },

    update_estado: async (req, res) => {
        if (
            !req.body.pedido_id ||
            !req.body.estado_id
        ) { res.status(400); return }

        const pedidoId = parseInt(req.body.pedido_id)
        const estadoId = parseInt(req.body.estado_id)
        const motivoId = !!parseInt(req.body.motivo_id) ? parseInt(req.body.motivo_id) : null

        await sequelize.sync()
            .then(async () => {
                await Pedido
                    .update(
                        {
                            estado_id: estadoId,
                            motivo_id: !!motivoId ? motivoId : null,
                        },
                        { where: { id: pedidoId } }
                    )
                    .then(result => { res.status(200).json({ success: true, result }) })
                    .catch(console.log)

            })
    }
}