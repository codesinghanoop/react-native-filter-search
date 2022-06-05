import React, { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native'
import Header from '../../component/header';
import BaseActivityIndicator from '../../component/loading';
import { getXiteContent } from '../../network/service';
import { spacingValues } from '../../theme/spacing';
import { VideoData, XiteMusicData } from '../../types/home';
import { filterVideoList, searchData } from '../../util/operation';

const HomeScreen = () => {

    const [musicData, setMusicData] = useState<XiteMusicData | null>(null);
    const [videoList, setVideoData] = useState<Array<VideoData> | []>([]);
    const [isLoading, setLoading] = useState<Boolean>(false);
    const [errorText, setError] = useState<string>('');
    const [query, setQuery] = useState<string>('');
    const [yearFilterArr, setYearFilter] = useState<Array<Number>>([]);
    const [genreFilterArr, setGenreFilter] = useState<Array<Number>>([]);

    // Func to fetch data and show loader
    const fetchPageContent = useCallback(async () => {
        try {
            setError('');
            setLoading(true);
            const data = await getXiteContent();
            setMusicData(data?.data);
            setVideoData(data?.data?.videos);
            setLoading(false);
        } catch (error) {
            setError(error);
        }
    }, [musicData])

    useEffect(() => { 
        fetchPageContent()
    },[])

    useEffect(() => {
        //Whenever query changes this is called
        if(query) {
            //In case, if filter already applied before search
            const FilterArea = yearFilterArr?.length || genreFilterArr?.length ? filterVideoList(musicData?.videos, yearFilterArr, genreFilterArr, musicData?.videos)  : musicData?.videos
            const results: Array<VideoData> = searchData(FilterArea, query, ['artist', 'title']);
            setVideoData(results);
        }
    }, [query])

    const keyExtractorFn = useCallback((item, index) => {
        return index.toString();
    }, []);

    //Function to calculate filtered items
    const applyFilter = (yearFilterArr: Array<Number>, genreFilterArr: Array<Number>) => {
        setYearFilter(yearFilterArr);
        setGenreFilter(genreFilterArr);
        //If already search happened before filter
        const FilterArea = query ? searchData(musicData?.videos, query, ['artist', 'title'])  : musicData?.videos
        //Filtering
        const filteredList = filterVideoList(FilterArea, yearFilterArr, genreFilterArr, musicData?.videos);
        setVideoData(filteredList);
    }

    // Function to render each row of list
    const renderItem = ({ item }: { item?: VideoData, index?: Number }): ReactElement => (
        <View key={item?.id} style={styles.row}>
            <Image source={{ uri: item?.image_url }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.title} >{item?.title}</Text>
                <Text>{item?.artist}</Text>
            </View>
        </View>
    )

    return (
        <View style={styles.container}>
            {/* Header component which includes search & filter */}
            <Header 
                textInputPlaceholder='Search' 
                setQuery={setQuery}
                musicData={musicData}
                applyFilter={applyFilter}
            />
            {/* In case of error */}
            {Boolean(errorText) && <Text>{errorText}</Text>}
            {/* To render the list of videos */}
            <FlatList<VideoData>
                data={videoList}
                renderItem={renderItem}
                keyExtractor={keyExtractorFn}
                ListEmptyComponent={<Text style={styles.emptyList}>No results</Text>}
            />
            {isLoading && <BaseActivityIndicator />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    image: { 
        height: 50, 
        width: 50, 
        marginRight: spacingValues.sm
    },
    row: {
        flexDirection: 'row',
        padding: spacingValues.md,
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray'
    },
    title: {
        fontWeight: 'bold'
    },
    info: {
        width: '80%'
    },
    emptyList: { 
        textAlign: 'center' 
    }
});


export default HomeScreen