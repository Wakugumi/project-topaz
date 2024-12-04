import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function Navbar() {
	const navigate = useNavigate();

	const handleShutdown = (e: any) => {
		e.preventDefault();
		navigate("/");
	}

	return (
		<nav className="navbar navbar-expand-lg navbar-light shadow-sm rounded p-3">
			<div className="container-fluid">
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav ms-auto">
						<li className="nav-item dropdown">
							<a
								className="nav-link dropdown-toggle"
								id="profileDropdown"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								<img src="https://via.placeholder.com/40" alt="Profile" className="rounded-circle" />
							</a>

							<ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">

								<li>
									<button
										className="dropdown-item btn btn-danger"
										onClick={handleShutdown}

									>Logout</button>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
