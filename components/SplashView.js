/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Dimensions, Image, View} from 'react-native';
import {Portal, Headline, Subheading} from 'react-native-paper';
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
          <View style={{
            flex: 2
          }}/>
          <View
            style={{
              flex: 2,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              // backgroundColor: 'green',
              // width: 200
            }}>
            <Image source={defaultLogo} resizeMode="center" style={{
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              alignSelf: 'flex-end'
            }} />
          </View>
          <View style={{
            flex: 3,
            justifyContent: 'flex-start',
            // backgroundColor: 'blue'
          }}>
            <Headline style={{
                color: 'white',
                fontWeight: 'bold',
                textAlign: 'center'
            }}>SI LE'OS MINUT</Headline>
            <Subheading style={{
                    color: 'white',
                    textAlign: 'center'
                }}>Sistem Layanan Elektronik dan Online Statisik</Subheading>
            <Subheading style={{
                    color: 'white',
                    textAlign: 'center'
                }}>
                Badan Pusat Statistik Kabupaten Minahasa Utara
            </Subheading>
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
