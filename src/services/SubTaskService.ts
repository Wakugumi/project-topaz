import api from './APIService';
import { SubTask } from '../types/SubTask';

const SubTaskService = {

	/**
	 * 
	 * @param divisionId the id of the division
	 * @returns integer the number of subtasks
	 */
	async countAllSubtasks(taskId: string | null) {
		return api.get<SubTask[]>("subtasks/task?id=" + taskId).then((resolve) => {
			return resolve.data.length;
		})
			.catch(error => {
				throw new Error(error || "Unknown error @ SubTaskService");
			});
	},

	async getAllSubtasks(taskId: string | null) {
		return api.get<SubTask[]>("subtasks/task?id=" + taskId).then(resolve => {
			return resolve.data;
		})
			.catch(error => { throw new Error(error || "Unknown error @ SubTaskService") })
	},

	/**
		* Get all subtasks of a task by its Id
	* @param taskId string, parent Id
	* @return SubTask[] array of subtasks
	*/
	async getSubtasks(taskId: string | null) {
		return api.get<SubTask[]>("subtasks/task?id=" + taskId)
			.then((resolve) => {
				return resolve.data;
			})
			.catch((error) => {
				throw new Error(error || "Unknown error @ SubTaskService");
			})
	},
}

export default SubTaskService;
