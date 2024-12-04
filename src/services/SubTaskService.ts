import api from './APIService';
import { SubTask } from '../types/SubTask';

const SubTaskService = {

    /**
     * 
     * @param divisionId the id of the division
     * @returns integer the number of subtasks
     */
    async countAllTasks(taskId: string | null) {
		return api.get<SubTask[]>("subtasks/task?id=" + taskId).then((resolve) => {
			return resolve.data.length;
		})
			.catch(error => {
				throw new Error(error || "Unknown error @ SubTaskService");
			});
	},

}

export default SubTaskService;