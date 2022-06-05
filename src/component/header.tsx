import React, { ReactElement, useState } from 'react';
import {
  View,
  StatusBar,
  Pressable,
  TextInput,
  StyleSheet
} from 'react-native';
import FilterModal from '../container/home/filterModal';
import { spacingValues } from '../theme/spacing';
import { HeaderProps } from '../types/header';
import AppIcon from './icon';

const Header = (props: HeaderProps): ReactElement => {

    const {
        textInputPlaceholder,
        textInputStyle = style.textInput,
        setQuery,
        musicData,
        applyFilter
    } = props

    const [showModal, setShowModal] = useState<boolean>(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    }

    return (
    <>
        <View>
            <View style={style.wrapper}>
                    {/* Text Input */}
                    <View style={style.textInputWrapper}>
                        <TextInput
                            placeholder={textInputPlaceholder}
                            allowFontScaling
                            style={textInputStyle}
                            onChangeText={(text) => setQuery(text)}
                        />
                    </View>
                <AppIcon 
                  name='filter-outline'
                  color='black'
                  onPress={toggleModal}
                />
            </View>
            <FilterModal
             visible={showModal}
             musicData={musicData}
             toggleModal={toggleModal}
             applyFilter={applyFilter}
            />
        </View>
    </>
    )
}

const style = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        elevation: 0,
        position: 'relative',
        // backgroundColor: 'green',
        paddingBottom: spacingValues.md,
        paddingHorizontal: spacingValues.lg,
        minHeight: 46,
        alignItems: 'center'
      },
      textInputWrapper: {
        flex: 1,
        justifyContent: 'center',
        marginEnd: spacingValues['2xl'],
        height: 32,
      },
      textInput: {
        backgroundColor: 'white',
        paddingStart: spacingValues.sm,
        paddingEnd: 32,
        borderRadius: 6,
        flex: 1,
        borderColor: 'gray',
        borderWidth: 0.5,
        textAlign: 'left',
      },
    pressable: {
        flex: 1
    }
})

export default Header