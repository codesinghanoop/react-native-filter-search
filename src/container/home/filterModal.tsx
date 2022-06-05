import React, { ReactElement, useState } from 'react';
import {
  Modal,
    Pressable,
    SafeAreaView,
    ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import AppIcon from '../../component/icon';
import { spacingValues } from '../../theme/spacing';
import { FilterComponent } from '../../types/home';

const year = [
    2000,
    2001,
    2002,
    2003,
    2004,
    2005,
    2006,
    2007,
    2008,
    2009,
    2010,
    2011,
    2012,
    2013,
    2014,
    2015,
    2016,
    2017,
    2018,
    2019,
    2020,
    2021,
    2022
]

const FilterModal = (props: FilterComponent): ReactElement => {
    const {
      visible,
      musicData,
      toggleModal = () => {},
      applyFilter = () => {},
    } = props;
    const [yearSelected, setYear] = useState<Array<Number>>([]);
    const [genreSelected, setGenre] = useState<Array<Number>>([]);

    const onSelectYear = (index: Number) => {
        const selector = [...yearSelected];
        if(selector?.includes(index)) {
            return setYear(selector?.filter((i) => i!= index))
        }
        selector.push(index);
        setYear([...selector]);
    }

    const onSelectGenre = (index: Number) => {
        const selector = [...genreSelected];
        if(selector?.includes(index)) {
          return setGenre(selector?.filter((i) => i!= index))
        }
        selector.push(index);
        setGenre([...selector]);
    }

    const onClear = () => {
        setYear([]);
        setGenre([]);
        applyFilter([], []);
        toggleModal();
    }

    const onApply = () => {
        applyFilter(yearSelected?.map((yearIndex: Number) => year[yearIndex]), genreSelected?.map((genreIndex) => musicData?.genres[genreIndex]?.id));
        toggleModal();
    }

    const renderListItem = (item: string | Number, index: Number, selectedValue: [Number], onPress: Function) => {
        return (
            <Pressable key={item} style={styles.row} onPress={() => onPress(index)}
            >
                <AppIcon
                  name={selectedValue?.includes(index) ? 'checkbox-outline' : 'square-outline'}
                  onPress={() => onPress(index)}
                />
                <Text>{item}</Text>
            </Pressable>
        )
    }

    const renderHeader = () => {
        return (
          <View
            key="products_filters_header"
            style={{ ...styles.headerContainer }}
          >
            <TouchableWithoutFeedback
              onPress={() => {
                toggleModal();
              }}
            >
              <View style={styles.headerBackWrapper}>
                <AppIcon 
                    name='arrow-back-outline' 
                    onPress={() => {
                        toggleModal();
                    }}
                />
              </View>
            </TouchableWithoutFeedback>
            <View style={styles.headerTitle}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Filter</Text>
            </View>
          </View>
        )
    }

    return (
        <Modal animationType="slide" transparent={true} visible={visible}>
        <SafeAreaView style={styles.container}>
            <View
            style={styles.modalContainer}
            >
            {renderHeader()}
            <ScrollView style={[styles.multiSelectContainer]}>
                <Text style={styles.filterTitle}>Select Genre</Text>
                {musicData?.genres?.map((item, index) => renderListItem(item?.name, index, genreSelected, onSelectGenre) )}
                <Text style={styles.filterTitle}>Select Year</Text>
                {year?.map((item, index) => ( renderListItem(item, index, yearSelected, onSelectYear) ))}
            </ScrollView>
            <View style={styles.filtersButtonsContainer}>
                <TouchableOpacity
                onPress={onClear}
                style={styles.clearButton}
                >
                 <Text style={{ textAlign: 'center' }}>Clear</Text>
                </TouchableOpacity>

                <TouchableOpacity
                onPress={onApply}
                style={styles.applyButton}
                >
                 <Text style={{ textAlign: 'center' }}>Apply</Text>
                </TouchableOpacity>
            </View>
            </View>
        </SafeAreaView>
      </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    filterTitle: {
        color: 'blue',
        margin: 0,
        padding: 0,
        fontSize: 16,
        marginBottom: spacingValues.sm
    },
    multiSelectContainer: {
        backgroundColor: 'white',
        flex: 1,
        elevation: 0,
        opacity: 1,
        padding: spacingValues.sm
    },
    filtersButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        paddingHorizontal: spacingValues.lg,
    },
    clearButton: { flex: 1, marginRight: spacingValues.lg, padding: spacingValues.xs, borderWidth: 0.3 },
    applyButton: { flex: 3, padding: spacingValues.xs, backgroundColor: '#fc8650' },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacingValues.xs
    },
    headerContainer: {
        width: '100%',
        margin: 0,
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacingValues.lg,
    },
    headerBackWrapper: {
        flex: 1,
    },
    headerTitle: {
        flex: 1.3,
    },
})

export default FilterModal;