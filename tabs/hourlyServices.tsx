import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Slider from '../components/slider';
import Carousel from 'react-native-snap-carousel';

import { Colors } from '../components/styles';
import { useAuth } from '../contexts/authContext';
import { useTheme } from '../contexts/themeContext';
import { hourlyPackages, sliderData } from '../data';
import { windowWidth } from '../dimensions/dimension';
import ListItem from '../components/listItem';


type ListType = {
    poster: any,
    title: string,
    subtitle: string,
    isFree: string,
    price: string,
    id: string
}

type Props = {
    items: ListType[];
};

const HourlyServices = () => {
    const { theme } = useTheme()
    let activeColors = Colors[theme.mode];
    const { userInfo, getUserInfo } = useAuth()

    const renderBanner = ({item, index}: {item: {label: string, icon: string}, index: number}): JSX.Element => {
        return <Slider label={item.label} icon={item.icon} />;
    };
    return (
    <View>
        <View style={styles.wrapper}>
            <Text style={{fontSize: 16, color: activeColors.light}}>
                Hourly Services
            </Text>
            <TouchableOpacity>
                <Text style={{color: activeColors.brand}}>See more</Text>
            </TouchableOpacity>
        </View>

        <Carousel 
            ref={(c) => {this._carousel = c;}}
            data={sliderData}
            renderItem={renderBanner}
            sliderWidth={windowWidth - 40}
            itemWidth={220}
            loop={true}
        />

        <View style={styles.wrapper}>
            <Text style={{fontSize: 16, color: activeColors.light}}>
                Packages
            </Text>
            <TouchableOpacity>
                <Text style={{color: activeColors.brand}}>See more</Text>
            </TouchableOpacity>
        </View>

        <View>
            {hourlyPackages.map((item) => (
                <ListItem
                    key={item.id}
                    photo={item.poster}
                    title={item.title}
                    subTitle={item.subtitle}
                    isFree={item.isFree}
                    price={item.price}
                    onPress={() => console.log(`Pressed ${item.title}`)}
                />
            ))}
    </View>
        

    </View>

  )
}

const styles = StyleSheet.create({
    wrapper: {
        marginVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})

export default HourlyServices