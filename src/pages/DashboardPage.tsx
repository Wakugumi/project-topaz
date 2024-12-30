import { ProgressWidget, TasksWidget } from "../components/widgets/Widgets";

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
