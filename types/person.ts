export interface Person {
    adult: boolean;
    cast_id: number;
    character: string;
    credit_id: string;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    order: number;
    original_name: string;
    popularity: number;
    profile_path: string | null;
    place_of_birth: string;
    birthday: string;
    biography: string;
}

export interface MovieCast {
    adult: boolean;
    backdrop_path: string | null;
    character: string;
    credit_id: string;
    genre_ids: number[];
    id: number;
    order: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}
