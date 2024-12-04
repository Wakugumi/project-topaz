import React, { useState, useEffect, useLayoutEffect } from "react";
import task from '../../services/TaskService';
import subtask from '../../services/SubTaskService';

import api from '../../services/APIService';
import { Task } from '../../types/Task';
import { SubTask } from '../../types/SubTask';
import globalConfigService from "../../services/ConfigService";
4
export const TasksWidget = () => {
	const [error, setError] = useState("");
	const [count, setCount] = useState(0);
	const [inProgressCount, setInProgressCount] = useState(0);
	const [dueSoonCount, setDueSoonCount] = useState(0);
	


	useEffect(() => {

		const divisionId = sessionStorage.getItem("divisionId");
		const now = new Date()
		const threshold = globalConfigService.getValue("app_thresholdDue") as number;
		const dueDays = new Date().setDate(now.getDate() - threshold);

		task.countAllTasks(divisionId)
			.then(resolve => setCount(resolve))
			.catch(error => console.error(error))

		task.getTasks(divisionId)
			.then(resolve => {
				resolve.forEach((x) => {

					if (x.status == 1) setInProgressCount(inProgressCount + 1);

					const deadline = new Date(parseInt(x.deadline, 10) * 1000).getDate();
					if (deadline >= dueDays && deadline <= now.getDate()) {
						setDueSoonCount(dueSoonCount + 1);	
					}
				});
			})
			.catch(error => {

				console.error(error);
				setError(error);

			});

		console.log(globalConfigService.getAllConfig())
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
					<div className="col">
						<p>Due Soon</p>
						<p className="fs-1 text-danger">{dueSoonCount}</p>

					</div>
				</div>
			</div>
		</div>
	)

} 


export const ProgressWidget = () => {

	const [error, setError] = useState();
	const [tasks, setTasks] = useState<Task[]>([]);

	useEffect(() => {
		const divisionId = sessionStorage.getItem('divisionId');
		api.get<Task[]>("/tasks/divisions?id=" + divisionId).then( (response) => {
			setTasks(response.data);
		})
		.catch( error => {
			setError(error);
		});


		tasks.map((task, index) => {
			const total = await subtask.countAllTasks(task.id);

		})

	}, []);


	return (
		<div className="card card-body text-center d-flex flex-column gap-3">

				{error && <p className="alert alert-danger">{error}</p>}

				<ul className="list-group">
                        {tasks.map((task, index) => (
                            <li key={index} className="list-group-item">
                                <div className="d-flex justify-content-between align-items-center">
                                    <span>{task.title}</span>
                                    <span>{task.}%</span>
                                </div>
                                <div className="progress mt-2">
                                    <div
                                        className="progress-bar"
                                        role="progressbar"
                                        style={{ width: `${task.progress}%` }}
                                        aria-valuenow={task.progress}
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                    ></div>
                                </div>
                            </li>
                        ))}
                    </ul>
		</div>
	)
}