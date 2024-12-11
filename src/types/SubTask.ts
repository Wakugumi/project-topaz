import { Token } from "./Token";

export interface SubTask {
  id: string;
  title: string;
  description: string;
  userIds: string[];
  taskId: string;
  status: number;
  issueDate: string;
  dueDate: string;
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
  userIds: string[];
  dueDate: string;
  taskId: string;
}

export interface UpdateSubTask {
  id?: string;
  title?: string;
  description?: string;
  userIds?: string[];
  status?: number;
  dueDate?: string;
}
