import React, { useState, useEffect, useLayoutEffect } from "react";
import task from '../../services/TaskService';
import subtask from '../../services/SubTaskService';

import api from '../../services/APIService';
import { Task } from '../../types/Task';
import config from "../../services/ConfigService";
import TaskService from "../../services/TaskService";

export const TasksWidget = () => {
  const [error, setError] = useState("");
  const [count, setCount] = useState(0);
  const [inProgressCount, setInProgressCount] = useState(0);
  const [dueSoonCount, setDueSoonCount] = useState(0);



  useEffect(() => {

    const divisionId = sessionStorage.getItem("divisionId");
    const now = new Date()
    const threshold = config.getValue("app_thresholdDue") as number;


    task.countAllTasks(divisionId)
      .then(resolve => setCount(resolve))
      .catch(error => console.error(error))

    task.getTasks(divisionId)
      .then(resolve => {
        resolve.forEach((x) => {

          if (x.status == 1) setInProgressCount(inProgressCount + 1);

          const deadline = new Date(parseInt(x.dueDate, 10) * 1000).getDate()
          const dueDays = deadline - now.getDate()
          if (dueDays <= threshold && dueDays >= 0) {
            console.log(x.title)
            setDueSoonCount(dueSoonCount + 1);
          }
        });
      })
      .catch(error => {

        console.error(error);
        setError(error);

      });

    task.getTasksBeforeDue(7, divisionId)
      .then((response) => {
        setDueSoonCount(response.length);
      })
      .catch(error => {
        console.error(error);
        setError(error)
      })

  }, []);

  return (
    <div className="card card-body text-center d-flex flex-column gap-3">
      <div className="container">

        {error && <p className="alert alert-danger">{error}</p>}


        <div className="hstack gap-3">
          <div className="mx-auto">

            <p>Total Tasks</p>
            <p className="fs-1">{count}</p>

          </div>
          <div className="vr"></div>
          <div className="mx-auto">
            <p>In Progress</p>
            <p className="fs-1 text-primary">{inProgressCount}</p>

          </div>
          <div className="vr"></div>
          <div className="mx-auto">
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
  const [subTaskCount, setSubTaskCount] = useState(0);
  const [completeSubTaskCount, setCompleteSubTaskCount] = useState(0);
  const [subtaskProgress, setSubtaskProgress] = useState<number[]>([0]);

  useEffect(() => {
    const divisionId = sessionStorage.getItem('divisionId');

    TaskService.getTasks(divisionId)
      .then((response) => {
        setTasks(response);
      })
      .catch(error => {
        setError(error?.message)
      })

    console.log(subtaskProgress)


  }, []);


  return (
    <div className="card">
      <div className="card-header p-3"><h4 className="card-title">Tasks Progresses</h4></div>
      <div className="card-body text-center d-flex flex-column gap-3">

        {error && <p className="alert alert-danger">{error}</p>}

        <ul className="list-group">
          {tasks.map((task, index) => (
            <li key={index} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <span>{task.title}</span>
                <span>{task.progress}%</span>
              </div>
              <div className="progress mt-2">
                <div className="progress-bar"
                  role="progressbar"
                  style={{ width: `${task.progress}%` }}
                ></div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
