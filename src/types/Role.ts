import { Token } from "./Token";

export interface Role {
	id: string;
	name: string;
}

export interface ReturnRole {
	role: Role;
	token: Token;
}

export interface ReturnRoles {
	roles: Role[];
	token: Token;
}
