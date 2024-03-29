/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eqeqeq */
import React from 'react';
import {FlatList, View, Dimensions} from 'react-native';
import {Text, Title} from 'react-native-paper';

const IndicatorList = props => {
  const renderValue = (val, unit) => {
    let e = val.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    let rp = unit.search('Rupiah');
    return unit == 'Persen'
      ? `${e}%`
      : rp == 0
      ? `Rp. ${e},-`
      : rp > 0
      ? `Rp. ${e} ${unit.substr(0, rp)}`
      : `${e} ${unit != 'Tidak Ada Satuan' ? unit : ''}`;
  };

  const boxWidth = Dimensions.get('window').width / 2 - 24;

  return (
    <FlatList
      data={props.data}
      keyExtractor={item => item.indicator_id}
      renderItem={({item}) => {
        return (
          <View
            style={{
              width: boxWidth,
              minheight: boxWidth / 1.5,
              padding: 8,
              // backgroundColor: "#004D91",
              margin: 8,
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'stretch',
              }}>
              <Text
                style={{
                  borderColor: '#004D91',
                  borderWidth: 2,
                  borderTopLeftRadius: 4,
                  borderTopRightRadius: 4,
                  fontWeight: 'bold',
                  padding: 6,
                  textAlign: 'center',
                }}>
                {item.tahun} {item.turvar.val ? `( ${item.turvar.label} )` : ''}{' '}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                borderBottomLeftRadius: 4,
                borderBottomRightRadius: 4,
                backgroundColor: '#004D91',
                padding: 4,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  alignItems: 'center',
                  // flexWrap: 'wrap',
                  width: '100%',
                  justifyContent: 'center',
                }}>
                <Title
                  style={{
                    color: 'white',
                    textAlign: 'center',
                  }}>
                  {renderValue(item.value, item.unit)}
                </Title>
              </View>
            </View>
          </View>
        );
      }}
      numColumns={2}
    />
  );
};

export default IndicatorList;
