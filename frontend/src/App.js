import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import authService from './view/auth.service';
import './styles/index.css'



import NavDeCima from './view/forms/navdecima'
import NavDeLado from './view/backoffice/navdelado'
import NavDeLadob from './view/backoffice/navdeladobackend'
import NavDeLadof from './view/backoffice/navdeladofrontend'
import FrontPage from './view/forms/frontpage'
import Form from './view/forms/form'
import Footer from './view/forms/footer'
import BoLogin from './view/backoffice/login'
import BoRegistar from './view/backoffice/registar'
import BoRegistar2 from './view/backoffice/registar2'
import BoFrontLivros from './view/backoffice/frontlivros'
import BoMeusLivro from './view/backoffice/meuslivros'
import BoMinhasCategorias from './view/backoffice/minhascategorias'
import BoLivraria from './view/backoffice/livraria'
import BoRecomendados from './view/backoffice/recomendados'

import PrivateRoute from './view/backoffice/private_route'
import BoInicio from './view/backoffice/Inicio/inicio'
import BoPedidos from './view/backoffice/pedidos'
import BoFormularios from './view/backoffice/Formulario/formularios'
import BoClientes from './view/backoffice/clientes'
import BoLivros from './view/backoffice/livros'
import BoAddLivro from './view/backoffice/addlivro'
import BoAddCategoria from './view/backoffice/addcategoria'
import BoAddCategoriaF from './view/backoffice/addcategoriaF'
import BoPiechart from './view/backoffice/piechart'
import BoPedidosCliente from './view/backoffice/pedidos_cliente'
import BoLC from './view/backoffice/lc_cliente'
import BoVisitas from './view/backoffice/visitas'
import BoAlterarPedido from './view/backoffice/alterar_pedido';
import BoEstatisticas from './view/backoffice/estatisticas';

import UsersModalComponent from './view/backoffice/users_modal'
import CriarUserModalComponent from './view/backoffice/criar_user_modal'
import EliminarUserModalComponent from './view/backoffice/eliminar_user_modal'


export default function App() {

	const [perguntasObject, setPerguntasObj] = useState({})
	const [login, setLogin] = useState(process.env.REACT_APP_MODE === 'development' || (!!authService?.getCurrentUser() ?? false))

	useEffect(() => {
		// console.log('user', process.env.REACT_APP_MODE === 'development' || (authService?.getCurrentUser() ?? false))
		console.log('user', !!authService?.getCurrentUser() ?? false)
		console.log('login', login)
	}, [login])

	function BackOffice(props) {
		return (
			<PrivateRoute auth={login}>
				<div className='container-fluid'>
					<div className='row vh-100'>
						<NavDeLadob setLogin={setLogin} />
						{props.pagina}
						<UsersModalComponent />
						<CriarUserModalComponent />
						<EliminarUserModalComponent />
					</div>
				</div>
			</PrivateRoute>
		)
	}
	function Front(props) {
		return (
			<PrivateRoute auth={login}>
				<div className='container-fluid'>
					<div className='row vh-100'>

						{props.pagina}
						<UsersModalComponent />
						<CriarUserModalComponent />
						<EliminarUserModalComponent />
					</div>
				</div>
			</PrivateRoute >
		)
	}

	//<NavDeCima auth={login} /> <Footer />
	return (
		<Router>
			<Routes>
				<Route exact path='/' element={
					<>

						<FrontPage />

					</>
				} />

				<Route path='/servicos-personalizados/:nome' element={
					<>
						<NavDeCima auth={login} />
						<Form
							perguntasObject={perguntasObject}
							setPerguntasObj={setPerguntasObj}
						/>
						<Footer />
					</>
				} />
				<Route path='/back-office/frontLivros/:mail/:pass' element={

					<Front pagina={<BoFrontLivros />} />

				} />
				<Route path='/livraria/:id' element={

					<Front pagina={<BoLivraria />} />

				} />
				<Route path='/meuslivros/:id' element={

					<Front pagina={<BoMeusLivro />} />

				} />
				<Route path='/minhascategorias/:id' element={

					<Front pagina={<BoMinhasCategorias />} />

				} />
				<Route path='/recomendados/:id' element={

					<Front pagina={<BoRecomendados />} />

				} />
				<Route path='/addcategoriaF/:id' element={

					<Front pagina={<BoAddCategoriaF />} />

				} />


				<Route path='/back-office/login' element={
					<BoLogin setLogin={setLogin} />
				} />
				<Route path='/back-office/registar' element={
					<BoRegistar />
				} />
				<Route path='/back-office/registar2/:mail/:pass' element={
					<BoRegistar2 />
				} />

				<Route path='/back-office/' element={
					<BackOffice pagina={<BoInicio />} />
				} />
				<Route path='/back-office/addlivro' element={
					<BackOffice pagina={<BoAddLivro />} />
				} />
				<Route path='/back-office/addcategoria' element={
					<BackOffice pagina={<BoAddCategoria />} />
				} />
				<Route exact path='/back-office/pedidos' element={
					<BackOffice pagina={<BoPedidos />} />
				} />
				<Route path='/back-office/formularios' element={
					<BackOffice pagina={<BoFormularios />} />
				} />
				<Route exact path='/back-office/clientes' element={
					<BackOffice pagina={<BoClientes />} />
				} />
				<Route exact path='/back-office/livros' element={
					<BackOffice pagina={<BoLivros />} />
				} />
				<Route exact path='/back-office/estatisticas' element={
					<BackOffice pagina={<BoEstatisticas />} />
				} />
				<Route path='/back-office/piechart' element={
					<BackOffice pagina={<BoPiechart />} />
				} />
				<Route path='/back-office/visitas' element={
					<BackOffice pagina={<BoVisitas />} />
				} />

				{/* Rotas secundárias */}
				<Route path='/back-office/pedidos/:idPedido' element={
					<BackOffice pagina={<BoAlterarPedido />} />
				} />
				<Route path='/back-office/clientes/:idCliente' element={
					<BackOffice pagina={<BoPedidosCliente />} />
				} />
				<Route path='/back-office/lc_cliente/:idCliente' element={
					<BackOffice pagina={<BoLC />} />
				} />


				{/* se o link nao existir, volta à pagina inicial */}
				<Route path='*' element={<Navigate to='/' replace={true} />} />

			</Routes>
		</Router>
	);
}

