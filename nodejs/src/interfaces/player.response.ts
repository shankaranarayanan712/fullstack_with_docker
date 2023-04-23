export interface Player {
    id:          number;
    player:      string;
    height:      number;
    weight:      number;
    collage:     string;
    born:        string;
    birth_city:  string;
    birth_state: string;
    year_start:  string;
    year_end:    string;
    position:    string;
}

export interface Pagination {
    current:  number;
    perPage:  string | number;
    previous: number;
    next: number;
    err? : string
}

export interface PlayerResponse {
    data: Player,
    pagination:Pagination
}

