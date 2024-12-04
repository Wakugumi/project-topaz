import { Token } from "./Token";

export interface SubTask {
    Id: string;
    Title: string;
    Description: string;
    WorkerIds: string[];
    Status: number;
    IssueDate: string;
    Deadline: string;
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
    Deadline: string;
}

export interface UpdateSubTask {
    id: string;
    title: string;
    description: string;
    workerIds: string[];
    status: number;
    deadline: string;
}