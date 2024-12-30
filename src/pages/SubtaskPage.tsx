import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SubTask, UpdateSubTask } from "../types/SubTask";
import SubTaskService from "../services/SubTaskService";
import { convertUnixToDate } from "../utils/dateUtils";
import WorkerService from "../services/WorkerService";
import { Worker } from "../types/Worker";


const status = [
  "Not Started",
  "In Progress",
  "Completed"
]
const statusStyle = [
  "body-tertiary",
  "primary",
  "success"
]

const SubtaskPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<SubTask | null>(null);
  const [formDate, setFormDate] = useState<string>("");
  const [formStatus, setFormStatus] = useState<number>(0);
  const [staffs, setStaffs] = useState<Worker[]>([]);

  const [dateChanged, setDateChanged] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const SubtaskId = searchParams.get('subtaskId');
  const TaskId = searchParams.get('taskId');

  useEffect(() => {



    SubTaskService.getSubtask(SubtaskId)
      .then(response => {
        console.log(response)
        setData(response);

        setFormDate(convertUnixToDate(response.dueDate).toISOString().split('T')[0]);
        setFormStatus(response.status);


      })
      .catch(error => {
        setError(error);
      })
      .finally(() => {
        WorkerService.getStaffs(sessionStorage.getItem('divisionId'))
          .then((result: Worker[]) => {
            setStaffs(result);
          })
          .catch(error => { setError(error?.message); })
          .finally(() => {
            // staffs.forEach(x => {
            //     console.log(x)
            //     if((data?.workerIds as string[]).includes(x.id)) {
            //         setAssignedStaffs([...assignedStaffs, x]);
            //     }
            // })
            staffs.filter(x => data?.userIds.includes(x.id)).forEach(x => { console.log(x); });
            setLoading(false)

          })
      })



  }, [])

  const handleClose = () => {
    navigate('/app/task/detail?taskId=' + TaskId);
  }

  const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDate(new Date(e.target.value).toISOString().split('T')[0]);
    setDateChanged(true);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const unixTimestamp = Math.floor(new Date(formDate).getTime() / 1000);
    const payload: UpdateSubTask = {
      id: data?.id,
      title: data?.title,
      description: data?.description,
      dueDate: unixTimestamp.toString(),
      status: formStatus,
      userIds: data?.userIds
    }
    SubTaskService.updateSubtask(SubtaskId, payload)
      .then(response => {
        console.log("Update Subtask", response)
        navigate('/app/task/detail?taskId=' + TaskId)
        window.location.reload()
      })
      .catch(error => {
        setError(error?.message);
      })

  };

  const handleStatus = () => {
    const value = document.getElementById('form-status')?.getAttribute('value');
    switch (value) {
      case '0':
        setFormStatus(1);
        break;
      case '1':
        setFormStatus(2);
        break;
      case '2':
        setFormStatus(0);
        break;
    }
  }

  if (loading) { return <><p>Loading...</p></> }

  if (error) { return <><p className="text-danger">Error: {error}</p></> }

  return (
    <>

      <div className="card card-body bg-body-tertiary gap-3 px-4 py-4">
        <div className="d-flex justify-content-between align-items-center">
          <span className="hstack gap-4">
            <span className="fs-4">Subtask</span>


            <div className="vr"></div>

            <h4 className="h4 m-auto">{data?.title}</h4>
          </span>

          <span className="material-symbols-outlined"
            role="button"
            onClick={handleClose}>
            close
          </span>
        </div>

        <div className="mb-4">
          <span>{data?.description}</span>
        </div>

        <div className="container-fluid px-0">
          <div className="row">
            <div className="col-3">
              <div className={`card btn btn-outline-secondary bg-${statusStyle[formStatus]} p-3 shadow-sm d-flex align-items-start justify-content-between`}
                role="button"
                onClick={handleStatus}>
                <input type="hidden" value={formStatus} id="form-status" />
                <p>Status</p>
                <span className="h4 fw-light">{status[formStatus]}</span>
              </div>

            </div>
            <div className="col-6">
              <div className="card p-3
                        shadow-sm d-flex align-items-start
                        justify-content-between overflow-x-auto">
                <p>Issued Date</p>
                <span className="h4 fw-light text-nowrap">{convertUnixToDate(data?.issueDate as string).toLocaleString()}</span>
              </div>

            </div>

            <div className="col-3">

              <div className={`card btn btn-outline-secondary p-3 overflow-x-auto
                            shadow-sm d-flex align-items-start
                            justify-content-between
                            ${(dateChanged) ? `bg-body-tertiary` : ''}`}
                role="button"
                onClick={() => (document.getElementById('form-due') as HTMLInputElement).showPicker()}>

                <input type="date" id="form-due"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0, // Fully transparent
                    cursor: 'pointer', // Ensure it’s clickable
                  }}
                  value={formDate} onChange={handleDate} />

                <p>Due Date</p>
                <span className="h4 fw-light text-nowrap">{new Date(formDate).toLocaleDateString()}</span>

              </div>
            </div>
          </div>
        </div>



        <form className="d-flex" onSubmit={handleSubmit}>
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </form>
      </div >
    </>
  )
}

export default SubtaskPage;
