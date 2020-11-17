import React from 'react';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';
import ExploreScreen from './ExploreScreen';
import ProfileScreen from './ProfileScreen';

const HomeStack = createStackNavigator();
// const DetailsStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
  <Tab.Navigator initialRouteName="Home" activeColor="#fff">
    <Tab.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarColor: '#bd9c4e',
        tabBarIcon: ({color}) => (
          <Icon name="ios-home" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarLabel: 'Mercados',
        tabBarColor: '#c8aa62',
        tabBarIcon: ({color}) => (
          <Icon name="ios-basket" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Notifications"
      component={DetailsScreen}
      options={{
        tabBarLabel: 'Conta',
        tabBarColor: '#c8aa62',
        tabBarIcon: ({color}) => (
          <FontAwesome name="user-o" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen name="Explore" component={ExploreScreen} />
  </Tab.Navigator>
);

export default MainTabScreen;

const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#c8aa62',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <HomeStack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        title: 'Home',
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#c8aa62"
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    />
  </HomeStack.Navigator>
);

// const DetailsStackScreen = ({navigation}) => (
//   <DetailsStack.Navigator
//     screenOptions={{
//       headerStyle: {
//         backgroundColor: '#c8aa62',
//       },
//       headerTintColor: '#fff',
//       headerTitleStyle: {
//         fontWeight: 'bold',
//       },
//     }}>
//     <DetailsStack.Screen
//       name="Estoque"
//       params={0}
//       component={DetailsScreen}
//       options={{
//         headerLeft: () => (
//           <Icon.Button
//             name="ios-menu"
//             size={25}
//             backgroundColor="#c8aa62"
//             onPress={() =>
//               navigation.openDrawer('Notifications', {
//                 itemId: 0,
//                 nomeMercado: 0,
//                 Rede: 0,
//                 Logo: 0,
//               })
//             }
//           />
//         ),
//       }}
//     />
//   </DetailsStack.Navigator>
// );
