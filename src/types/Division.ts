import { Token } from "./Token";

export interface Division {
	id: string;
	name: string;
}

export interface ReturnDivision {
	division: Division;
	token: Token;
}

export interface ReturnDivisions {
	divisions: Division[];
	token: Token;
}

export interface CreateDivision {
	name: string;
}
