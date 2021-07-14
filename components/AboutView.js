/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {FlatList, View, Linking, Platform} from 'react-native';
import {Title, Headline, TouchableRipple} from 'react-native-paper';

export default function AboutView() {
  const data = [
    {
      label: 'Kantor',
      item: 'BPS Kabupaten Minahasa Utara',
      uri: '1.4607,124.9733',
      type: 'geo',
    },
    {
      label: 'Telepon',
      item: '0431-891050',
      uri: 'tel:0431-891050',
      type: 'telp',
    },
    {
      label: 'Email',
      item: 'bps7106@bps.go.id',
      uri: 'mailto:bps7106@bps.go.id',
      type: 'email',
    },
    {
      label: 'Website',
      item: 'minutkab.bps.go.id',
      uri: 'https://minutkab.bps.go.id',
      type: 'web',
    },
  ];
  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={item => `about-${item.label}`}
        renderItem={({item}) => {
          return (
            <View
              style={{
                flexDirection: 'column',
                padding: 24,
              }}>
              <Headline
                style={{
                  marginRight: 10,
                }}>
                {item.label}
              </Headline>
              <View
                style={{
                  marginTop: 16,
                  borderRadius: 8,
                  backgroundColor: '#004D91',
                }}>
                <TouchableRipple
                  onPress={() => {
                    if (item.type == 'geo') {
                      const scheme = Platform.select({
                        ios: 'maps:0,0?q=',
                        android: 'geo:0,0?q=',
                      });
                      const latLng = item.uri;
                      const label = item.item;
                      const url = Platform.select({
                        ios: `${scheme}${label}@${latLng}`,
                        android: `${scheme}${latLng}(${label})`,
                      });
                      Linking.openURL(url);
                    } else {
                      Linking.canOpenURL(item.uri).then(s => {
                        if (s) {
                          Linking.openURL(item.uri);
                        } else {
                          // setSnack(true)
                          console.log(
                            "Don't know how to open URI: " + this.props.url,
                          );
                        }
                      });
                    }
                  }}>
                  <Title
                    style={{
                      flex: 1,
                      color: 'white',
                      padding: 8,
                    }}>
                    {item.item}
                  </Title>
                </TouchableRipple>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}
