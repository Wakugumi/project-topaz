import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar() {
	return (
		<nav className="navbar navbar-expand-lg navbar-light shadow-sm rounded p-3">
			<div className="container-fluid">
				<div className="collapse navbar-collapse" id="navbarNav">
					<div className="ms-auto">
						<img src="https://via.placeholder.com/40" alt="Profile" className="rounded-circle" />
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
