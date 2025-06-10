
import React, { useState, useEffect } from 'react';
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
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

import { app } from '../services/firebaseConfig';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState(''); 
  const [newPassword, setNewPassword] = useState(''); 
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false); 

  const navigation = useNavigation();
  const auth = getAuth(app);
  const db = getFirestore(app);

  
  const user = auth.currentUser;

 
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        setLoading(true);
        setEmail(user.email); // Define o email do Firebase Auth

        const userDocRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setName(userData.name || ''); // Pega o nome do Firestore, se existir
        }
        setLoading(false);
      } else {
        
        navigation.replace('Login');
      }
    };

    fetchUserProfile();

    
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (!user) {
        navigation.replace('Login'); 
      }
    });

    return unsubscribe; 
  }, [user, navigation, db, auth]);

  
  const handleSaveProfile = async () => {
    if (!user) return; 

    setLoading(true);
    try {
      
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, { name: name || '' }, { merge: true }); 

      
      if (newPassword) {
        await user.updatePassword(newPassword);
        Alert.alert('Sucesso', 'Senha atualizada com sucesso!');
        setNewPassword(''); 
      }

      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
      setIsEditing(false); 
    } catch (error) {
      Alert.alert('Erro ao Salvar Perfil', error.message);
    } finally {
      setLoading(false);
    }
  };

  
  const handleLogout = async () => {
    try {
      await signOut(auth);
      
      navigation.replace('Login');
    } catch (error) {
      Alert.alert('Erro ao Sair', error.message);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Carregando perfil...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Text style={styles.profileIcon}>👤</Text>
        <Text style={styles.profileName}>Nome: {name || 'Não definido'}</Text>
        <Text style={styles.profileEmail}>E-mail: {email}</Text>
      </View>

      {isEditing ? (
        <View style={styles.editContainer}>
          <TextInput
            style={styles.input}
            placeholder="Novo Nome"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Nova Senha (opcional)"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TouchableOpacity style={styles.button} onPress={handleSaveProfile}>
            <Text style={styles.buttonText}>Salvar Perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => setIsEditing(false)}
          >
            <Text style={styles.secondaryButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => setIsEditing(true)}>
            <Text style={styles.buttonText}>Editar Perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={handleLogout}
          >
            <Text style={styles.secondaryButtonText}>Sair</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 40,
  },
  profileIcon: {
    fontSize: 80,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 16,
    color: '#666',
  },
  editContainer: {
    width: '100%',
    alignItems: 'center',
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
  buttonContainer: {
    width: '100%',
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
});

export default ProfileScreen;