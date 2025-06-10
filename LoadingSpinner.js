
import React from 'react';
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';

const LoadingSpinner = ({ size = 'large', color = '#0000ff', message = 'Carregando...' }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
      <Text style={styles.messageText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8', 
  },
  messageText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
});

export default LoadingSpinner;