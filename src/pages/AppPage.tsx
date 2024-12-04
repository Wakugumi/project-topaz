import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useEffect } from "react";
import { configService } from "../services/ConfigService";

export default function AppPage() {

	useEffect(() => {
		const loadConfig = async () => {
			try {
				await configService.loadConfig();
			} catch (error) {
				console.error(error);
			}
		}
		loadConfig();
	}, []);

	return (

		<>
			<div className="container-fluid py-3 bg-light">
				<div className="row">
					<div className="col-lg-3">
						<Sidebar />
					</div>

					<div className="col-lg-9">
						<main className="bg-body rounded-3 py-1 px-3 d-flex flex-column gap-5">
							<Navbar />

							<Outlet />

						</main>
					</div>
				</div>
			</div>


		</>


	);


}
