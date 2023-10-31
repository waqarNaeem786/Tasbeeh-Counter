import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Components/Homeview';
import TabNavigation from './Components/TabNavigation'; // Import your tab-based navigation component
import { RootSiblingParent } from 'react-native-root-siblings';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <RootSiblingParent>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="Zikr" component={TabNavigation} />
                </Stack.Navigator>
            </RootSiblingParent>
        </NavigationContainer>
    );
}
