import React, { useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WorkerService from '../services/WorkerService';
import { Worker } from '../types/Worker';

const WorkerPage: React.FC = () => {
    const navigate = useNavigate();
    const [workers, setWorkers] = useState<Worker[]>([]);
    const [error, setError] = useState(null);
    useLayoutEffect(() => {
        WorkerService.getStaffs(sessionStorage.getItem("divisionId"))
        .then(resolve => {
            setWorkers(resolve);
        })
        .catch(error => {
            setError(error);
        });
    })
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const value = e.currentTarget.getAttribute('value');
		navigate("/app/workerDetail?id=" + value);
	}
    return (
        <>
            <div className="row row-cols-3 row-cols-md-2 g-3">

            {workers.map((x, index) => (

                <div className="col" key={index}>
                    <button className="btn btn-outline-secondary card shadow-2 text-start" onClick={handleClick} value={x.id}>

                        <div className="card-header bg-transparent">
                            <span>{x.name}</span> <br />
                        </div>
                    </button>
                </div>

            ))}


            </div>
        </>
    );
};

export default WorkerPage;