import api from './APIService';
import { Task } from '../types/Task';


const TaskService = {

	/**
		* Get all tasks related to the user's division
	* @returns Array of tasks typeof ReturnTask
	*/
	async getAllTasks() {
		return api.get<Task[]>("tasks/").then((response: any) => {

			return response.data;

		}).catch((error: any) => {

			throw new Error(error || "Unknown error @ TaskService");

		});
	},

	/**
		* Returns numbers of tasks regardless statuses
	* @param divisionId - ID of user's division
	* @returns number
	*/
	async countAllTasks(divisionId: string | null) {
		return api.get<Task[]>("tasks/division?id=" + divisionId).then((resolve) => {
			return resolve.data.length;
		})
			.catch(error => {
				throw new Error(error || "Unknown error @ TaskService");
			});
	},

	/**
		* Returns array of tasks in user's division
	* @param divisionId : string - Id of user's division
	* @returns Task[] - array of Task
	*/
	async getTasks(divisionId: string | null) {
		return api.get<Task[]>("tasks/division?id=" + divisionId).then(resolve => {
			return resolve.data
		})
			.catch(error => {
				throw new Error(error || "Unknown error @ TaskService");
			});
	},

	/**
		* Return a single task
	* @param id string of the task id
	* @return Task object
	*/
	async getTask(id: string | null) {
		return api.get<Task>("tasks/id?id=" + id)
			.then(resolve => {
				return resolve.data;
			})
			.catch(error => {
				throw new Error(error || "Unknown error @ TaskService");
			});

	}

}

export default TaskService;
