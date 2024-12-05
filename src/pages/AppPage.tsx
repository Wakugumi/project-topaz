import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useEffect, useLayoutEffect } from "react"
import configService from "../services/ConfigService";

export default function AppPage() {

	useLayoutEffect(() => {
		configService.loadConfig().then(() => {
			console.log("Config loaded");
		}).catch(() => {
			console.log("Error loading config");
		})
	}, []);

	return (

		<>
			<div className="container-fluid py-3 bg-body">
				<div className="row">
					<div className="col-lg-3">
						<Sidebar />
					</div>

					<div className="col-lg-9">
						<main className="bg-body-secondary rounded p-3 d-flex flex-column gap-5">
							<Navbar />

							<Outlet />

						</main>
					</div>
				</div>
			</div>


		</>


	);


}
