var {  Cliente, User, UserRole } = require('../model/tabelas')
const jwt = require('jsonwebtoken');
const config = require('../config');
const bcrypt = require('bcrypt');
const sequelize = require('../model/db');
const { Op } = require("sequelize");

module.exports = {

    login: async (req, res) => {

        let email, password = null

        if (!!req.body.email && !!req.body.password) {
            email = req.body.email
            password = req.body.password
        } else {
            res.status(403).json({
                success: false,
                message: 'Dados necessários: email e password'
            });
            return
        }

        let user = await User
            .findOne({ where: { email: email } })
            .then(data => { return data })
            .catch(error => { console.log(error) })

        console.log(user)


        if (!!user) {
            const passwordMatch = bcrypt.compareSync(password, user.password);
            console.log("b")
            if (user.password == password) {
                console.log("a")
                let token = jwt.sign({ email: email }, config.JWT_SECRET,
                    // { expiresIn: '24h' }
                );

                res.status(200).json({
                    success: true,
                    message: 'Autenticação realizada com sucesso!',
                    token: token,
                    username: user.username,
                    email: user.email
                });
                return
            }
        }

        res.status(403).json({
            success: false,
            message: 'Dados inválidos.'
        });
    },

    list: async (req, res) => {
        await sequelize.sync()
            .then(async () => {
                await User
                    .findAll({
                        attributes: ['username', 'email'],
                        include: {
                            model: UserRole,
                            attributes: ['descricao', 'obs']
                        }
                    })
                    .then(data => { res.json({ success: true, data }) })
                    .catch(error => { return error })
            })

    },

    register: async (req, res) => {
        if (
            !req.body.username ||
            !req.body.email ||
            !req.body.password ||
            !req.body.role
        ) {
            res.status(400).json({
                success: false,
                message: 'Faltam dados! É preciso username, email, password, e role.'
            })
            return
        }

        const username = req.body.username
        const email = req.body.email
        const password = req.body.password
        const role = req.body.role

        await sequelize.sync()
            .then(async () => {

                let userJaExiste = await UserIncommun
                    .findOne({
                        where: {
                            [Op.or]: [
                                { email: email },
                                { username: username }
                            ]
                        }
                    })

                if (userJaExiste) {
                    res.json({
                        success: false,
                        message: 'Utilizador com esse email já existe.'
                    })
                    return
                }

                await UserIncommun
                    .create({
                        username: username,
                        email: email,
                        password: password,
                        role_id: role
                    })
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

    delete: async (req, res) => {
        if (!req.body.email) {
            res.json({
                success: false,
                message: 'Faltam dados! É preciso email.'
            })
            return
        }

        const email = req.body.email

        await sequelize.sync()
            .then(async () => {
                await UserIncommun
                    .findOne({ where: { email: email } })
                    .then(async found => {
                        if (!!found) {
                            await UserIncommun
                                .destroy({ where: { email: email } })


                                .then(destroyed => {
                                    res.json({
                                        success: true,
                                        message: 'Utilizador eliminado.'
                                    })
                                })
                        }

                        else {
                            res.json({
                                success: false,
                                message: 'Utilizador não encontrado.'
                            })
                        }
                    })
            })
    },
}

