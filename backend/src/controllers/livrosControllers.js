var { Formulario, Grupo, Pergunta, TipoPergunta, Resposta, Livro, EstadoPedido, Categoria_Livro, Cliente, UserIncommun, UserIncommunRole, Visita, Categoria, Cliente_Livro } = require('../model/tabelas')
var sequelize = require('../model/db')
const { Op } = require("sequelize");



module.exports = {



    all: async (req, res) => {


        await sequelize.sync()
            .then(async () => {
                const data = await Livro
                    .findAll({
                        where: { deleted: 0},

                    })
                    .then(function (data) {
                        return data;
                    })
                    .catch(error => {
                        return error;
                    });
                res.json({ success: true, data: data });
            })
    },
    
    add: async (req, res) => {
        console.log("entrou")
        
        const titulo = req.body.titulo 
        const autor = req.body.autor 
        const sinopse = req.body.sinopse 
        const foto = req.body.foto 
        const stock = req.body.stock 
        const id_categoria = req.body.id_categoria
        const categoria = req.body.categoria
       

        await sequelize.sync()

            
        const data = await Livro.create({
                    

                        titulo: titulo,
                        autor: autor,
                        sinopse: sinopse,
                        foto: foto,
                        stock: stock,
                        id_categoria: id_categoria,
                        classificacao: 0,
                        n_lido: 0,
                        deleted: 0,
                        categoria: categoria
                    })
                    .then(
                        await Categoria.update({n_livros: sequelize.literal('n_livros + 1')},
                            {
                            where: { id: id_categoria }
                        })
                    )
                    .then(function (data) {
                        return data;
                    })
                    .catch(error => {
                        console.log("Erro: " + error)
                        return error;
                    })
                    
                // return res
                res.status(200).json({
                    success: true,
                    message: "Registado",
                    data: data
                })
                
        
    },
    list: async (req, res) => {
        // para filtrar por estado
        const filtro = req.query.filtro ?? 'id'
        const ordem = req.query.ordem ?? 'ASC'

        await sequelize.sync()
            .then(async () => {
                await Livro.findAll({  
                    
                    
                    include: [
                        { model: Categoria }
                    ],
                    
                    order: [
                        [filtro, ordem]
                    ]
                })

                    .then(response => res.status(200).json({ success: true, data: response }))
            })
    },
    list_recomendados: async (req, res) => {
        // para filtrar por estado
        const categoria = req.query.categoria ?? 0
        const filtro = req.query.filtro ?? 'id'
        const ordem = req.query.ordem ?? 'ASC'

        await sequelize.sync()
            .then(async () => {
                await Livro.findAll({  
                    
                     where: { id_categoria: categoria },
                    include: [
                        { model: Categoria }
                    ],
                    
                    order: [
                        [filtro, ordem]
                    ]
                })

                    .then(response => res.status(200).json({ success: true, data: response }))
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



    update_livro: async (req, res) => {
        // console.log(req.body)
        // console.log(req.body.pedido.respostas)
        if (
            !req.body.id ||
            !req.body.classificacao
        ) { res.status(400); return }

        // 1 - atualizar o valor total do pedido (já vem calculado do frontend)
        // 2 - atualizar cada valor_unitario das respostas (forEach)

        const id = req.body.id
        const classificacao = req.body.classificacao

        await sequelize.sync()
            .then(async () => {
                await Cliente_Livro
                    .update({
                        classificacao: classificacao
                    }, {
                        where: { id: id }
                    })
                    .then(count => {
                        message = !!count ? 'Pedido atualizado! ' : 'Erro a atualizar pedido. '

                        respostas.forEach(async resposta => {
                            await Resposta
                                .update({
                                    valor_unitario: resposta.valor_unitario
                                }, {
                                    where: {
                                        id: resposta.id,
                                        pedido_id: resposta.pedido_id
                                    }
                                })
                                .then(count => countRespostas += count)
                        })
                    })
            })
            .then(() => res.status(200).json({ success: true, message: message }))
            .catch(alert("errrrrrrrrrrrrro"))

    },
    count: async (req, res) => {
        // count conta por estado_id
        // Para contar todos os pedidos, nao passes estado na query
       
        const oquecontar = req.query.oquecontar ?? ""
        //motivo recusa bd
        

        let response = {}

        await sequelize.sync()

            .then(async () => {
                switch (oquecontar) {
                    case "cliente":
                        
                            await Cliente
                                .count({
                                })
                                .then(count => { response = { ...response, count: count } })
                        
                        break;
                    

                }

            })
        res.json(response)
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