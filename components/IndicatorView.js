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
} from 'react-native';

import {
  ActivityIndicator,
  List,
  Headline,
  Divider,
  // Text,
  Title,
  Snackbar,
} from 'react-native-paper';

// import {getIndikatorStrategis, getSubCat, getSubject} from '../helper/api';
// import IndicatorList from './IndicatorList';

import {getAll} from '../helper/indicator';
import {LineChart} from 'react-native-chart-kit';
import {renderValue} from '../helper/renderer';
/*

    Category:
    1: Sex Ratio and Jumlah Penduduk
    2: Ketenagakerjaan
    3: Jumlah Penduduk Miskin
    4: PDRB

*/

const decimal = e => {
  return String(e).length > 6 ? 0 : 2;
};

// const LineChartWTurvar = props => {
//   let datasets = props.turvar.map((t,i,s) => {
//     return {
//       data : props.data.filter(d => d.turvar.val == t.val).map(d => d.value),
//       color: (o) => {
//         let r = Math.floor(255-((255/s.length)*(i+1)))
//         let g = Math.floor(((77/s.length)*(i+1)))
//         let b = Math.floor(220-((220/s.length)*(i+1)))
//         return `rgb(${
//           r < 0 ? 0 : r
//         },${
//           g < 0 ? 0 : g
//         },${
//           b < 0 ? 0 : b
//         })`
//       },
//     };
//   });
//   let labels = props.data
//     .filter(d => d.turvar.val == props.turvar[0].val)
//     .map(d => d.tahun);
//   // return {
//   //   label: labels,
//   //   datasets: datasets,
//   // };
//   return (
//     // {
//     //   datasets: datasets,
//     //   labels: labels.length,
//     // }
//     <LineChart
//       data={{
//         labels: labels,
//         datasets: datasets,
//         legend: props.turvar.map(e => e.label)
//       }}
//       width={Dimensions.get('window').width - 20}
//       height={Dimensions.get('window').height / 4}
//       chartConfig={{
//         backgroundGradientFrom: 'rgb(220,220,240)',
//         backgroundGradientFromOpacity: 1,
//         backgroundGradientTo: 'rgb(220,220,240)',
//         backgroundGradientToOpacity: 1,
//         color: (opacity = 1) => `rgba(0, 77, 145, ${opacity})`,
//         decimalPlaces: decimal(props.data[0].value),
//       }}
//       formatXLabel={e => {
//         let d = props.data;
//         return e == d[0].tahun || e == d[d.length - 1].tahun ? e : ' ';
//       }}
//       // verticalLabelRotation={30}
//       horizontalLabelRotation={-45}
//     />
//   );
// };

const IndicatorGraph = props => {
  if (props.item.turvar.length > 1)
    return (
      <View
        style={{
          marginLeft: 10,
          marginTop: 10,
        }}>
        {/* {<Text>{JSON.stringify(LineChartWTurvar({data:props.item.data, turvar: props.item.turvar}))}</Text>} */}
        {/* <LineChartWTurvar data={props.item.data} turvar={props.item.turvar} /> */}
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
                      // color: (opacity = 1) => `rgba(255, 255, 255, 1)`
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
                  decimalPlaces: decimal(data[0].value),
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
              // color: (opacity = 1) => `rgba(255, 255, 255, 1)`
            },
          ],
        }}
        width={Dimensions.get('window').width - 20}
        height={Dimensions.get('window').height / 4}
        // withVerticalLabels={false}
        chartConfig={{
          backgroundGradientFrom: 'rgb(220,220,240)',
          backgroundGradientFromOpacity: 1,
          backgroundGradientTo: 'rgb(220,220,240)',
          backgroundGradientToOpacity: 1,
          color: (opacity = 1) => `rgba(0, 77, 145, ${opacity})`,
          decimalPlaces: decimal(props.item.data[0].value),
        }}
        formatXLabel={e => {
          let d = props.item.data;
          return e == d[0].tahun || e == d[d.length - 1].tahun ? e : ' ';
        }}
        // verticalLabelRotation={30}
        horizontalLabelRotation={-45}
        onDataPointClick={e => {
          props.onPointClick(
            `${renderValue(String(e.value), props.item.data[0].unit)}`,
          );
          // props.onPointClick(String(e.value))
        }}
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

  React.useEffect(() => {
    if (tSnack) setSnack(true);
  }, [tSnack]);

  const getIndicator = () => {
    setErrNetwork(false);
    getAll()
      .then(e => {
        setIndicators(
          e.map(ind => {
            // console.log(ind);
            return ind;
            //     .sort(function(a, b) {
            //     return Number(b.tahun) - Number(a.tahun)
            //   })
          }),
        );
        // setIndicators(e.flat().sort(function(a, b) {
        //     return Number(b.tahun) - Number(a.tahun)
        //   }))
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
    // <ScrollView>
    //     <Text>{JSON.stringify(indicators.map(e => [e.key]))}</Text>
    // </ScrollView>
    // <FlatList
    //     data={indicators}
    //     scrollEnabled={true}
    //     keyExtractor={(item) => item.key}
    //     renderItem={({item}) => {
    //         return (<Text>{item.key}</Text>)
    //     }}
    // />
    loaded && !errNetwork ? (
      <View>
        <FlatList
          contentContainerStyle={{
            paddingBottom: 10,
          }}
          data={indicators}
          refreshControl={
            <RefreshControl
              refreshing={!loaded}
              onRefresh={() => {
                setIndicators([]);
                getIndicator();
              }}
            />
          }
          keyExtractor={(item, i) => `indicator-${i}-${item.data[0].var}`}
          renderItem={({item}) => (
            <List.Accordion
              title={`${item.data[0].title} ${
                item.data[0].unit.length ? `(${item.data[0].unit})` : ''
              }`}
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
      <ScrollView
        style={{
          flex: 1,
        }}
        refreshControl={
          <RefreshControl
            refreshing={!loaded}
            onRefresh={() => {
              // setLoaded(false)
              setIndicators([]);
              getIndicator();
            }}
          />
        }>
        <Headline
          style={{
            textAlign: 'center',
          }}>
          Internet Tidak Ada, silahkan cek kembali koneksi anda
        </Headline>
      </ScrollView>
    ) : (
      <ActivityIndicator style={{marginTop: 10}} animating={true} />
    )
  );
};

export default IndicatorView;
