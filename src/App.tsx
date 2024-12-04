import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/Login'
import IndexPage from './pages/IndexPage'
import WelcomePage from './pages/WelcomePage'
import DashboardPage from './pages/DashboardPage'
import AppPage from './pages/AppPage'
import { useLayoutEffect, useState, useEffect } from 'react'
import globalConfigService from './services/ConfigService'
import TasksPage from './pages/TasksPage'
import ProtectedRoute from './components/ProtectedRoute'
import AuthService from './services/AuthService'
import TaskDetailPage from './pages/TaskDetailPage'

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useLayoutEffect(() => {
		console.log(AuthService.isAuthenticated())
		setIsAuthenticated(AuthService.isAuthenticated())

		const loadConfig = async () => {
			try {
				await globalConfigService.loadConfig();
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoading(false)
			}
		}
		loadConfig();
	}, []);

	if (isLoading) {
		return (<h1>Loading</h1>);
	}

	return (
		<>
			<BrowserRouter>

				<Routes>
					<Route path='/' element={<ProtectedRoute isAuthenticated={isAuthenticated} > <IndexPage /> </ProtectedRoute>} />
					<Route path='/welcome' element={<WelcomePage />} />
					<Route path='/login' element={<LoginPage />} />
					<Route path='/app' element={<ProtectedRoute isAuthenticated={isAuthenticated}> <AppPage /> </ProtectedRoute>}>

						<Route path="dashboard" element={<DashboardPage />} />
						<Route path="tasks" element={<TasksPage />} >

						</Route>
						<Route path="taskDetail" element={<TaskDetailPage />} />
					</Route>
				</Routes>

			</BrowserRouter >

		</>
	)
}

export default App
