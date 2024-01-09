import { ActivityIndicator, SafeAreaView, StyleSheet, ScrollView, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { PackagesProvider, usePackages } from '../../../contexts/packageContext'
import { Colors } from '../../components/styles'
import VerticalCard from '../../components/Cards/verticalCard'
import { useTheme } from '../../../contexts/themeContext'
import CustomSwitch from './CustomSwitch'

export default function ListPackages() {
  const param = useRoute().params
  const { packages, getPackages, loading } = usePackages()
  const { theme } = useTheme()
  let activeColors = Colors[theme.mode]

  // function for filter
  // const [ tab, setTab ] = useState(1)

  const onSelectSwitch = (value: number) => {
    // setTab(value)
    console.log("Tab", value)
    getPackages(param?.id, value == 1 ? "Hourly Services" : value == 2 ? "Monthly Services" : "Hourly Services")
  }

  useEffect(() => {
    getPackages(param?.id, "Hourly Services")
    console.log("Loading", loading)
    console.log("Packages", packages)
    console.log("Param", param?.id)
  }, []);
  
  return (
    <SafeAreaView style={[styles.container, {backgroundColor: activeColors.primary}]}>
      <CustomSwitch 
        selectionMode={1} 
        option1={'Hourly Packages'} 
        option2={'Monthly Packages'} 
        onSelectRun={onSelectSwitch}  
      />

      <ScrollView style={{ backgroundColor: activeColors.primary}}>
          {loading ? (
            <ActivityIndicator size="large" color={Colors.brand} />
          ) : (
            <>
              {packages?.map((item) => (
                <PackagesProvider>
                  <VerticalCard 
                      key={item?.id}
                      heading={item?.name}
                      description={item?.description}
                      icon={item?.icon ? item?.icon : item?.category?.icon} 
                  />
                </PackagesProvider>
              ))}
            </>
          )
        }
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 80,
    flex: 1,
    // backgroundColor: Colors.brand,
    // borderBottomLeftRadius:25,
    // borderBottomRightRadius: 25
  },
});