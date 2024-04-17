import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { windowWidth } from '../dimensions/dimension';
import { useTheme } from '../contexts/themeContext';
import { Colors } from './styles';

import { Ionicons } from '@expo/vector-icons'


type ListItemProps = {
  photo?: any;
  title: string;
  subTitle: string;
  isFree?: 'Yes' | 'No';
  price?: string;
  onPress?: () => void;
};

export default function ListItem({
  photo,
  title,
  subTitle,
  isFree,
  price,
  onPress,
}: ListItemProps) {

    const { theme } = useTheme()
    let activeColors = Colors[theme.mode];

    return (

        <TouchableOpacity  onPress={onPress}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 15,
                    backgroundColor: activeColors.secondary,
                    padding: 10,
                    borderRadius: 10
                }}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                    <Image
                        source={photo}
                        style={{
                            width: 55,
                            height: 55,
                            borderRadius: 10,
                            marginRight: 8,
                        }}
                    />
                    <View style={{ width: windowWidth - 220 }}>
                    <Text
                        style={{
                        color: activeColors.light,
                        fontSize: 14,
                        }}
                    >
                        {subTitle}
                    </Text>
                    <Text
                        numberOfLines={1}
                        style={{
                            color: activeColors.darkLight,
                            fontSize: 14,
                            textTransform: 'uppercase',
                        }}
                    >
                        {title}
                    </Text>
                    </View>
                </View>

                <View
                    style={{
                        // flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: 10,
                        width: 100,
                        borderRadius: 10,
                    }}
                >   

                    
                    <Text
                        style={{
                            color: activeColors.brand,
                            textAlign: 'center',
                            fontSize: 14,
                        }}
                    >
                        {isFree === 'Yes' && 'Play'}
                        {isFree === 'No' && price}
                    </Text>
                    <Ionicons name='arrow-forward' size={15} color={activeColors.brand} />
                </View>
            </View>
        </TouchableOpacity>
    );
}
