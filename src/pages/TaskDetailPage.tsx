import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Task } from '../types/Task';
import TaskService from '../services/TaskService';
import { convertUnixToDate } from '../utils/dateUtils';
import { SubTask } from '../types/SubTask';
import SubTaskService from '../services/SubTaskService';
import WorkerService from '../services/WorkerService';

interface Data {
	id: string;
	name: string;
	description: string;
}

const status = {
	0: "Not Started",
	1: "In Progress",
	2: "Completed"
}

const TaskDetailPage: React.FC = () => {
	const [searchParams] = useSearchParams();
	const [data, setData] = useState<Task | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [subTasks, setSubTasks] = useState<SubTask[]>([]);
	const [staffs, setStaffs] = useState<Worker[]>([]);

	const id = searchParams.get('id');

	useEffect(() => {
		if (!id) {
			setError('No ID provided in query parameters.');
			return;
		}

		TaskService.getTask(id)
			.then(result => {
				setData(result);
			})
			.catch((error: any) => {
				setError(error);
			});

		SubTaskService.getSubtasks(id)
			.then(result => {
				setSubTasks(result)
			})
			.catch(error => {
				setError(error)
			});

		WorkerService.getStaffs(sessionStorage.getItem("divisionId"))
			.then(result => {
				setStaffs(result);
			})
			.catch(error => {
				setError(error);
			});
	}, [id]);

	if (error) {
		return <p className="text-danger">Error: {error}</p>;
	}

	if (!data) {
		return <p>Loading...</p>;
	}

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()

	}

	return (
		<div className="container-fluid">
			<div className="row mb-5">

				<h1 className="display-6 mb-4">{data.title}</h1>

				<div className="hstack gap-3">

					<div className="border border-secondary rounded-pill py-2 px-3 hstack gap-3">
						<label htmlFor="issueDate">Issue Date</label>
						<div className="vr"></div>
						<span id="issueDate">{convertUnixToDate(data.issueDate).toLocaleString()}</span>
					</div>
					<div className="border border-secondary rounded-pill py-2 px-3 hstack gap-3">

						<label htmlFor="dueDate">Due Date</label>
						<div className="vr"></div>
						<span id="dueDate">{convertUnixToDate(data.deadline).toLocaleDateString()}</span>
					</div>


					<div className="border border-secondary rounded-pill py-2 px-3 hstack gap-3">

						<label htmlFor="dueDate">Status</label>
						<div className="vr"></div>
						<span id="dueDate">{status[data.status]}</span>
					</div>
				</div>

			</div>

			<hr></hr>

			<div className="row">

				<div className="col-6">
					<div className="list-group">
						<a href="#" className="list-group-item list-group-item-action">
							<div className="d-flex w-100 justify-content-between">
								<h5 className="mb-1">List group item heading</h5>
								<small>3 days ago</small>
							</div>
							<p className="mb-1">Some placeholder content in a paragraph.</p>
							<small>And some small print.</small>
						</a>

						{subTasks.map((item, index) => (

							<button onClick={handleClick}
								className="list-group-item list-group-item-action" key={index}>

								<div className="d-flex w-100 justify-content-between">

									<h5 className="mb-1"> {item.title} </h5>
									<small> {status[item.status]} </small>
								</div>
								<p className="mb-1"> {convertUnixToDate(item.issueDate).toLocaleString()}</p>
								<small>{item.description}</small>
							</button>

						))}

					</div>

				</div>


				<div className="col-6">

					<form>
						<div className="mb-3">

							<h4>Add Subtask</h4>
						</div>

						<div className="mb-3">
							<label htmlFor="title" className="form-label">Title</label>
							<input type="text" className="form-control" id="title" name="title" />
						</div>

						<div className="mb-3">
							<label htmlFor="description" className="form-label">Description</label>
							<textarea className="form-control" id="description" name="description" />
						</div>

						<div className="mb-3">
							<label htmlFor="deadline" className="form-label">Due Date</label>
							<input type="date" className="form-control" id="deadline" name="deadline" />
						</div>

						<button type="submit" className="btn btn-primary">Save</button>
					</form>
				</div>

			</div>


		</div >
	);
};

export default TaskDetailPage;

