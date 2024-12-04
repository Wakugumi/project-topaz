import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/Login'
import IndexPage from './pages/IndexPage'
import WelcomePage from './pages/WelcomePage'
import DashboardPage from './pages/DashboardPage'
import AppPage from './pages/AppPage'

function App() {

	return (
		<>
			<BrowserRouter>

				<Routes>
					<Route path='/' element={<IndexPage />} />
					<Route path='/welcome' element={<WelcomePage />} />
					<Route path='/login' element={<LoginPage />} />
					<Route path='/app' element={<AppPage />}>

						<Route path="dashboard" element={<DashboardPage />} />

					</Route>
				</Routes>

			</BrowserRouter>

		</>
	)
}

export default App
