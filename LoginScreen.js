// src/screens/LoginScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'; 


import { app } from '../services/firebaseConfig'; 
const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation(); 

  const auth = getAuth(app); 

  // Função para lidar com o login
  const handleLogin = async () => {
    setLoading(true); 
    try {
      await signInWithEmailAndPassword(auth, email, password);
      
      navigation.replace('Dashboard'); 
    } catch (error) {
      // Exibe um alerta de erro
      Alert.alert('Erro de Login', error.message);
    } finally {
      setLoading(false); 
    }
  };

  // Função para lidar com o registro
  const handleSignUp = async () => {
    setLoading(true); 
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      
      navigation.replace('Dashboard');
    } catch (error) {
      
      Alert.alert('Erro de Registro', error.message);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SEJA BEM-VINDO</Text>

      <TextInput
        style={styles.input}
        placeholder="E-MAIL"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="SENHA"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Exemplo de feedback de erro, embora o Alert.alert já trate bem */}
      {/* <Text style={styles.errorText}>❌ Senha incorreta</Text>
      <Text style={styles.successText}>✅ Senha correta</Text> */}

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading} // Desabilita o botão enquanto carrega
      >
        {loading ? (
          <ActivityIndicator color="#fff" /> 
        ) : (
          <Text style={styles.buttonText}>LOGIN</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={handleSignUp}
        disabled={loading}
      >
        <Text style={styles.secondaryButtonText}>CRIAR CONTA</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5', 
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007bff', 
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: 'transparent', 
    borderWidth: 2,
    borderColor: '#007bff', 
  },
  secondaryButtonText: {
    color: '#007bff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  successText: {
    color: 'green',
    marginBottom: 10,
  },
});

export default LoginScreen;
