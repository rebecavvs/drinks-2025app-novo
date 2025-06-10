
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { getDrinks } from '../services/apiService';
import LoadingSpinner from '../components/LoadingSpinner';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 

const DashboardScreen = () => {
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchDrinks = async () => {
      setLoading(true);
      setError(null);
      const result = await getDrinks('Cocktail'); 
      if (result.success) {
        setDrinks(result.data);
      } else {
        setError(result.error);
      }
      setLoading(false);
    };
    fetchDrinks();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.drinkCard}
      onPress={() => navigation.navigate('Detail', { drinkId: item.idDrink })}
    >
      <Icon name="arrow-left" size={24} color="#999" style={styles.arrowIcon} />
      <Image
        source={{ uri: item.strDrinkThumb }}
        style={styles.drinkImage}
      />
      <View style={styles.drinkContent}>
        <Text style={styles.drinkTitle}>{item.strDrink}</Text>
        
        
        <Text style={styles.drinkCategory}>{item.strCategory}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return <LoadingSpinner message="Carregando Drinks" />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorMessage}>Erro ao carregar os drinks: {error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => fetchDrinks()}>
          <Text style={styles.retryButtonText}>Tentar Novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.dashboardTitle}>CARREGANDO DRINKS</Text>
      <FlatList
        data={drinks}
        keyExtractor={(item) => item.idDrink}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8', 
    paddingTop: 20,
  },
  dashboardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  listContent: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  drinkCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    elevation: 2, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDD', 
  },
  arrowIcon: {
    marginRight: 10,
  },
  drinkImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 15,
    backgroundColor: '#EEE',
  },
  drinkContent: {
    flex: 1,
  },
  drinkTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  drinkCategory: {
    fontSize: 13,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
  },
  errorMessage: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  retryButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DashboardScreen;