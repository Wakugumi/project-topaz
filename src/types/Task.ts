import { Token } from "./Token";

export interface Task {
    id: string;
    title: string;
    divisionId: string;
    subTaskIds: string[];
    status: number;
    issueDate: string;
    deadline: string;
}

export interface ReturnTask {
    task: Task;
    token: Token;
}

export interface ReturnTasks {
    tasks: Task[];
    token: Token;
}

export interface CreateTask {
    title: string;
    divisionId: string;
    subTaskIds: string[];
    deadline: string;
}

export interface UpdateTask {
    title: string;
    divisionId: string;
    subTaskIds: string[];
    status: number;
    deadline: string;
}