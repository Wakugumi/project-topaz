import React, { useState, useEffect } from "react";
import task from '../../services/TaskService';
import { Task } from '../../types/Task';
import { Worker } from "../../types/Worker";
import AuthService from "../../services/AuthService";

export const TasksWidget = () => {
	const [error, setError] = useState("");
	const [count, setCount] = useState(0);
	const [inProgressCount, setInProgressCount] = useState(0);
	const [dueSoonCount, setDueSoonCount] = useState(0);

	useEffect(() => {
		const divisionId = sessionStorage.getItem("divisionId");
		const now = new Date()
		const dueDays = new Date().setDate(now.getDate() - 3);

		task.countAllTasks(divisionId)
			.then(resolve => setCount(resolve))
			.catch(error => console.error(error))

		task.getTasks(divisionId)
			.then(resolve => {
				resolve.forEach((x) => {

					if (x.status == 1) setInProgressCount(inProgressCount + 1);

					const deadline = new Date(parseInt(x.deadline, 10) * 1000;
					if (deadline >= dueDays && deadline <= now
				});
			})
			.catch(error => {

				console.error(error);
				setError(error);

			});

	}, []);

	return (
		<div className="card card-body text-center d-flex flex-column gap-3">
			<div className="container">

				{error && <p className="alert alert-danger">{error}</p>}


				<div className="row">
					<div className="col">

						<p>Total Tasks</p>
						<p className="fs-1">{count}</p>

					</div>
					<div className="col">
						<p>In Progress</p>
						<p className="fs-1 text-primary">{inProgressCount}</p>

					</div>
				</div>
			</div>
		</div>
	)

} 
