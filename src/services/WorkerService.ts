import axios from "axios";
import { Worker } from '../types/Worker';
import api from './APIService';

export default WorkerService = {
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
			const response = await.api.get<Worker>("/workers?id=" + id);
			return response.data;

		} catch (error) {
			throw new Error(error);
		}
	},

	async createWorker(data: Worker) {
		try {
			api.post<Worker>('/workers', data)
				.then((response) => response.data);
		} catch (error) {
			console.error("WorkerService: " + error);
		}
	}
}
