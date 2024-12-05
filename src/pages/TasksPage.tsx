import React, { useState, useLayoutEffect } from 'react';
import { Task } from '../types/Task';
import TaskService from '../services/TaskService';
import { convertUnixToDate } from '../utils/dateUtils';
import { Outlet, useNavigate } from 'react-router-dom';

const status = {
	0: "Not Started",
	1: "Progress",
	2: "Completed"
}

const statusStyle = {
	0: "secondary",
	1: "primary",
	2: "success"
}

export default function TasksPage() {
	const navigate = useNavigate();
	const [tasks, setTasks] = useState<Task[]>([]);
	const [error, setError] = useState(null);

	useLayoutEffect(() => {
		TaskService.getTasks(sessionStorage.getItem("divisionId"))
			.then(resolve => {
				setTasks(resolve);
			})
			.catch(error => {
				setError(error);
			});

	}, []);

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const value = e.currentTarget.getAttribute('value');
		navigate("/app/task/detail?taskId=" + value);
	}


	return (
		<>
		

				<div className="row row-cols-3 row-cols-md-2 g-3">

					{tasks.map((x, index) => (

						<div className="col" key={index}>
							<button className="btn btn-outline-secondary card shadow-2 text-start" onClick={handleClick} value={x.id}>

								<div className="card-header bg-transparent">
									<span>{x.title}</span> <br />
									<span className={`badge text-bg-${statusStyle[x.status]}`}>{status[x.status]}</span>
								</div>

								<div className="card-body">


									Due Date: <span> {convertUnixToDate(x.deadline).toLocaleDateString()} </span>

								</div>
							</button>
						</div>

					))}


				</div>

		</>
	);

}
