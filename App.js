/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { SafeAreaView, View, Dimensions } from 'react-native';
import {DefaultTheme, Appbar, IconButton, Provider as PaperProvider, Title} from 'react-native-paper'
import { NavigationContainer, useNavigation, NavigationHelpers } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import HomeView from "./components/HomeView";
import AboutView from './components/AboutView';
import InfografisView from './components/InfografisView';
import IndicatorView from './components/IndicatorView';

const IconMaterial = MaterialCommunityIcons

const Tab = createMaterialBottomTabNavigator()
const Stack = createStackNavigator()

const navigationRef = React.createRef();

function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

const App = (props) => {
  const dim = Dimensions.get("window");
  const nav = {
    Home: {
      icon: 'home'
    },
    About: {
      icon: 'information'
    },
    DataSeries: {
      icon: 'chart-line'
    },
    Publikasi: {
      icon: 'book-open-page-variant'
    },
    Infografis:{
      icon: 'image-multiple'
    },
    'Indikator Strategis':{
      icon: 'chart-bar'
    }
  }

  // const navApp = useNavigation()
  const gotoNav = (name) => {
    // console.log(props)
    // navApp.navigate(name)
  }
  const Home = () =>{
    return <HomeView menuPressed={(e)=>{
      console.log(e)
    //  if(e == 'Infografis') gotoNav('Infografis')
    //  else gotoNav('Home')
    }}/>
  }

  const MainScreen = ()=>(
    <Tab.Navigator
      
      initialRouteName="Indikator Strategis"
      showLabel={false}
      barStyle={{
        backgroundColor: '#004D91'
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {      
          // You can return any component that you like here!
          return <IconMaterial name={nav[route.name].icon} size={24} color="white" focused={focused} />;
        },
        Tab
      })}
    >
      <Tab.Screen name="Infografis" component={InfografisView}/>
      <Tab.Screen name="Home" component={Home}/>
      <Tab.Screen name="Indikator Strategis" component={IndicatorView}/>
    </Tab.Navigator>
  )


  return (
    <PaperProvider theme={DefaultTheme} style={{height:dim.height}}>
      <View
        style={{
          display:"flex",
          flexDirection: "column",
          flexGrow:0,
          // width: '100%',
        }}
      >
        <Appbar style={{
          backgroundColor: "#004D91",
          height: 50
        }}>
          <View style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}>
            <Title style={{
              borderWidth: 0,
              color: "white",
              paddingLeft: 10,
              flex: 1
            }}
            selectable={false}
            adjustsFontSizeToFit={true}>SI Pedas Mantap! BPS Minahasa Utara</Title>
            <IconButton onPress={()=>{
              navigate("About")
            }} color="white" icon="information"/>
          </View>
        </Appbar>
        <View style={{
          height: (dim.height-74)
        }}>
          <NavigationContainer headerMode={'none'} ref={navigationRef}>
            <Stack.Navigator
              headerMode="none"
            >
              <Stack.Screen name="Main" component={MainScreen}/>
              <Stack.Screen name="About" component={AboutView}/>
            </Stack.Navigator>
          </NavigationContainer>
        </View>  
        {/* <Appbar style={{
          height:50,
          backgroundColor: "#004D91",
          justifyContent: 'center',
        }}>
          <Appbar.Action icon="chart-line"/>
          <Appbar.Action icon="image-multiple"/>
          <Appbar.Action style={{
            backgroundColor: 'white'
          }} color="#004D91" icon="home"/>
          <Appbar.Action icon="book-open-page-variant"/>
          <Appbar.Action icon="chart-bar"/>
        </Appbar> */}
      </View>
    </PaperProvider>
  );
};
export default App;
