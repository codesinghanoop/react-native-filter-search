import React from 'react';
import { TextInput } from "react-native";
import { XiteMusicData } from './home';

export type HeaderProps = {
    textInputPlaceholder?: string;
    textInputStyle?: React.ComponentProps<typeof TextInput>;
    setQuery?: Function;
    musicData?: XiteMusicData | null;
    applyFilter?: Function;
}