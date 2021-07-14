/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  View,
  Dimensions,
  PermissionsAndroid,
  Linking,
  Platform,
} from 'react-native';
import {
  DefaultTheme,
  Appbar,
  IconButton,
  Provider as PaperProvider,
  Title,
  Caption,
} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeView from './components/HomeView';
import AboutView from './components/AboutView';
import InfografisView from './components/InfografisView';
import IndicatorView from './components/IndicatorView';
import PublikasiView from './components/PublikasiView';
import DataView from './components/DataView';

// import {years} from './helper/date';
import SplashView from './components/SplashView';

const IconMaterial = MaterialCommunityIcons;

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const navigationRef = React.createRef();

function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

// function getCurNavName() {
//   navigationRef.current?.name;
// }

// const Home = () => {
//   return (
//     <HomeView
//       menuPressed={() => {
//         // console.log(e)
//       }}
//     />
//   );
// };

const nav = {
  Home: {
    icon: 'home',
  },
  About: {
    icon: 'information',
  },
  'Data Dinamis': {
    icon: 'chart-line',
  },
  Publikasi: {
    icon: 'book-open-page-variant',
  },
  Infografis: {
    icon: 'image-multiple',
  },
  'Indikator Strategis': {
    icon: 'chart-bar',
  },
};

function tabIconColor(f) {
  return f
    ? {
        backgroundColor: 'white',
        color: '#004D91',
      }
    : {
        backgroundColor: '#004D91',
        color: 'white',
      };
}

const show = e => {
  return e ? 'flex' : 'none';
};

const MainScreen = () => {
  return (
    <Tab.Navigator
      // initialLayout={}
      initialRouteName="Home"
      sceneContainerStyle={{
        flex: 1,
        width: Dimensions.get('window').width,
      }}
      tabBarPosition="bottom"
      tabBarOptions={{
        showIcon: true,
        showLabel: false,
        style: {
          backgroundColor: '#004D91',
          paddingVertical: 0,
        },
        tabStyle: {
          // width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        },
        iconStyle: {
          height: 36,
        },
        indicatorStyle: {
          backgroundColor: 'white',
        },
        indicatorContainerStyle: {
          backgroundColor: '#004D91',
        },
        allowFontScaling: true,
      }}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          return (
            <View
              style={{
                borderRadius: 100,
                width: 36,
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: -6,
                backgroundColor: tabIconColor(focused).backgroundColor,
              }}
              focusable={true}
              focused={focused}>
              <IconMaterial
                name={nav[route.name].icon}
                size={24}
                color={tabIconColor(focused).color}
                focused={focused}
              />
            </View>
          );
        },
        tabBarLabel: ({focused, color}) => {
          return (
            <Caption
              style={{
                display: show(focused),
                color: color,
              }}
              focused={focused}>
              {route.name}
            </Caption>
          );
        },
        Tab,
      })}>
      <Tab.Screen name="Data Dinamis" component={DataView} />
      <Tab.Screen name="Infografis" component={InfografisView} />
      <Tab.Screen name="Home" component={HomeView} />
      <Tab.Screen name="Publikasi" component={PublikasiView} />
      <Tab.Screen name="Indikator Strategis" component={IndicatorView} />
    </Tab.Navigator>
  );
};

const PERSISTENCE_KEY = 'NAVIGATION_STATE';

const App = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(async () => {
    try {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: "SI Le'os Minut Izin Akses File",
          message:
            "SI Le'os Minut butuh izin akses membaca fail untuk mengunduh gambar.",
          buttonNeutral: 'Tanyakan nanti',
          buttonNegative: 'Batalkan',
          buttonPositive: 'OK',
        },
      );
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "SI Le'os Minut Izin Akses File",
          message:
            "SI Le'os Minut butuh izin akses menulis fail untuk mengunduh gambar.",
          buttonNeutral: 'Tanyakan nanti',
          buttonNegative: 'Batalkan',
          buttonPositive: 'OK',
        },
      );
    } catch (error) {
      console.log('permission error');
    }
  }, []);

  const [initialState, setInitialState] = React.useState();
  const [isReady, setIsReady] = React.useState(false);
  const [title, setTitle] = React.useState('Home');

  React.useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();

        if (Platform.OS !== 'web' && initialUrl == null) {
          // Only restore state if there's no deep link and we're not on web
          const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
          const state = savedStateString
            ? JSON.parse(savedStateString)
            : undefined;

          if (state !== undefined) {
            // set default tab index current in home
            state.routes[state.index].state.index = 2
            setInitialState(state);
            // eslint-disable-next-line eqeqeq
            if (state.routeNames[state.index] == 'Main') {
              let i = state.routes[state.index].state.index;
              setTitle(state.routes[state.index].state.routeNames[i]);
            } else {
              navigate('Main')
              setTitle(state.routeNames[state.index]);
            }
          }
        }
      } finally {
        var x = setTimeout(()=> {
          setIsReady(true);
        }, 1000)
        return () => clearTimeout(x)
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  const Header = () => {
    return (
      <Appbar
        style={{
          backgroundColor: '#004D91',
          height: 50,
          width: Dimensions.get('window').width,
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Title
            style={{
              borderWidth: 0,
              color: 'white',
              paddingLeft: 10,
              flex: 1,
            }}
            selectable={false}
            adjustsFontSizeToFit={true}>
            SI Le'os Minut - {title}
          </Title>
          <IconButton
            onPress={() => {
              navigate('About');
            }}
            color="white"
            icon="information"
          />
        </View>
      </Appbar>
    );
  };

  if (!isReady) {
    // React.useEffect(()=>{
    //   setInitialState(null)
    // }, [])

    return (
      <PaperProvider theme={DefaultTheme}>
        <SplashView />
      </PaperProvider>
    );
  }

  return (
    <PaperProvider theme={DefaultTheme}>
      <NavigationContainer
        theme={DefaultTheme}
        headerMode={'none'}
        initialState={initialState}
        onStateChange={state => {
          return AsyncStorage.setItem(
            PERSISTENCE_KEY,
            JSON.stringify(state),
          ).then(() => {
            // eslint-disable-next-line eqeqeq
            if (state.routeNames[state.index] == 'Main') {
              let i = state.routes[state.index].state.index;
              setTitle(state.routes[state.index].state.routeNames[i]);
            } else {
              setTitle(state.routeNames[state.index]);
            }
          });
        }}
        ref={navigationRef}>
        <Stack.Navigator
          initialRouteName={'Main'}
          headerMode={'screen'}
          screenOptions={{
            header: Header,
            animationEnabled: true,
          }}>
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="About" component={AboutView} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};
export default App;
