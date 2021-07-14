/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, View} from 'react-native';
import {Portal} from 'react-native-paper';
import {defaultBPS, defaultLogo} from '../helper/api';

const SplashView = () => {
  //   const sIco = () => Dimensions.get('screen').width / 4
  return (
    <Portal.Host>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgb(0,41,78)',
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <Image source={defaultLogo} resizeMode="center" />
          </View>
        </View>
        <View
          style={{
            marginVertical: 10,
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            alignSelf: 'center',
            // width: (sIco()/2)
          }}>
          <Image source={defaultBPS} resizeMode="center" />
        </View>
      </View>
    </Portal.Host>
  );
};

export default SplashView;
