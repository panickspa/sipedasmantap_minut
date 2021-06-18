/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { SafeAreaView, View, Dimensions, FlatList, VirtualizedList } from 'react-native';
import {DefaultTheme, Appbar, IconButton, Provider as PaperProvider, Title, TouchableRipple, Portal, Modal, Text, Chip, Caption} from 'react-native-paper'
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
import DataView from './components/DataView';


import { years, months} from './helper/date'

const IconMaterial = MaterialCommunityIcons

const Tab = createMaterialTopTabNavigator()
const Stack = createStackNavigator()

const navigationRef = React.createRef();

function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

function getCurNavName(){
  navigationRef.current?.name
}

const Home = () =>{
  return <HomeView menuPressed={(e)=>{
    // console.log(e)
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
  'Data Dinamis': {
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

const show = (e) => {return e ? 'flex' : 'none'}

const App = (props) => {
  const dim = Dimensions.get("window");
  const date = new Date()
  const y = date.getMonth() == 0 ? years[1] : years[0]
  const [yModal, setYModal] = React.useState(false)
  // const [mModal, setMModal] = React.useState(false)
  const [year, setYear] = React.useState(y)
  const [ysModal, setYsModal] = React.useState(y)

  const MainScreen = ()=>{
    // const sN = useNavigationState(state => state);
    return (
      <Tab.Navigator
        
        // labeled={false}
        initialRouteName="Data Dinamis"
        tabBarPosition='bottom'
        // tabBarIcon={({ focused}) => {      
        //   // You can return any component that you like here!
        //   // console.log(tabIconColor(route.name), route.name)
        //   return <View style={{
        //     borderRadius: 100,
        //     width: 36,
        //     justifyContent: 'center',
        //     alignItems: 'center',
        //     paddingVertical: 4,
        //     backgroundColor: tabIconColor(focused).backgroundColor
        //   }}>
        //     <IconMaterial name={nav[route.name].icon} size={20} color={tabIconColor(focused).color} focused={focused} />
        //   </View> 
          
        // }}
        
        tabBarOptions={{
          showIcon: true,
          showLabel: true,
          style:{
            backgroundColor: '#004D91',
            paddingVertical: 0,
            // padding: 0,
          },
          tabStyle:{
            // width: '100%',
            alignItems: 'center',
            justifyContent: 'center'
          },
          iconStyle: {
            height: 36
          },
          // labelStyle: {
          //   margin: 0,
          //   color: 'white',
          //   textAlign: 'center',
          //   justifyContent: 'center',
          //   alignItems: 'center',
          //   alignSelf: 'center'
          // },
          allowFontScaling: true
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
              marginLeft: -6,
              paddingVertical: 2,
              backgroundColor: tabIconColor(focused).backgroundColor
            }} focusable={true} focused={focused}>
              <IconMaterial name={nav[route.name].icon} size={24} color={tabIconColor(focused).color} focused={focused} />             
            </View> 
          },
          tabBarLabel: ({focused, color}) => {
            return <Caption style={{
              display: show(focused),
              color: color,
            }} focused={focused}>
              {route.name}
            </Caption>
          },
          Tab
        })}
        
      >
        <Tab.Screen name="Data Dinamis" component={DataView} />
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
            adjustsFontSizeToFit={true}>SI Leos Minut</Title>
            <IconButton onPress={()=>{
              navigate("About")
            }} color="white" icon="information"/>
          </View>
        </Appbar>
        <View style={{
          height: (dim.height-72)
        }}>
          <NavigationContainer
          onStateChange={(s)=>{
            // if(s.type == 'tab') 
            if(s.index == 0) if(s.routes[0]) if(s.routes[0].state) if(typeof s.routes[0].state.index != 'undefined') {
              // console.log(JSON.stringify(s))
              // setNavName(s.routes[0].state.routeNames[s.routes[0].state.index])
              // setNavIndex(s.routes[0].state.index)
            }
          }} headerMode={'none'} ref={navigationRef}>
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
