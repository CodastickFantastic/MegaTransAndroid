import React, {useContext, useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {AuthContext} from '../context/AuthContext';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

import LinearGradient from 'react-native-linear-gradient';

import packagesIcon from '../images/packagesIcon.png';
import qrIcon from '../images/qrIcon.png';
import truckIcon from '../images/truckIcon.png';
import arrowBackIcon from '../images/arrowBackIcon.png';
import bulbIcon from '../images/bulbIcon.png';
import reloadIcon from '../images/reloadIcon.png';

import axios from 'axios';

import {BASE_URL} from '../config';

function DashboardView({navigation}) {
  const {userInfo} = useContext(AuthContext);
  const [light, setLight] = useState(false);
  const [isOrder, setIsOrder] = useState(false);
  const [error, setError] = useState(false);
  const [orderData, setOrderData] = useState({
    packages: 0,
    orderId: '',
    address: '',
  });

  const getOrder = e => {
    if (isOrder === false) {
      setIsOrder(true);

      axios
        .get(`${BASE_URL}/trackOrder?id=${e.data}`)
        .then(res => {
          setOrderData({
            packages: res.data.order.packages.length,
            orderId: res.data.order.orderId,
            address: `${res.data.order.orderPostCode} ${
              res.data.order.orderCity
            }, ${res.data.order.orderStreet} ${
              res.data.order.orderStreetNumber
            } ${
              res.data.order.orderFlatNumber
                ? `/${res.data.order.orderFlatNumber}`
                : ''
            }`,
          });
        })
        .catch(err => {
          setError(err.response.data.error);
          console.log('Collect Order Error:', err);
        });
    }
  };

  const updateOrder = () => {
    console.log(userInfo.accessToken);

    if (isOrder === true) {
      axios
        .post(
          `${BASE_URL}/drivers/updateStatus/warehouse`,
          {orderId: orderData.orderId},
          {
            headers: {
              Authorization: userInfo.accessToken,
            },
          },
        )
        .then(async res => {
          if (res.data) {
            setError(false);
            setIsOrder(false);
            setOrderData({
              packages: 0,
              orderId: '',
              address: '',
            });
            console.log(res.data);
          }
          
        })
        .catch(err => {
          setError(err.response.data.error);
          console.log(err.response.data.error);
        });
    } else {
      setError('Nie zeskanowano żadnej paczki');
    }
  };

  function turnLight() {
    setLight(!light);
  }

  function resetScanner() {
    setError(false);
    setIsOrder(false);
    setOrderData({
      packages: 0,
      orderId: '',
      address: '',
    });
  }

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Dashboard')}
          style={styles.header.back}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#DD6C15', '#F41C2A']}
            style={styles.header.back.gradient}>
            <Image source={arrowBackIcon} style={styles.header.back.img} />
            <Text style={styles.header.back.text}>Powrót</Text>
          </LinearGradient>
        </TouchableOpacity>
        <View style={styles.header.buttons}>
          <TouchableOpacity
            style={styles.header.buttons.light}
            onPress={turnLight}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#DD6C15', '#F41C2A']}
              style={styles.header.back.gradient}>
              <Image
                source={bulbIcon}
                style={styles.header.buttons.light.img}
              />
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.header.buttons.reset}
            onPress={resetScanner}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#DD6C15', '#F41C2A']}
              style={styles.header.back.gradient}>
              <Image
                source={reloadIcon}
                style={styles.header.buttons.reset.img}
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.scanner}>
        <QRCodeScanner
          reactivate={true}
          onRead={getOrder}
          flashMode={light ? RNCamera.Constants.FlashMode.torch : null}
        />
      </View>
      <View style={styles.info}>
        {error && (
          <View style={styles.info.error}>
            <Text>{error}</Text>
            <Text>Odśwież skaner</Text>
          </View>
        )}

        <View style={styles.info.container}>
          <Image source={packagesIcon} style={styles.info.container.img} />
          <Text style={styles.info.container.text}>
            Ilość Paczek: {orderData.packages}
          </Text>
        </View>
        <View style={styles.info.container}>
          <Image source={qrIcon} style={styles.info.container.img} />
          <Text style={styles.info.container.text}>{orderData.orderId}</Text>
        </View>
        <View style={styles.info.container}>
          <Image source={truckIcon} style={styles.info.container.img} />
          <Text style={styles.info.container.text}>{orderData.address}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.confirm} onPress={updateOrder}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#DD6C15', '#F41C2A']}
          style={styles.confirm.gradient}>
          <Text style={styles.confirm.text}>Skanuj Kolejną Paczkę</Text>
        </LinearGradient>
      </TouchableOpacity>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    back: {
      width: 100,
      height: 36,
      borderRadius: 50,
      backgroundColor: '#212225',
      gradient: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        borderRadius: 50,
      },
      img: {
        height: 16,
        width: 16,
        marginRight: 5,
      },
      text: {
        color: '#121316',
        fontSize: 14,
      },
    },
    buttons: {
      display: 'flex',
      flexDirection: 'row',
      light: {
        width: 36,
        height: 36,
        marginRight: 15,
        img: {
          height: 26,
          width: 26,
        },
      },
      reset: {
        width: 36,
        height: 36,
        img: {
          height: 26,
          width: 26,
        },
      },
    },
  },

  scanner: {
    height: 300,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 20,
  },

  info: {
    width: '100%',
    padding: 10,

    error: {
      width: '100%',
      height: 50,
      backgroundColor: '#F41C2A',
      borderRadius: 10,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
    },

    container: {
      marginBottom: 10,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',

      img: {
        height: 43,
        width: 43,
        marginRight: 10,
      },
      text: {
        color: '#fff',
        fontSize: 16,
      },
    },
  },

  restart: {
    marginLeft: 'auto',
    marginRight: 10,
    width: 50,
    height: 50,

    img: {
      height: 36,
      width: 36,
    },
  },

  confirm: {
    width: '100%',
    height: 50,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 'auto',
    marginBottom: 20,

    gradient: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
    },

    text: {
      color: '#121316',
      fontSize: 16,
    },
  },
});

export default DashboardView;
