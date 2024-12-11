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


      <div className="row g-4">

        {tasks.map((x, index) => (

          <div className="col-3" key={index}>
            <button className="btn btn-outline-light card shadow-2 text-start w-100 d-block p-0" onClick={handleClick} value={x.id}>

              <div className="card-header bg-transparent border-bottom-0">
                <div className="fs-4 fw-light">{x.title}</div>

              </div>

              <div className="card-body p-4">


                Due Date: <span> {convertUnixToDate(x.dueDate).toLocaleDateString()} </span>

              </div>

              <div className="card-footer bg-transparent border-top-0 p-4 text-center">
                <div className={`rounded-pill p-2 text-bg-${statusStyle[x.status]}`}>{status[x.status]}</div>
              </div>
            </button>
          </div>

        ))}


      </div>

    </>
  );

}
