import React, { memo } from 'react';
import { Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { IconProps } from '../types/icon';

const AppIcon = memo((props: IconProps) => {

    const { onPress, name, color } = props

    return (
        <Pressable onPress={onPress}>
            <Icon
                name={name}
                size={20}
                color={color}
            />
        </Pressable>
    )
})

export default AppIcon;