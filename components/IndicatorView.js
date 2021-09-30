/* eslint-disable no-shadow */
/* eslint-disable eqeqeq */
/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  FlatList,
  ScrollView,
  RefreshControl,
  View,
  Dimensions,
  Linking, 
  Pressable,
} from 'react-native';

import {
  ActivityIndicator,
  List,
  Headline,
  Divider,
  Text,
  Title,
  Snackbar,
  IconButton,
  Caption
} from 'react-native-paper';

// import {getIndikatorStrategis, getSubCat, getSubject} from '../helper/api';
// import IndicatorList from './IndicatorList';

import {getAll} from '../helper/indicator';
import {LineChart} from 'react-native-chart-kit';
import {renderValue} from '../helper/renderer';
import {HeaderTitle} from '@react-navigation/stack';
/*

    Category:
    1: Sex Ratio and Jumlah Penduduk
    2: Ketenagakerjaan
    3: Jumlah Penduduk Miskin
    4: PDRB

*/

const IndicatorGraph = props => {
  if (props.item.turvar.length > 1)
    return (
      <View
        style={{
          marginLeft: 10,
          marginTop: 10,
        }}>
        {props.item.turvar.map(e => {
          let data = props.item.data.filter(d => d.turvar.val == e.val);
          return (
            <View key={`${data[0].var}-${e.val}`}>
              <Divider
                style={{
                  marginVertical: 10,
                }}
              />
              <Title>{e.label}</Title>
              <Divider
                style={{
                  marginVertical: 10,
                }}
              />
              <LineChart
                data={{
                  labels: data.map(e => e.tahun),
                  datasets: [
                    {
                      data: data.map(e => Number(e.value)),
                    },
                  ],
                }}
                width={Dimensions.get('window').width - 20}
                height={Dimensions.get('window').height / 4}
                chartConfig={{
                  backgroundGradientFrom: 'rgb(220,220,240)',
                  backgroundGradientFromOpacity: 1,
                  backgroundGradientTo: 'rgb(220,220,240)',
                  backgroundGradientToOpacity: 1,
                  color: (opacity = 1) => `rgba(0, 77, 145, ${opacity})`,
                  decimalPlaces: 2,
                }}
                formatXLabel={e => {
                  let d = props.item.data;
                  return e == d[0].tahun || e == d[d.length - 1].tahun
                    ? e
                    : ' ';
                }}
                // verticalLabelRotation={30}
                horizontalLabelRotation={-45}
                onDataPointClick={e => {
                  props.onPointClick(
                    `${renderValue(String(e.value), props.item.data[0].unit)}`,
                  );
                }}
                renderDotContent={({x,y,index,indexData}) => <Text
                  style={{
                    position: 'absolute', 
                    top: y+3, 
                    left: index == 2 ? x-30 : x+10,
                  }}
                  key={`i-${index}-${indexData}-${y}-${x}`}
                >{renderValue(String(indexData), props.item.data[0].unit)}</Text>}
              />
              <Divider
                style={{
                  marginTop: 10,
                }}
              />
            </View>
          );
        })}
      </View>
    );
  return (
    <View
      style={{
        marginLeft: 10,
        marginTop: 10,
      }}>
      <Divider
        style={{
          marginVertical: 10,
        }}
      />
      <LineChart
        data={{
          labels: props.item.data.map(e => e.tahun),
          datasets: [
            {
              data: props.item.data.map(e => e.value),
            },
          ],
        }}
        width={Dimensions.get('window').width - 20}
        height={Dimensions.get('window').height / 4}
        chartConfig={{
          backgroundGradientFrom: 'rgb(220,220,240)',
          backgroundGradientFromOpacity: 1,
          backgroundGradientTo: 'rgb(220,220,240)',
          backgroundGradientToOpacity: 1,
          color: (opacity = 1) => `rgba(0, 77, 145, ${opacity})`,
          decimalPlaces: 2,
        }}
        formatXLabel={e => {
          let d = props.item.data;
          return e == d[0].tahun || e == d[d.length - 1].tahun ? e : ' ';
        }}
        horizontalLabelRotation={-45}
        onDataPointClick={e => {
          props.onPointClick(
            `${renderValue(String(e.value), props.item.data[0].unit)}`,
          );
        }}
        renderDotContent={
          ({x,y,index,indexData}) => <Text style={{
              position: 'absolute', 
              top: y+3, 
              left: index == 2 ? x-30 : x+10,
            }}
            key={`i-${index}-${indexData}-${y}-${x}`}
          >{renderValue(String(indexData), props.item.data[0].unit)}</Text>}
      />
      <Divider
        style={{
          marginVertical: 10,
        }}
      />
    </View>
  );
};

