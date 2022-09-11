
INSERT INTO user_role (id, descricao, obs) VALUES
(1, 'Admin',    'Pode ver e editar pedidos, pode ver e editar preços, pode criar novos formulários.'),
(2, 'Editor',   'Pode ver e editar pedidos.');

-- Os utilizadores têm que ser criados através de sequelize
-- para que seja guardada uma hash no campo password

/********************************** Fim USERS INCOMMUN *****************************************/

/***************************************** Estado de Pedido + Motivo de Recusa *****************************************/



/**************************************** fim grupo_perguntas ***********************************************/


/**************************************** tipo de pergunta ***********************************************/



-- UPDATE SEQUENCIAS
ALTER SEQUENCE user_incommun_role_id_seq RESTART WITH 3;
ALTER SEQUENCE cliente_id_seq RESTART WITH 11;
ALTER SEQUENCE estado_pedido_id_seq RESTART WITH 5;
ALTER SEQUENCE motivo_recusa_pedido_id_seq RESTART WITH 5;
ALTER SEQUENCE pedido_id_seq RESTART WITH 5;
ALTER SEQUENCE formulario_id_seq RESTART WITH 6;
ALTER SEQUENCE grupo_id_seq RESTART WITH 18;
ALTER SEQUENCE tipo_pergunta_id_seq RESTART WITH 11;
ALTER SEQUENCE pergunta_id_seq RESTART WITH 50;