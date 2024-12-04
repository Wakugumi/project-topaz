import { Token } from "./Token";

export interface Role {
    Id: string;
    Name: string;
}

export interface ReturnRole {
    role: Role;
    token: Token;
}

export interface ReturnRoles {
    roles: Role[];
    token: Token;
}