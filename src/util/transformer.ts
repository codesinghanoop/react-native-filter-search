import { XiteMusicData } from "../types/home";

export const getGenresFilterData = (data: XiteMusicData) => {
    return data?.genres
}

export const getVideoData = (data: XiteMusicData | null) => {
    return data?.videos
}