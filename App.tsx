import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { MovieDetails } from './screens/MovieDetails'
import SearchScreen, { width } from './screens/SearchScreen'
import { View, StyleSheet, Platform } from 'react-native'
import { Provider } from 'react-redux'
import store from './Store'

export default function App () {
  const Stack = createNativeStackNavigator()

  return (   
    <Provider store={store}>
      <View style={styles.appContainer}>
          <NavigationContainer>
            <Stack.Navigator> 
              <Stack.Screen component={SearchScreen} name='SearchScreen' options={{ headerTitle: 'Search Movies' }}/>
              <Stack.Screen component={MovieDetails}name='MovieDetails'/>
            </Stack.Navigator>  
          </NavigationContainer> 
      </View>
    </Provider>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    height: '100%',
    width: Platform.OS === 'web' ? 400 : width,
    marginHorizontal: 'auto'
  }
})
