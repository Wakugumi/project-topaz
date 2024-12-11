import { Token } from "./Token";

export interface SubTask {
    id: string;
    title: string;
    description: string;
    workerIds: string[];
    status: number;
    issueDate: string;
    deadline: string;
}

export interface ReturnSubTask {
    subTask: SubTask;
    token: Token;
}

export interface ReturnSubTasks {
    subTasks: SubTask[];
    token: Token;
}

export interface CreateSubTask {
    title: string;
    description: string;
    workerIds: string[];
    deadline: string;
}

export interface UpdateSubTask {
    id?: string;
    title?: string;
    description?: string;
    workerIds?: string[];
    status?: number;
    deadline?: string;
}