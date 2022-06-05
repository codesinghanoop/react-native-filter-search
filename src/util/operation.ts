import { VideoData } from './../types/home';

export function searchData(data : Array<VideoData> | Array<string>, query : string, keys : Array<string> = []): Array<VideoData> {
    if (query === '' || query.includes('[') || query.includes(']') || query.includes('(') || query.includes(')')) {
      return [];
    }
    const regex = new RegExp(`${query.trim()}`, 'i');
    
    if (keys.length > 0 && data?.length > 0) {
      let results: Array<VideoData> = [];
      keys?.forEach(key => {
        const filteredData = data?.filter((ele : VideoData) => {
            return ele?.[key]?.toString().search(regex) >= 0
        })
        results = [...results, ...filteredData];
      });
      return results;
    }
    return data?.filter((ele : string) => ele.search(regex) >= 0);
}

export function filterVideoList(data: Array<VideoData> = [], filterYearArr: Array<Number> = [], filterGenreArr: Array<Number> = []) {
    const results: Array<VideoData> = [...data];
    
    //When filters are cleared
    if(!filterYearArr?.length && !filterGenreArr?.length) return data;

    //When only one or both filter type is selected
    if(filterYearArr?.length && !filterGenreArr?.length) {
        return results?.filter((video) => filterYearArr.includes(video?.release_year))
    } else if(!filterYearArr?.length && filterGenreArr?.length) {
        return results?.filter((video) => filterGenreArr.includes(video?.genre_id))
    } else if(filterYearArr?.length && filterGenreArr?.length) {
        return results?.filter((video) => filterYearArr.includes(video?.release_year) && filterGenreArr.includes(video?.genre_id))
    }
}