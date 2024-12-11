import api from './APIService';
import { CreateSubTask, SubTask, UpdateSubTask } from '../types/SubTask';
import { Task, UpdateTask } from '../types/Task';
import TaskService from './TaskService';

const SubTaskService = {

  /**
   * 
   * @param divisionId the id of the division
   * @returns integer the number of subtasks
   */
  async countAllSubtasks(taskId: string | null) {
    return api.get<SubTask[]>("subtasks?taskId=" + taskId).then((resolve) => {
      return resolve.data.length;
    })
      .catch(error => {
        throw new Error(error || "Unknown error @ SubTaskService");
      });
  },

  async getAllSubtasks(taskId: string | null) {
    return api.get<SubTask[]>("subtasks?taskId=" + taskId).then(resolve => {
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
    return api.get<SubTask[]>("subtasks?taskId=" + taskId)
      .then((resolve) => {

        return resolve.data;
      })
      .catch((error) => {
        throw new Error(error || "Unknown error @ SubTaskService");
      })
  },

  /**
    * Create a new subtask
    * @param data CreateSubTask, the subtask details
    * @return SubTask, the newly created subtask
    */
  async createSubTask(data: CreateSubTask, task: Task) {
    const deadline = new Date(data.dueDate);
    deadline.setHours(23);
    deadline.setMinutes(59);
    deadline.setSeconds(59);
    data.dueDate = deadline.getTime().toString();

    let subTaskId = "";
    return await api.post<SubTask>('/subtasks', data)
      .then((response) => { subTaskId = response.data.id })
      .catch((error) => {
        throw new Error(error || "Unknown error @ SubTaskService");
      });
  },

  /**
   * Create a new SubTask
   * @param data CreateSubTask, the subtask details
   * @param taskId string, the parent task id
   * @returns SubTask, the newly created subtask
   * @throws Error
   */
  async getSubtask(subtaskId: string | null) {
    return api.get<SubTask[]>('/subtasks?id=' + subtaskId)
      .then((resolve) => {
        return resolve.data[0];
      })
      .catch((error) => {
        throw new Error(error || "Unknown error @ SubTaskService");
      });
  },

  async updateSubtask(subtaskId: string | null, payload: UpdateSubTask) {
    await api.put<SubTask>('/subtasks/' + subtaskId + '?status=' + payload.status, payload)
      .then(() => { })
      .catch(error => {
        throw new Error(error || "Unknown error @ SubTaskService");
      })
    return api.put<SubTask>('/subtasks/' + subtaskId, payload)
      .then((resolve) => {
        return resolve.data;
      })
      .catch((error) => {
        throw new Error(error || "Unknown error @ SubTaskService");
      })
  },

  /**
  * Delete a subtask
  * @param subtaskId | the subtask's id to delete
  * @returns SubTask object or thrown error
  */
  async deleteSubtask(subtaskId: string | null) {
    return api.delete('/subtasks/' + subtaskId)
      .then(resolve => {
        return resolve.data
      })
      .catch(error => {
        throw new Error(error || "Unknown error @ SubTaskService");
      })
  }
}

export default SubTaskService;
