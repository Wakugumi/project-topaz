import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { Task } from '../types/Task';
import { Worker } from '../types/Worker';

import TaskService from '../services/TaskService';
import { convertUnixToDate } from '../utils/dateUtils';
import { CreateSubTask, SubTask } from '../types/SubTask';
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

const statusStyle = {
	0: "secondary",
	1: "primary",
	2: "success"
}

const TaskDetailPage: React.FC = () => {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const [data, setData] = useState<Task | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [subTasks, setSubTasks] = useState<SubTask[]>([]);
	const [staffs, setStaffs] = useState<Worker[]>([]);
	const [Form, setForm] = useState<CreateSubTask>({
		title: '',
		description: '',
		deadline: "",
		workerIds: [],
	});

	const id = searchParams.get('taskId');

	useEffect(() => {
		if (!id) {
			setError('No ID provided in query parameters.');
			return;
		}
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
		TaskService.getTask(id)
			.then(result => {
				setData(result);
			})
			.catch((error: any) => {
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
		const value = e.currentTarget.getAttribute('value');
		navigate("/app/task/item?subtaskId=" + value + "&taskId=" + id);
	}

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...Form, title: e.target.value, description: Form?.description || '', deadline: Form?.deadline || '', workerIds: Form?.workerIds || [] });
	}

	const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setForm({ ...Form, title: Form?.title || '', description: e.target.value, deadline: Form?.deadline || '', workerIds: Form?.workerIds || [] });
	}
	const handleDeadlineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...Form, title: Form?.title || '', description: Form?.description || '', deadline: e.target.value, workerIds: Form?.workerIds || [] });
	}
	const handleWorkerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const values = Array.from(e.target.selectedOptions, (option) => option.value);
		setForm({ ...Form, title: Form?.title || '', description: Form?.description || '', deadline: Form?.deadline || '', workerIds: values });
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		await SubTaskService.createSubTask(Form, data)
			.then(result => {
				console.log(result)
				window.location.reload();
			})
			.catch(error => {
				setError(error);
			});
	}



	return (
	<>
			<div className="row">

				<div className="col-6">
					<div className="list-group">
					<div className="mb-3">

						<h4>Subtasks</h4>
					</div>

						{subTasks.map((item, index) => (

							<button onClick={handleClick} value={item.id}
								className="list-group-item list-group-item-action" key={index}>

								<div className="d-flex w-100 justify-content-between">

									<h5 className="mb-1"> {item.title} </h5>
									<small className={`badge text-bg-${statusStyle[item?.status.toString()]} my-auto`}> {status[item.status.toString()]} </small>
								</div>
								<p className="mb-1"> { item.description } </p>
								<small className="text-secondary"> Issued at {convertUnixToDate(item.issueDate).toLocaleString()}</small>

							</button>

						))}

					</div>

				</div>


				<div className="col-6">

					<form onSubmit={handleSubmit}>
						<div className="mb-3">

							<h4>Add Subtask</h4>
						</div>

						<div className="mb-3">
							<label htmlFor="title" className="form-label">Title</label>
							<input type="text" className="form-control" id="title" name="title" value={Form?.title} onChange={handleTitleChange} />
						</div>

						<div className="mb-3">
							<label htmlFor="description" className="form-label">Description</label>
							<textarea className="form-control" id="description" name="description" value={Form?.description} onChange={handleDescriptionChange} />
						</div>

						<div className="mb-3">
							<label htmlFor="deadline" className="form-label">Due Date</label>
							<input type="date" className="form-control" id="deadline" name="deadline" value={Form?.deadline} onChange={handleDeadlineChange} />
						</div>

						<div className="mb-3">
							<label htmlFor="multiSelect" className="form-label">
								Select Options
							</label>
							<select
								id="multiSelect"
								className="form-select"
								multiple
								value={Form?.workerIds}
								onChange={handleWorkerChange}
								required
							>
								{staffs.map((staff, index) => (
								<option key={index} value={staff.id}>
									{staff.name}
								</option>
								))}
							</select>
							</div>

						<button type="submit" className="btn btn-primary">Save</button>
					</form>
				</div>

			</div>


	</>
	);
};

export default TaskDetailPage;

