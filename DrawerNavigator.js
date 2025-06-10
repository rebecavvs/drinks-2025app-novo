
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AppNavigator from './AppNavigator'; 
import ProfileScreen from '../screens/ProfileScreen';
import DrawerContent from '../components/DrawerContent';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false, 
        drawerActiveTintColor: '#007BFF',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: 'bold',
        },
        drawerStyle: {
          backgroundColor: '#FFF', 
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={AppNavigator} 
        options={{
          drawerLabel: 'Início',
          drawerIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerLabel: 'Perfil',
          drawerIcon: ({ color, size }) => (
            <Icon name="account" color={color} size={size} />
          ),
          headerShown: true, 
          headerTitle: 'Perfil',
          headerTitleAlign: 'center', 
          headerStyle: {
            backgroundColor: '#F8F8F8', 
            borderBottomWidth: 1,
            borderBottomColor: '#EEE',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
            color: '#333',
          },
        }}
      />
      {}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;