import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { TasksWidget } from "../components/widgets/Widgets";
import { Worker } from "../types/Worker";

export default function DashboardPage() {

	return (

		<>
			<div className="container-fluid">
				<div className="row">

					<div className="col">
						<TasksWidget />
					</div>

				</div>
			</div>


		</>


	);


}
