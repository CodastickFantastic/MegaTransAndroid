import React, {useContext} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Logo from '../images/LogoOrange.png';

import {AuthContext} from '../context/AuthContext';

function DashboardView({navigation}) {
  const {userInfo} = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.background}>
      <TouchableOpacity>
        <Text>Wyloguj</Text>
      </TouchableOpacity>
      <Image source={Logo} style={styles.logo} />
      <Text>Witaj {userInfo.name}</Text>
      <View>
        <Text onPress={() => navigation.navigate('Test')}>Test</Text>
      </View>
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

export default DashboardView;
