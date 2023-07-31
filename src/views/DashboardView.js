import React, {useContext, useRef} from 'react';
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
import logoutIcon from '../images/logoutIcon.png';

import {AuthContext} from '../context/AuthContext';
import LinearGradient from 'react-native-linear-gradient';

function DashboardView({navigation}) {
  const {userInfo, logout} = useContext(AuthContext);

  const onSuccess = e => {
    console.log(e.data);
  };

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.header.logout} onPress={() => logout()}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#DD6C15', '#F41C2A']}
            style={styles.header.logout.gradient}>
            <Image
              source={logoutIcon}
              style={styles.header.logout.gradient.img}
            />
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View style={styles.main}>
        <Image source={Logo} style={styles.main.logo} />
        <TouchableOpacity
          onPress={() => navigation.navigate('Collect')}
          style={styles.main.button}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#DD6C15', '#F41C2A']}
            style={styles.header.logout.gradient}>
            <Text style={styles.main.button.text}>
              Przyjęcie Paczek Na Magazyn
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Test')}
          style={styles.main.button}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#DD6C15', '#F41C2A']}
            style={styles.header.logout.gradient}>
            <Text style={styles.main.button.text}>
              Wydanie Paczki Do Klienta
            </Text>
          </LinearGradient>
        </TouchableOpacity>
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
  },

  header: {
    width: '100%',
    height: 80,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',

    logout: {
      width: 36,
      height: 36,
      borderRadius: 50,

      gradient: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        img: {
          width: 28,
          height: 28,
        },
      },
    },
  },

  main: {
    marginTop: 80,

    logo: {
      height: 180,
      marginBottom: 20,
      width: '100%',
      objectFit: 'contain',
    },

    button: {
      width: '100%',
      paddingLeft: 20,
      paddingRight: 20,
      height: 50,
      marginBottom: 20,

      text: {
        color: '#121316',
        fontSize: 18,
      },
    },
  },
});

export default DashboardView;
