/** @format */

export interface Player {
	id: number;
	player: string;
	height: number;
	weight: number;
	collage: string;
	born: string;
	birth_city: string;
	birth_state: string;
	year_start: string;
	year_end: string;
	position: string;
}

interface Pagination {
	current: number;
	perPage: number;
	previous: number | null;
	next: number | null;
}

interface Data {
	data: Player[];
	pagination: Pagination;
}
