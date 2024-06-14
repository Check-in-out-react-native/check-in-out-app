import React from 'react';
import { View, Text, Button } from 'react-native';
import {styles} from './style';

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Bem-vindo!</Text>
      <Text style={styles.texto}>Gerencie suas mesas com facilidade</Text>
    </View>
  );
};

export default WelcomeScreen;