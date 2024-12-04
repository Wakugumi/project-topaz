import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function AppPage() {

	return (

		<>
			<div className="container-fluid py-3">
				<div className="row">
					<div className="col-lg-3">
						<Sidebar />
					</div>

					<div className="col-lg-9">
						<main className="bg-light py-1 px-3">
							<Navbar />

							<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
								<h2 className="h2">Workflow Management</h2>
							</div>

							<div className="row">
								{/* Create a grid of empty cards */}
								{Array.from({ length: 6 }).map((_, index) => (
									<div className="col-md-4 mb-4" key={index}>
										<div className="card h-100">
											<div className="card-body d-flex align-items-center justify-content-center">
												<h5 className="card-title">Workflow Stage {index + 1}</h5>
											</div>
										</div>
									</div>
								))}
							</div>
						</main>
					</div>
				</div>
			</div>


		</>


	);


}
