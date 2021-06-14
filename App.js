/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { SafeAreaView, View, Dimensions, FlatList, VirtualizedList } from 'react-native';
import {DefaultTheme, Appbar, IconButton, Provider as PaperProvider, Title, TouchableRipple, Portal, Modal, Text, Chip} from 'react-native-paper'
import { NavigationContainer, useRoute, NavigationState, NavigationHelpers, useNavigationState } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import HomeView from "./components/HomeView";
import AboutView from './components/AboutView';
import InfografisView from './components/InfografisView';
import IndicatorView from './components/IndicatorView';
import PublikasiView from './components/PublikasiView';

import { years, months} from './helper/date'

const IconMaterial = MaterialCommunityIcons

const Tab = createMaterialTopTabNavigator()
const Stack = createStackNavigator()

const navigationRef = React.createRef();

function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

const Home = () =>{
  return <HomeView menuPressed={(e)=>{
    console.log(e)
  //  if(e == 'Infografis') gotoNav('Infografis')
  //  else gotoNav('Home')
  }}/>
}

const nav = {
  Home: {
    icon: 'home'
  },
  About: {
    icon: 'information'
  },
  'Data Series': {
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

function tabIconColor(f){
  return  f ? {
    backgroundColor: "white",
    color: '#004D91'
  } : {
    backgroundColor: "#004D91",
    color: 'white'
  }
}

const App = (props) => {
  const dim = Dimensions.get("window");
  const date = new Date()
  const y = date.getMonth() == 0 ? years[1] : years[0]
  const [yModal, setYModal] = React.useState(false)
  // const [mModal, setMModal] = React.useState(false)
  const [year, setYear] = React.useState(y)
  const [ysModal, setYsModal] = React.useState(y)
  // const [month, setMonth] = React.useState('Semua')
  // const [selMonth, setSelMonth] = React.useState(`month-${months[date.getMonth()]}-1`)
  // const [selYear, setSelYear] = React.useState(`year-${date.getFullYear()}-1`)

  // const navApp = useNavigation()
  // const gotoNav = (name) => {
  //   // console.log(props)
  //   // navApp.navigate(name)
  // }
  // React.useEffect(()=>{
  //   console.log(JSON.stringify(years))
  //   console.log(mModal, yModal)
  // },[mModal, yModal])

  // React.useEffect(()=>{
  //   // setMModal(false)
  //   setYModal(false)
  // }, [year, month])

  const MainScreen = ()=>{
    // const sN = useNavigationState(state => state);
    return (
      <Tab.Navigator
        labeled={false}
        initialRouteName="Publikasi"
        tabBarPosition='bottom'
        tabBarIcon={({ focused, color, size }) => {      
          // You can return any component that you like here!
          // console.log(tabIconColor(route.name), route.name)
          return <View style={{
            borderRadius: 100,
            width: 36,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 4,
            backgroundColor: tabIconColor(focused).backgroundColor
          }}>
            <IconMaterial name={nav[route.name].icon} size={20} color={tabIconColor(focused).color} focused={focused} />
          </View> 
          
        }}
        tabBarOptions={{
          showIcon: true,
          showLabel: false,
          style:{
            backgroundColor: '#004D91',
            paddingVertical: 0,
            // padding: 0,
            height: 52
          },
          tabStyle:{
            // width: '100%',
            alignItems: 'center',
            justifyContent: 'center'
          },
          labelStyle: {
            margin: 0
          }
        }}
        // sceneAnimationEnabled={true}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {      
            // You can return any component that you like here!
            // console.log(tabIconColor(route.name), route.name)
            return <View style={{
              borderRadius: 100,
              width: 36,
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 2,
              backgroundColor: tabIconColor(focused).backgroundColor
            }}>
              <IconMaterial name={nav[route.name].icon} size={20} color={tabIconColor(focused).color} focused={focused} />
            </View> 
            
          },
          Tab
        })}
        
      >
        <Tab.Screen name="Infografis" component={InfografisView}/>
        <Tab.Screen name="Home" component={Home}/>
        <Tab.Screen name="Publikasi" component={PublikasiView} />
        <Tab.Screen name="Indikator Strategis" component={IndicatorView}/>
      </Tab.Navigator>
    )
  }


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
            adjustsFontSizeToFit={true}>SI Damira</Title>
            <IconButton onPress={()=>{
              navigate("About")
            }} color="white" icon="information"/>
          </View>
        </Appbar>
        <View style={{
          height: (dim.height-72)
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
