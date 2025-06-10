
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { getDrinkDetails } from '../services/apiService';
import LoadingSpinner from '../components/LoadingSpinner';

const DetailScreen = ({ route }) => {
  const { drinkId } = route.params;
  const [drink, setDrink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDrinkDetails = async () => {
      setLoading(true);
      setError(null);
      const result = await getDrinkDetails(drinkId);
      if (result.success) {
        setDrink(result.data);
      } else {
        setError(result.error);
      }
      setLoading(false);
    };
    fetchDrinkDetails();
  }, [drinkId]);

  if (loading) {
    return <LoadingSpinner message="Carregando detalhes do drink..." />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorMessage}>Erro ao carregar detalhes: {error}</Text>
      </View>
    );
  }

  if (!drink) {
    return (
      <View style={styles.noDataContainer}>
        <Text>Nenhum dado do drink encontrado.</Text>
      </View>
    );
  }

  
  const renderIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
      const ingredient = drink[`strIngredient${i}`];
      const measure = drink[`strMeasure${i}`];
      if (ingredient) {
        ingredients.push(
          <Text key={i} style={styles.ingredientText}>
            • {measure ? `${measure} ` : ''}{ingredient}
          </Text>
        );
      }
    }
    return ingredients;
  };

  return (
    <ScrollView style={styles.scrollViewContainer} contentContainerStyle={styles.contentContainer}>
      <Image
        source={{ uri: drink.strDrinkThumb }}
        style={styles.drinkImage}
      />
      <Text style={styles.title}>{drink.strDrink}</Text>
      <Text style={styles.category}>Categoria: {drink.strCategory}</Text>
      {drink.strAlcoholic && <Text style={styles.category}>Tipo: {drink.strAlcoholic}</Text>}
      {drink.strGlass && <Text style={styles.category}>Copo: {drink.strGlass}</Text>}

      <Text style={styles.sectionTitle}>Ingredientes:</Text>
      <View style={styles.ingredientsList}>
        {renderIngredients()}
      </View>

      <Text style={styles.sectionTitle}>Instruções:</Text>
      <Text style={styles.instructions}>{drink.strInstructions}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  contentContainer: {
    padding: 20,
    alignItems: 'center', 
  },
  drinkImage: {
    width: '95%', 
    height: 250, 
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: '#EEE',
    resizeMode: 'cover', 
    borderWidth: 1,
    borderColor: '#DDD',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  category: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    alignSelf: 'flex-start', 
    color: '#333',
  },
  ingredientsList: {
    width: '100%',
    marginBottom: 15,
  },
  ingredientText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  instructions: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    textAlign: 'justify',
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
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
  },
});

export default DetailScreen;