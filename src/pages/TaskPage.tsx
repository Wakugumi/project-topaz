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

const TaskPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const taskId = searchParams.get('taskId') as string;
  const navigate = useNavigate();
  const [data, setData] = useState<Task | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [subTasks, setSubTasks] = useState<SubTask[]>([]);
  const [staffs, setStaffs] = useState<Worker[]>([]);
  const [Form, setForm] = useState<CreateSubTask>({
    title: '',
    description: '',
    dueDate: "",
    userIds: [],
    taskId: taskId
  });



  useEffect(() => {
    if (!taskId) {
      setError('No ID provided in query parameters.');
      return;
    }
    SubTaskService.getSubtasks(taskId)
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
    TaskService.getTask(taskId)
      .then(result => {
        setData(result);
      })
      .catch((error: any) => {
        setError(error);
      });

  }, [taskId]);

  if (error) {
    return <p className="text-danger">Error: {error}</p>;
  }

  if (!data) {
    return <p>Loading...</p>;
  }


  return (
    <div className="container-fluid">
      <div className="row mb-5">

        <div className="mb-4 hstack gap-4">
          <span className="rounded-pill py-2 px-4 fs-4 bg-body-secondary">Task</span>
          <div className="vr"></div>
          <h1 className="display-6">{data.title}</h1>
        </div>

        <div className="hstack gap-3">

          <div className="border border-secondary rounded-pill py-2 px-3 hstack gap-3">
            <label htmlFor="issueDate">Issue Date</label>
            <div className="vr"></div>
            <span id="issueDate">{convertUnixToDate(data.issueDate).toLocaleString()}</span>
          </div>
          <div className="border border-secondary rounded-pill py-2 px-3 hstack gap-3">

            <label htmlFor="dueDate">Due Date</label>
            <div className="vr"></div>
            <span id="dueDate">{convertUnixToDate(data.dueDate).toLocaleDateString()}</span>
          </div>


          <div className={`border rounded-pill py-2 pe-2 px-3 hstack gap-3`}>

            <label htmlFor="status">Status</label>
            <div className="vr"></div>
            <span id='status' className={`rounded-pill gap-2 py-2 pe-3 px-2 bg-${statusStyle[data.status]}
            d-flex flex-row justify-content-center align-items-center`}>
              <span className={`text-${statusStyle[data.status as number]}-emphasis
              material-symbols-outlined`}>adjust</span>
              <span>{status[data.status]}</span>
            </span>
          </div>
        </div>

      </div >

      <hr></hr>

      <Outlet />

    </div >
  );
};

export default TaskPage;

