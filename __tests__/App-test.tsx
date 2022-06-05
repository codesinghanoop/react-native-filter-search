/**
 * @format
 */

import 'react-native';
import { getXiteContent } from '../src/network/service';
import { VideoData } from '../src/types/home';
import { filterVideoList, searchData } from '../src/util/operation';

const videoList = [{
  "id": 503026,
  "artist": "John Mayer",
  "title": "Something Like Olivia",
  "release_year": 2013,
  "genre_id": 5,
  "image_url": "https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/679a82b1e7110c16e14412f1debaa118c10078a9/images/503026/images/app/w522_h292.jpg"
},{
  "id": 503037,
  "artist": "Olly Murs",
  "title": "Army of Two",
  "release_year": 2013,
  "genre_id": 5,
  "image_url": "https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/679a82b1e7110c16e14412f1debaa118c10078a9/images/503037/images/app/w522_h292.jpg"
},]

describe("general app operations", () => {

  it('search based on single key in an object', () => {
    expect(
      searchData(videoList, 'john', ['artist'])
    ).toEqual([{
      "id": 503026,
      "artist": "John Mayer",
      "title": "Something Like Olivia",
      "release_year": 2013,
      "genre_id": 5,
      "image_url": "https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/679a82b1e7110c16e14412f1debaa118c10078a9/images/503026/images/app/w522_h292.jpg"
    }])
  })

  it('search with no results', () => {
    expect(
      searchData(videoList, '', [''])
    ).toEqual([])
  })

  it('search based on multiple key in an object', () => {
    expect(
      searchData(videoList, 'Army', ['artist', 'title'])
    ).toEqual([{
      "id": 503037,
      "artist": "Olly Murs",
      "title": "Army of Two",
      "release_year": 2013,
      "genre_id": 5,
      "image_url": "https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/679a82b1e7110c16e14412f1debaa118c10078a9/images/503037/images/app/w522_h292.jpg"
    }])
  })

  it('search based on string query', () => {
    expect(
      searchData(['john Mayer', 'coldplay'], 'john', [])
    ).toEqual(['john Mayer'])
  })

  it('filter based on genre', () => {
    expect(
      filterVideoList(videoList, [], [5])
    ).toEqual(videoList)
  })

  it('filter based on year', () => {
    expect(
      filterVideoList(videoList, [2013], [])
    ).toEqual(videoList)
  })

  it('filter based on year & genre', () => {
    expect(
      filterVideoList(videoList, [2013], [5])
    ).toEqual(videoList)
  })

  it('filter with all results i.e when filters are cleared', () => {
    expect(
      filterVideoList(videoList, [], [])
    ).toEqual(videoList)
  })

  it('filter on searched items', () => {
    const searchList = searchData(videoList, 'Army', ['artist', 'title'])
    expect(
      filterVideoList(searchList, [2013], [5])
    ).toEqual([videoList[1]])
  })

  it('search on filtered items', () => {
    const searchList = filterVideoList(videoList, [2013], [5])
    expect(
      searchData(searchList, 'Army', ['artist', 'title'])
    ).toEqual([videoList[1]])
  })

  it('api call test',async () => {
    const data = await getXiteContent();
    const genreId = videoList?.map((item) => item?.genre_id);
    expect(
      data?.data?.videos?.filter((item: VideoData) => genreId?.includes(item?.genre_id))
    ).toHaveLength(50)
  })

})