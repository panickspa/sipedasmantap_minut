import React from 'react';
import { FlatList, Pressable, TouchableHighlight, View } from 'react-native';
import {Text,IconButton, Headline, Caption, Button} from 'react-native-paper'
import PressRelaseList from "./PressReleaseList"

const HomeView = (props) => {

    const [Menus, setMenus] = React.useState([
        {
            menu: "Data Series",
            icon: "chart-line",
            nav: "DataSeries"
        },
        {
            menu: "Infografis",
            icon: "image-multiple",
            nav: "Infografis"
        },
        {
            menu: "Publikasi",
            icon: "book-open-page-variant",
            nav: "Publikasi"
        },
        {
            menu: "Website BPS",
            icon: "earth",
            nav: "WebBPS"
        },
        {
            menu: "Konsultasi",
            icon: "face-agent",
            nav: "Konsultasi"
        },
        {
            menu: "Indikator Strategis",
            icon: "chart-bar",
            nav: 'IndikatorStrategis'
        }
    ])
    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'column',
                flexBasis: 300,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                flex:1
            }}
        >
            <View style={{
                justifyContent:'center',
                alignItems:'center',
                flexDirection: 'row',
                width:'100%',
                padding: 4,
                marginVertical: 10,
            }}>
                <View style={{
                    justifyContent:'center',
                    alignItems:'center',
                }}>
                    <FlatList
                        data={Menus}
                        keyExtractor={item => `menu-${item.nav}`}
                        renderItem={({item}) =>{
                            return (
                                <Pressable android_ripple={true} 
                                onPress={()=>{
                                    console.log("menu clicked :",item.menu)
                                    props.menuPressed(item.nav)
                                }}>
                                    <View style={{
                                        backgroundColor: "#004D91",
                                        padding:6,
                                        width: 84,
                                        height: 84,
                                        margin: 2,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: 4
                                    }}>
                                        <IconButton 
                                            icon={item.icon}
                                            mode={"contained"}
                                            color="white"
                                            size={24}                        
                                        />
                                        <Caption style={{
                                            color:'white',
                                            alignItems:"center",
                                            width: '100%',
                                            textAlign: 'center',
                                        }}>{item.menu}</Caption>
                                    </View>
                                </Pressable>
                            )
                        }}
                        numColumns="3"
                    />
                </View>
            </View>
            <View style={{
                // alignSelf: "stretch",
                flex: 2,
                flexBasis: "auto",
                justifyContent: 'flex-start',
                flexDirection: 'column',
                backgroundColor: "#EFF8FF",
                width: "100%"
            }}>
                <Headline 
                    style={{
                        marginLeft: 10,
                        fontSize: 30,
                        fontWeight: 'bold',
                        marginVertical: 20
                }}>Berita Resmi Statistik</Headline>
                <PressRelaseList/>
            </View>
        </View>
    );
}
 
export default HomeView;
