import React, {useContext, useState} from 'react';
import Logo from '../images/LogoOrange.png';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  Button,
  Alert,
} from 'react-native';

import {AuthContext} from '../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';

function LoginView() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {login, axiosError, isLoading} = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.background}>
      <Spinner visible={isLoading} />
      <Image source={Logo} style={styles.logo} />
      {axiosError && <Text style={styles.error}>{axiosError}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Login"
        keyboardType="email-address"
        placeholderTextColor={'#6D6D6D'}
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Hasło"
        placeholderTextColor={'#6D6D6D'}
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      <Button
        title="Zaloguj Do Aplikacji"
        color={'#0B8A00'}
        onPress={() => login(email, password)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#121316',
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    height: 150,
    objectFit: 'contain',
  },

  input: {
    width: '80%',
    height: 44,
    marginBottom: 10,
    borderRadius: 6,
    padding: 10,
    backgroundColor: '#212225',
    color: '#fff',
  },

  error: {
    color: 'red',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 6,
    padding: 10,
    width: '80%',
    textAlign: 'center',
    backgroundColor: '#400b0b',
  },
});

export default LoginView;
