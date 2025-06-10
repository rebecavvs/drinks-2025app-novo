
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardScreen from '../screens/DashboardScreen';
import DetailScreen from '../screens/DetailScreen';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native'; 

const Stack = createStackNavigator();

const AppNavigator = () => {
  const navigation = useNavigation(); 

  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerShown: true,
        headerStyle: styles.headerStyle,
        headerTitleStyle: styles.headerTitleStyle,
        headerTintColor: '#333', 
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.headerLeftButton}>
            <Icon name="menu" size={26} color="#333" />
          </TouchableOpacity>
        ),
        headerTitleAlign: 'center',
      })}
    >
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ title: 'Dashboard' }} 
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={({ navigation }) => ({
          title: 'Detalhes do Drink',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerLeftButton}>
              <Icon name="arrow-left" size={26} color="#333" />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
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
  headerLeftButton: {
    marginLeft: 15,
    padding: 5,
  },
});

export default AppNavigator;