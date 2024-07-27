import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Character} from '../query/rick-and-morty';
import {DetailsScreen} from '../screens/DetailsScreen';
import {HomeScreen} from '../screens/HomeScreen';

export type MainStackParamList = {
  Home: undefined;
  Details: {character: Character};
};

const Stack = createStackNavigator<MainStackParamList>();

export function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          headerLeftLabelVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}
