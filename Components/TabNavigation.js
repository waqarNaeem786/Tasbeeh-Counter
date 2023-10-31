import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Zikrlist from './Zikrlist';
import Savezikr from './Savezikr';

const Tab = createMaterialTopTabNavigator();

export default function TabNavigation() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="ZikrList" component={Zikrlist} />
            <Tab.Screen name="YourZikr" component={Savezikr} />
        </Tab.Navigator>
    );
}
