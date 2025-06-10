
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { signOut } from '../services/authService';
import { useNavigation } from '@react-navigation/native';

const DrawerContent = (props) => {
  const navigation = useNavigation();

  const handleSignOut = async () => {
    await signOut();
    
    navigation.reset({
      index: 0,
      routes: [{ name: 'Auth' }],
    });
  };

  return (
    <DrawerContentScrollView {...props} style={styles.container}>
      <View style={styles.drawerHeader}>
        <Text style={styles.drawerHeaderText}>MENU</Text>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Sair"
        onPress={handleSignOut}
        icon={({ color, size }) => (
          <Icon name="door-open" color={color} size={size} /> 
        )}
        labelStyle={styles.drawerItemLabel}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF', 
  },
  drawerHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE', 
    marginBottom: 10,
    alignItems: 'center', 
  },
  drawerHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  drawerItemLabel: {
    marginLeft: -15, 
    fontSize: 16,
    color: '#333',
  }
});

export default DrawerContent;