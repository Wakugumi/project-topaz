import { Token } from "./Token";

export interface Job {
  Id: string;
  Title: string;
  TaskIds: string[];
  IssueDate: string;
  DueDate: string;
}

export interface ReturnJob {
  job: Job;
  token: Token;
}

export interface ReturnJobs {
  jobs: Job[];
  token: Token;
}

export interface CreateJob {
  issuer: string;
  title: string;
  taskIds: string[];
  dueDate: string;
}

export interface UpdateJob {
  issuer: string;
  title: string;
  taskIds: string[];
  dueDate: string;
}
