const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./db');
const bcrypt = require('bcryptjs')

// ######################################################
// ################### DEFINIÇÕES #######################
// ######################################################

const Formulario = sequelize.define('formulario',
    {
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descricao: {
            type: DataTypes.STRING
        }
    },
    {
        freezeTableName: true,
        paranoid: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    }
)

const Grupo = sequelize.define('grupo',
    {
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        freezeTableName: true,
        paranoid: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    }
)

const Pergunta = sequelize.define('pergunta',
    {
        texto: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descricao: {
            type: DataTypes.STRING
        },
        preco: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                isFloat: {
                    args: true,
                    msg: 'Não é um FLOAT válido'
                }
            }
        },
        tipo: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: true,
                isIn: {
                    args: [['checkbox', 'radio', 'slider', 'card', 'text']],
                    msg: 'Tem que ser um dos seguintes: checkbox, radio, slider, card, text.'
                }
            }
        }
    },
    {
        freezeTableName: true,
        paranoid: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    }
)

const Resposta = sequelize.define('resposta',
    {
        texto: {
            type: DataTypes.STRING
        },
        inteiro: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0
            }
        },
        preco_unitario: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                isFloat: {
                    args: true,
                    msg: 'Não é um FLOAT válido'
                }
            }
        }
    },
    {
        freezeTableName: true,
        timestamps: false,
        validate: {
            EitherTextoInteiro() {
                if ((this.texto === null) && (this.inteiro === null)) {
                    throw new Error('Pelo menos um de "texto" ou "inteiro" tem que estar preenchido.')
                }
            }
        }
    }
)

const Pedido = sequelize.define('pedido',
    {
        preco_total: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                isFloat: {
                    args: true,
                    msg: 'O preço total não é um FLOAT válido.'
                },
                notNull: {
                    args: true,
                    msg: 'O preço total do pedido não pode estar vazio.'
                }
            }
        }
    },
    {
        freezeTableName: true,
        paranoid: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    }
)

const EstadoPedido = sequelize.define('estado_pedido',
    {
        descricao: {
            type: DataTypes.STRING,
            allowNull: false,
            notNull: {
                args: true,
                msg: 'A descrição do estado do pedido não pode estar vazia.'
            }
        },
        obs: DataTypes.STRING
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
)

const MotivoRecusa = sequelize.define('motivo_recusa_pedido',
    {
        descricao: {
            type: DataTypes.STRING,
            allowNull: false,
            notNull: {
                args: true,
                msg: 'A descrição do motivo de recusa do pedido não pode estar vazia.'
            }
        },
        obs: DataTypes.STRING
    }, 
    {
        freezeTableName: true,
        timestamps: false,
    }
)

const Cliente = sequelize.define('cliente',
    {
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: 'O nome do cliente não pode estar vazio.'
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: 'O email do cliente não pode estar vazio. Os orçamentos são enviados para lá!'
                },
                isEmail: {
                    args: true,
                    msg: 'O email inserido não é válido'
                }
            }
        },
        empresa: {
            type: DataTypes.STRING
        },
        tlm: {
            type: DataTypes.INTEGER
        },

    },
    {
        freezeTableName: true,
        paranoid: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    }
)

// ######################################################
// ################### ASSOCIAÇÕES ######################
// ######################################################

// Formulario  1:N  GrupoPerguntas
Formulario.hasMany(Grupo, {
    foreignKey: {
        name: 'formulario_id',
        allowNull: false
    }
});
Grupo.belongsTo(Formulario, {
    foreignKey: {
        name: 'formulario_id',
        allowNull: false
    }
});

// ######################################################

// GrupoPerguntas  1:N  Pergunta
// ? as perguntas não precisam de necessariamente ter um grupo
// * Não há nenhum caso disto, mas não é impossível,
// * daí a foreignKey poder ser null
Grupo.hasMany(Pergunta, { foreignKey: 'grupo_id' });
Pergunta.belongsTo(Grupo, { foreignKey: 'grupo_id' });

// ######################################################


// Pedido  N:1  Cliente
Cliente.hasMany(Pedido, {
    foreignKey: {
        name: 'cliente_id',
        allowNull: false
    }
});
Pedido.belongsTo(Cliente, {
    foreignKey: {
        name: 'cliente_id',
        allowNull: false
    }
});

// ######################################################

EstadoPedido.hasMany(Pedido, {
    foreignKey: {
        name: 'estado_id',
        allowNull: false
    }
});
Pedido.belongsTo(EstadoPedido, {
    foreignKey: {
        name: 'estado_id',
        allowNull: false
    }
})

// ######################################################

MotivoRecusa.hasMany(Pedido, { foreignKey: 'motivo_id' });
Pedido.belongsTo(MotivoRecusa, { foreignKey: 'motivo_id' })

// ######################################################

// Resposta  N:1  Pedido
Pedido.hasMany(Resposta, {
    foreignKey: {
        name: 'pedido_id',
        allowNull: false
    }
});
Resposta.belongsTo(Pedido, {
    foreignKey: {
        name: 'pedido_id',
        allowNull: false
    }
});

// ######################################################

// Pergunta  1:N  Resposta
Pergunta.hasMany(Resposta, {
    foreignKey: {
        name: 'pergunta_id',
        allowNull: false
    }
});
Resposta.belongsTo(Pergunta, {
    foreignKey: {
        name: 'pergunta_id',
        allowNull: false
    }
});

// ######################################################
// ################# USER BACK OFFICE ###################
// ######################################################

const UserIncommun = sequelize.define('user_incommun', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
})

// https://www.npmjs.com/package/bcryptjs#usage---sync
UserIncommun.beforeCreate(user => {

    return bcrypt.hash(user.password, 10)
        .then(hash => { user.password = hash; })
        .catch(err => { throw new Error(err); });
});

const UserIncommunRole = sequelize.define('user_incommun_role', {
    descricao: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    obs: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true,
    timestamps: false
})

UserIncommunRole.hasMany(UserIncommun, {
    foreignKey: {
        name: 'role_id',
        allowNull: false
    }
})
UserIncommun.belongsTo(UserIncommunRole, {
    foreignKey: {
        name: 'role_id',
        allowNull: false
    }
})

module.exports = {
    Formulario, Grupo, Pergunta, Resposta, Pedido, EstadoPedido, MotivoRecusa, Cliente, UserIncommun, UserIncommunRole
}