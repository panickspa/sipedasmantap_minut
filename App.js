/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { SafeAreaView, Text, View, Dimensions, ScrollView } from 'react-native';
import {Appbar, IconButton, Provider as PaperProvider, Title} from 'react-native-paper'
import HomeView from "./components/HomeView";

const App = () => {
  const dim = Dimensions.get("window");
  return (
    <PaperProvider style={{height:dim.height}}>
      <SafeAreaView
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
              paddingLeft: 10
            }}
            selectable={false}
            adjustsFontSizeToFit={true}>SI Pedas Mantap! BPS Minahasa Utara</Title>
            <IconButton color="white" icon="information"/>
          </View>
        </Appbar>
        <View style={{
          height: (dim.height-124)
        }}>
          <HomeView/>
        </View>  
        <Appbar style={{
          height:50,
          backgroundColor: "#004D91",
        }}></Appbar>
      </SafeAreaView>
    </PaperProvider>
  );
};
export default App;
