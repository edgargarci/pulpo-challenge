

export interface ItemMovie {
    poster_path: string;
    adult: boolean;
    overview: string;
    release_date: string;
    original_title: string;
    genre_ids: number[];
    id: number;
    media_type: string;
    original_language: string;
    title: string;
    backdrop_path?: any;
    popularity: number;
    vote_count: number;
    video: boolean;
    vote_average: number;
    favorite?: boolean;
}

export interface FavoriteMovieList {
    created_by: string;
    description: string;
    favorite_count: number;
    id: string;
    items: ItemMovie[];
    item_count: number;
    iso_639_1: string;
    name: string;
    poster_path: string;
}