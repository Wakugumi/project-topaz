import { useNavigate } from 'react-router-dom'
import auth from '../services/AuthService';
import { useLayoutEffect, useState } from 'react';
import Clock from '../components/Clock';
import { Worker } from '../types/Worker';

/**
	* This page mainly acts as a conditional router
	* only to render certain page if the current user is authenticated or else
**/
function IndexPage() {
	const navigate = useNavigate();
	const [username, setUsername] = useState(null);
	const [error, setError] = useState(null);

	useLayoutEffect(() => {
		if (!auth.isAuthenticated()) {
			navigate("/welcome");
		}

		try {
			auth.getUser().then((resolve: Worker) => { console.log(resolve?.name); setUsername(resolve?.name) })
				.catch((error) => { setError(error) });
		}
		catch (error: any) {

			setError(error)

		}
	}, [])

	return (
		<>

			<div className="container-fluid">
				{error && <div className="row"><div className="col-12"><div className="alert alert-danger">{error}</div></div></div>}

				<div className="row mt-5">

					<div className="col-6 px-5">
						<div className="card card-body bg-image py-5" style={{ backgroundImage: `url(${import.meta.env.VITE_PAGE_INDEX_BG})`, objectFit: 'cover' }}>

							<div className="float-start">
								<h2 className="card-title mb-3">Welcome, {username}</h2>
								<Clock />
							</div>
						</div>

					</div>

					<div className="col-6 px-5">
						<div className="d-flex flex-wrap gap-3">

							<button className="btn btn-outline-primary d-flex flex-column justify-content-center p-3" onClick={() => { navigate('/app/dashboard') }}>

								<span className="material-symbols-outlined w-100" style={{ fontSize: '4rem' }}>
									rocket_launch
								</span>
								<h4 className="fs-3">Launch</h4>
							</button>

							<button className="btn btn-outline-primary d-flex flex-column justify-content-center p-3" onClick={() => { navigate('/app/dashboard') }}>

								<span className="material-symbols-outlined w-100" style={{ fontSize: '4rem' }}>
									rocket_launch
								</span>
								<h4 className="fs-3">Launch</h4>
							</button>
							<button className="btn btn-outline-primary d-flex flex-column justify-content-center p-3" onClick={() => { navigate('/app/dashboard') }}>

								<span className="material-symbols-outlined w-100" style={{ fontSize: '4rem' }}>
									rocket_launch
								</span>
								<h4 className="fs-3">Launch</h4>
							</button>
						</div>
					</div>

				</div>
			</div>
		</>

	);

}
export default IndexPage;
