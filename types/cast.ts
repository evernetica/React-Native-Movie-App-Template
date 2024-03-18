export interface CastMember {
    cast_id: number;
    character: string;
    credit_id: string;
    gender: number | null;
    id: number;
    name: string;
    order: number;
    profile_path: string | null;
}

export interface MovieCredits {
    cast: CastMember[];
    crew: any[];
}