const IndicatorView = () => {
  const [loaded, setLoaded] = React.useState(false);
  const [indicators, setIndicators] = React.useState([]);
  const [errNetwork, setErrNetwork] = React.useState(false);
  const [snack, setSnack] = React.useState(false);
  const [tSnack, setTSnack] = React.useState('');
  const [Menus, setMenus] = React.useState([
    {
      menu: 'BPS Kab Minut',
      icon: 'earth',
      nav: 'WebBPS',
      uri: 'https://minutkab.bps.go.id/',
    },{
      menu: 'BPS Prov Sulut',
      icon: 'earth',
      nav: 'WebBPS',
      uri: 'https://sulut.bps.go.id/',
    },
    {
      menu: 'Konsultasi',
      icon: 'face-agent',
      nav: 'Konsultasi',
      uri: 'https://silastik.bps.go.id/v3/index.php/site/login/',
    },
    {
      menu: 'Ulas Kami',
      icon: 'comment',
      nav: 'Review',
      uri: 'http://s.bps.go.id/7106_evaluasi_SILEOSMINUT  ',
    },
  ]);

  React.useEffect(() => {
    if (tSnack) setSnack(true);
  }, [tSnack]);

  const getIndicator = () => {
    setErrNetwork(false);
    getAll()
      .then(e => {
        setIndicators(e);
      })
      .catch(() => {
        // console.log(err)
        setErrNetwork(true);
      });
  };

  React.useEffect(() => {
    getIndicator();
  }, []);

  React.useEffect(() => {
    if (indicators.length > 0) setLoaded(true);
    else if (errNetwork) setLoaded(true);
    else setLoaded(false);
  }, [indicators, errNetwork]);

  return (

    loaded && !errNetwork ? (
      <View>
        <FlatList
          ListHeaderComponent={
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'stretch',
                flexDirection: 'column',
                // width: Dimensions.get('window').width,
                padding: 4,
                marginVertical: 10,
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <FlatList
                  data={Menus}
                  keyExtractor={item => `menu-${item.nav}`}
                  renderItem={({item}) => {
                    return (
                      <Pressable
                        android_ripple={true}
                        onPress={() => {
                          Linking.canOpenURL(item.uri).then(s => {
                            if (s) {
                              Linking.openURL(item.uri);
                            } else {
                              setSnack(true);
                              console.log(
                                "Don't know how to open URI: " + this.props.url,
                              );
                            }
                          });
                        }}>
                        <View
                          style={{
                            backgroundColor: '#004D91',
                            padding: 6,
                            width: 84,
                            height: 84,
                            margin: 2,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 4,
                          }}>
                          <IconButton
                            icon={item.icon}
                            mode={'contained'}
                            color="white"
                            size={14}
                          />
                          <Caption
                            style={{
                              color: 'white',
                              alignItems: 'center',
                              width: '100%',
                              textAlign: 'center',
                            }}>
                            {item.menu}
                          </Caption>
                        </View>
                      </Pressable>
                    );
                  }}
                  numColumns="4"
                />
              </View>
              <Headline style={{
                fontSize: 30,
                fontWeight: 'bold',
                marginTop: 20,
              }}>
                Indikator Strategis
              </Headline>
            </View>
          }
          // scrollEnabled={true}
          // nestedScrollEnabled={true}
          contentContainerStyle={{
            paddingBottom: 10,
          }}
          data={indicators}
          keyExtractor={item => `indicator-accordion-${item.data[0].var}`}
          refreshControl={
            <RefreshControl
              refreshing={!loaded}
              onRefresh={() => {
                setIndicators([]);
                getIndicator();
              }}
            />
          }
          renderItem={({item}) => (
            <List.Accordion
              title={`${item.data[0].title} ${
                item.data[0].unit.length ? `(${item.data[0].unit})` : ''
              }`}
              description={`${renderValue(String(item.data[item.data.length-1].value), item.data[item.data.length-1].unit)} (${item.data[item.data.length-1].tahun})`}
              style={{
                backgroundColor: 'rgb(220,220,240)',
                marginTop: 10,
                color: '#004D91',
                borderRadius: 10,
                marginHorizontal: 10,
              }}
              titleStyle={{
                color: '#004D91',
                // fontSize: 12,
              }}
              titleNumberOfLines={3}>
              <IndicatorGraph
                item={item}
                onPointClick={e => {
                  setTSnack(e);
                  setSnack(true);
                }}
              />
            </List.Accordion>
          )}
        />
        <Snackbar
          duration={100}
          onDismiss={() => {
            setSnack(false);
          }}
          visible={snack}>
          {tSnack}
        </Snackbar>
      </View>
    ) : errNetwork ? (
      <View
        style={{
          flex: 1,
        }}
        // refreshControl={
        //   <RefreshControl
        //     refreshing={!loaded}
        //     onRefresh={() => {
        //       setIndicators([]);
        //       getIndicator();
        //     }}
        //   />
        // }
        >
        <Headline
          style={{
            textAlign: 'center',
          }}>
          Internet Tidak Ada, silahkan cek kembali koneksi anda
        </Headline>
      </View>
    ) : (
      <ActivityIndicator style={{marginTop: 10}} animating={true} />
    )
  );
};

export default IndicatorView;
