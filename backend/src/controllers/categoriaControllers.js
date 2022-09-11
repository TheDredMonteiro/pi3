var { Formulario, Categoria ,Grupo, Pergunta, TipoPergunta, Resposta,Livro, Pedido, EstadoPedido, MotivoRecusa, Cliente, UserIncommun, UserIncommunRole, Visita } = require('../model/tabelas')
var sequelize = require('../model/db')
const { Op } = require("sequelize");



module.exports = {

   

    all: async (req, res) => {

        const filtro = req.query.filtro ?? 'id'
        const ordem = req.query.ordem ?? 'ASC'
        await sequelize.sync()
            .then(async () => {
                const data = await Categoria
                    .findAll({
                        order: [
                            [filtro, ordem]
                        ]
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
        
        
        const nome = req.body.nome 
        const n = 0
        
        await sequelize.sync()
        .then(async () => {

            
        await Categoria.create({
                    

                        nome: nome,
                        n_livros: n
                       
                    })
                    .then(function (data) {
                        return data;
                    })
                    .catch(error => {
                        console.log("Erro: " + error)
                        return error;
                    })
                // return res
                .then(data => {
                    res.status(200).json({
                        success: true,
                        message: "Utilizador registado com sucesso!",
                        data
                    });
                })
                .catch(error => { throw new Error(error) })
            })
    },
    categoria: async (req, res) => {
        const idc = req.query.id ?? 0
    
        await sequelize.sync()
            .then(async () => {
                const data = await Categoria
                    .findOne({
                       where:{
                        id: idc
                       }
                        
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