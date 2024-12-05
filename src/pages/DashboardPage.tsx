import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { ProgressWidget, TasksWidget } from "../components/widgets/Widgets";
import { Worker } from "../types/Worker";

export default function DashboardPage() {

	return (

		<>
				<div className="row">

					<div className="d-flex flex-column gap-3">
						<TasksWidget />
						<ProgressWidget />
					</div>

				</div>


		</>


	);


}
