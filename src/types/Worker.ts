import { Token } from "./Token";

export interface Worker {
	id: string;
	name: string;
	identityId: string;
	roleId: string;
	divisionId: string;
}

export interface ReturnWorker {
	worker: Worker;
	token: Token;
}

export interface ReturnWorkers {
	workers: Worker[];
	token: Token;
}

export interface CreateWorker {
	name: string;
	email: string;
	password: string;
	roleId: string;
	divisionId: string;
}

export interface UpdateWorker {
	name?: string;
	roleId?: string;
	divisionId?: string;
	email?: string;
	password?: string;
}

export interface Login {
	email: string;
	password: string;
}
