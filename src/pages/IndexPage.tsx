import { useNavigate } from 'react-router-dom'
import auth from '../services/AuthService';
import DivisionService from '../services/DivisionService';
import { useLayoutEffect, useState } from 'react';
import { Worker } from '../types/Worker';
import AuthService from '../services/AuthService';
import Typewriter from '../components/Typewriter';
import { Division } from '../types/Division';

/**
	* This page mainly acts as a conditional router
	* only to render certain page if the current user is authenticated or else
**/
function IndexPage() {
	const navigate = useNavigate();
	const [user, setUser] = useState<Worker | null>(null)
	const [division, setDivision] = useState<Division | null>(null);
	const [avatar, setAvatar] = useState("");
	const [error, setError] = useState(null);

	useLayoutEffect(() => {
		try {
			auth.getUser().then((resolve: Worker) => {
				setUser(resolve);
				setAvatar(
					`https://ui-avatars.com/api/?name=${encodeURIComponent(resolve?.name)}&background=random`);
			})
				.catch((error) => { setError(error) });


		}
		catch (error: any) {

			setError(error)

		} finally {
			DivisionService.getDivision(sessionStorage.getItem('divisionId'))
				.then((resolve: Division) => { setDivision(resolve) })
				.catch((error: any) => { setError(error) });


		}
	}, [])

	const handleLogout = (e: any) => {
		e.preventDefault();
		AuthService.logout();
		navigate("/welcome");
	}

	return (
		<>

			<div className="container-fluid">
				{error && <div className="row"><div className="col-12"><div className="alert alert-danger">{error}</div></div></div>}

				<div className="row mt-5 gap-5">

					<div className="col-12">
						<div className="card card-body bg-image px-5 py-4 shadow" style={{ backgroundImage: `url(${import.meta.env.VITE_PAGE_INDEX_BG})`, objectFit: 'cover' }}>

							<div className="d-flex flex-row justify-content-between align-items-center">

								<div className="">
									<h1 className="display-6">Vivaldi.com</h1>
								</div>

								<h2>
									<Typewriter
										texts={['Welcome', 'Bonjour', 'Selamat Datang', 'Punten', 'いらっしゃいませ', '歡迎']}
										typingSpeed={100}
										delayBetweenTexts={1000}
									/>
									&nbsp; <span className="text-primary">{user?.name}</span></h2>
							</div>
						</div>

					</div>

					<div className="col-12">

						<div className="card card-body p-3 d-flex flex-row align-items-center gap-5">

							<img src={avatar}
							className="rounded float-start"
							style={{ width: '12rem' }}></img>

							<div className="vstack gap-1 justify-content-center">
								<h4>{user?.name}</h4>
								<span><span className="text-secondary">Department:</span> {division?.name}</span>
								<span><span className="text-secondary">Role </span> Division Supervisor <span className="text-secondary">under </span>@Manager</span>

							</div>


						</div>


					</div>


					<div className="col-12">
						<div className="d-flex flex-wrap gap-3 me-auto">

							<button className="btn btn-outline-primary d-flex flex-column justify-content-center p-3" onClick={() => { navigate('/app/dashboard') }}>

								<span className="material-symbols-outlined w-100" style={{ fontSize: '4rem' }}>
									rocket_launch
								</span>
								<h4 className="fs-3">Launch</h4>
							</button>

							{/* <button className="btn btn-outline-primary d-flex flex-column justify-content-center p-3" onClick={() => { navigate('/app/dashboard') }}>

								<span className="material-symbols-outlined w-100" style={{ fontSize: '4rem' }}>
									settings
								</span>
								<h4 className="fs-3">Settings</h4>
							</button> */}

							<button className="btn btn-outline-danger d-flex flex-column justify-content-center p-3" onClick={handleLogout}>

								<span className="material-symbols-outlined w-100" style={{ fontSize: '4rem' }}>
									logout
								</span>
								<h4 className="fs-3">Log Out</h4>
							</button>
						</div>
					</div>

				</div>
			</div >
		</>

	);

}
export default IndexPage;
