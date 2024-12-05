import { useState } from "react"
import { Link, NavLink } from "react-router-dom";


function Sidebar() {

	const [route, setRoute] = useState("");

	return (
		<>
			<div className="sidebar px-3 bg-transparent text-light">
				<div className="sidebar-sticky d-flex flex-column gap-3">

					<div className="mb-3">
						<h2 className="fs-1">{import.meta.env.VITE_APP_NAME}</h2>
					</div>

					<ul className="nav nav-pills flex-column">

						<li className="nav-item">

							<NavLink className={({ isActive }) => `d-flex gap-3 p-3 nav-link ${isActive ? "active" : ""}`} to="/app/dashboard">
								<span className="material-symbols-outlined">
									dashboard
								</span>
								Dashboard</NavLink>
						</li>

					</ul>

					<hr />

					<ul className="nav nav-pills flex-column gap-3">
						<h4>Management</h4>
						<li className="nav-item">
							<NavLink className={({ isActive }) => `d-flex gap-3 p-3 nav-link ${isActive ? "active" : ""}`} to="/app/tasks">
								<span className="material-symbols-outlined">
									work
								</span>
								Tasks</NavLink>
						</li>


						<li className="nav-item">
							<NavLink className={({ isActive }) => `d-flex gap-3 p-3 nav-link ${isActive ? "active" : ""}`} to="/app/workers">
								<span className="material-symbols-outlined">
									person_apron
								</span>
								Workers</NavLink>
						</li>
					</ul>

				</div></div >
		</>
	);
}

export default Sidebar;
