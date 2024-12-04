import { Token } from "./Token";

export interface Task {
    Id: string;
    Title: string;
    DivisionId: string;
    SubTaskIds: string[];
    Status: number;
    IssueDate: string;
    Deadline: string;
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