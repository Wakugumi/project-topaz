import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/Login'
import IndexPage from './pages/IndexPage'
import WelcomePage from './pages/WelcomePage'
import DashboardPage from './pages/DashboardPage'
import AppPage from './pages/AppPage'
import { useLayoutEffect, useState } from 'react'
import globalConfigService from './services/ConfigService'
import TasksPage from './pages/TasksPage'
import ProtectedRoute from './components/ProtectedRoute'
import AuthService from './services/AuthService'
import TaskDetailPage from './pages/TaskDetailPage'
import WorkerPage from './pages/WorkerPage'
import SubtaskPage from './pages/SubtaskPage'
import TaskPage from './pages/TaskPage'

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState(true);

	useLayoutEffect(() => {
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
					<Route path='/login' element={<LoginPage setIsAuthenticated={setIsAuthenticated}/>} />
					<Route path='/app' element={<ProtectedRoute isAuthenticated={isAuthenticated}> <AppPage /> </ProtectedRoute>}>

						<Route path="dashboard" element={<DashboardPage />} />
						<Route path="tasks" element={<TasksPage />} />
						<Route path="task" element={<TaskPage />}>
						    <Route path="detail" element={<TaskDetailPage />} />
							<Route path="item" element={<SubtaskPage />} />
						</Route>

						<Route path="workers" element={<WorkerPage />}></Route>
					</Route>
				</Routes>

			</BrowserRouter >

		</>
	)
}

export default App
