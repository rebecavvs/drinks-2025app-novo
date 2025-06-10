
import 'react-native-gesture-handler'; 
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigator from './src/navigation/AuthNavigator';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import useAuth from './src/hooks/useAuth';
import LoadingSpinner from './src/components/LoadingSpinner';
import { StatusBar, View, StyleSheet } from 'react-native';

const RootStack = createStackNavigator();

const App = () => {
  const { user, initializing } = useAuth();

  if (initializing) {
    
    return <LoadingSpinner message="Verificando autenticação..." />;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F8F8" />
      <NavigationContainer>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          {user ? (
            // Se o usuário está logado, mostra o Drawer Navigator (app principal)
            <RootStack.Screen name="App" component={DrawerNavigator} />
          ) : (
            // Se o usuário não está logado, mostra o Auth Navigator (tela de login/registro)
            <RootStack.Screen name="Auth" component={AuthNavigator} />
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;