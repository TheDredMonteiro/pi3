import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import authService from './view/auth.service';
import './styles/index.css'


import NavDeCima from './view/forms/navdecima'
import NavDeLado from './view/backoffice/navdelado'
import Main from './view/main'
import Form from './view/forms/form'
import JumboTron from './view/forms/jumbotron'
import Footer from './view/forms/footer'

import BoLogin from './view/backoffice/login'
import PrivateRoute from './view/backoffice/private_route'
import BoInicio from './view/backoffice/inicio'
import BoPedidos from './view/backoffice/pedidos'
import BoFormularios from './view/backoffice/formularios'
import BoClientes from './view/backoffice/clientes'
import BoPiechart from './view/backoffice/piechart'
import BoPedidosCliente from './view/backoffice/pedidos_cliente'
import UsersModalComponent from './view/backoffice/users_modal';
import CriarUserModalComponent from './view/backoffice/criar_user_modal';
import EliminarUserModalComponent from './view/backoffice/eliminar_user_modal';



export default function App() {

	const [perguntasObject, setPerguntasObj] = useState({})
	const [login, setLogin] = useState(process.env.REACT_APP_MODE === 'development' || (!!authService?.getCurrentUser() ?? false))

	useEffect(() => {
		// console.log('user', process.env.REACT_APP_MODE === 'development' || (authService?.getCurrentUser() ?? false))
		console.log('user', !!authService?.getCurrentUser() ?? false)
		console.log('login', login)
	}, [login])


	return (
		<Router>
			<div className='App'>

				<Routes>
					<Route exact path='/' element={
						<>
							<NavDeCima auth={login} />
							<JumboTron />
							<Main />
							<Footer />
						</>
					} />

					<Route path='' element={
						<>
							<NavDeCima auth={login} />
							<Footer />
						</>
					}/>

					<Route path='/servicos-personalizados/:nome' element={
						<>
							<NavDeCima auth={login} />
							<Form
								perguntasObject={perguntasObject}
								setPerguntasObj={setPerguntasObj}
							/>
						</>
					} />

					<Route
						path='/back-office/login'
						element={<BoLogin setLogin={setLogin} />}

					/>





					<Route path='/back-office/' element={
						<PrivateRoute auth={login}>
							<div className='container-fluid'>
								<div className='row vh-100'>
									<NavDeLado setLogin={setLogin} />
									<BoInicio />
									<UsersModalComponent />
									<CriarUserModalComponent />
									<EliminarUserModalComponent />
								</div>
							</div>
						</PrivateRoute>
					} />

					<Route path='/back-office/clientes' element={
						<PrivateRoute auth={login}>
							<div className='container-fluid'>
								<div className='row vh-100'>

									<BoClientes />
								</div>
							</div>
						</PrivateRoute>
					} />
					<Route path='/back-office/pedidos_cliente/:Cliente' element={
						<PrivateRoute auth={login}>
							<div className='container-fluid'>
								<div className='row vh-100'>

									<BoPedidosCliente />
								</div>
							</div>
						</PrivateRoute>
					} />

					<Route path='/back-office/formularios' element={
						<PrivateRoute auth={login}>
							<div className='container-fluid'>
								<div className='row vh-100'>
									<NavDeLado setLogin={setLogin} />
									<BoFormularios />
									<UsersModalComponent />
									<CriarUserModalComponent />
									<EliminarUserModalComponent />
								</div>
							</div>
						</PrivateRoute>
					} />

					<Route path='/back-office/pedidos' element={
						<PrivateRoute auth={login}>
							<div className='container-fluid'>
								<div className='row vh-100'>
									<NavDeLado setLogin={setLogin} />
									<BoPedidos />
									<UsersModalComponent />
									<CriarUserModalComponent />
									<EliminarUserModalComponent />
								</div>
							</div>
						</PrivateRoute>
					} />

					<Route path='/back-office/piechart' element={
						<PrivateRoute auth={login}>
							<div className='container-fluid'>
								<div className='row vh-100'>
									<NavDeLado setLogin={setLogin} />
									<BoPiechart />
									<UsersModalComponent />
									<CriarUserModalComponent />
									<EliminarUserModalComponent />
								</div>
							</div>
						</PrivateRoute>
					} />



					{/* se o link nao existir (404), aparece a pagina inicial */}
					<Route path='*' element={
						<Navigate to='/' replace={true} />
					} />
				</Routes>

			</div>
		</Router>
	);
}

