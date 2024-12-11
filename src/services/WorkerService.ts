import { Worker } from '../types/Worker';
import api from './APIService';

const WorkerService = {
  async getAllWorkers() {
    try {
      const response = await api.get<Worker[]>("/workers");
      return response.data;
    }
    catch (error) {
      console.error("WorkerService: " + error);
    }
  },

  async getWorkerById(id: string) {
    try {
      const response = await api.get<Worker>("/users?id=" + id);
      return response.data;

    } catch (error) {
      throw new Error(error);
    }
  },

  async createWorker(data: Worker) {
    try {
      api.post<Worker>('/users', data)
        .then((response) => response.data);
    } catch (error) {
      console.error("WorkerService: " + error);
    }
  },

  /**
    * get staffs
  * @param divisionId the Id of the division
  * @returns Worker[] arrays of workers
  */
  async getStaffs(divisionId: string | null) {
    return api.get<Worker[]>('/users?divisionId=' + divisionId + '&roleId=66ffb0edd22f347f278dd855')
      .then(resolve => {
        return resolve.data;
      })
      .catch(error => {
        throw new Error(error || "Unknown error @ WorkerService");
      });
  }
}

export default WorkerService;
