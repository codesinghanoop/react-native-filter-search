export type FilterData = {
    name?: string;
    list?: Array<any>;
}

export type FilterComponent = {
    visible?: boolean;
    filterData?: FilterData;
    musicData?: XiteMusicData | null;
    toggleModal?: Function;
    applyFilter?: Function;
}

export type GenreFilterData = {
    id?: number;
    name?: string;
}

export type VideoData = {
    id?: number;
    image_url?: string;
    genre_id?: number;
    release_year?: number;
    title?: string;
    artist?: string;
}

export type XiteMusicData = {
    genres?: Array<GenreFilterData>;
    videos?: Array<VideoData>;
}