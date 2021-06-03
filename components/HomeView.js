import React from 'react';
import { FlatList, TouchableHighlight, View } from 'react-native';
import {Text,IconButton} from 'react-native-paper'

const HomeView = () => {
    
    const [Menus, setMenus] = React.useState([
        {
            menu: "Data Series",
            icon: "chart-line",
            nav: "ds"
        },
        {
            menu: "Infografis",
            icon: "image-multiple",
            nav: "im"
        },
        {
            menu: "Publikasi",
            icon: "book-open-page-variant",
            nav: "pb"
        },
        {
            menu: "Website BPS",
            icon: "earth",
            nav: "wb"
        },
        {
            menu: "Konsultasi",
            icon: "face-agent",
            nav: "fa"
        },
        {
            menu: "Indikator Strategis",
            icon: "chart-bar",
            nav: 'is'
        }
    ])
    return (
        <View
            style={{
                padding: 4,
                display: 'flex',
                flexDirection: 'row',
                height: 300,
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 10
            }}
        >
            <View style={{
                justifyContent:'center',
                alignItems:'center'
            }}>
                <FlatList
                    data={Menus}
                    keyExtractor={item => `menu-${item.nav}`}
                    bounces={true}
                    alwaysBounceVertical={true}
                    alwaysBounceHorizontal={true}
                    renderItem={({item}) =>{
                        return (
                            // <Text>{(item.icon)}</Text>
                            <TouchableHighlight>
                                <View style={{
                                    backgroundColor: "#004D91",
                                    padding:5,
                                    width: 100,
                                    height: 100,
                                    margin: 2,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <IconButton 
                                        icon={item.icon}
                                        mode={"contained"}
                                        color="white"
                                        size={36}                        
                                    />
                                    <Text style={{
                                        color:'white',
                                        alignItems:"center",
                                        width: '100%',
                                        textAlign: 'center'
                                    }}>{item.menu}</Text>
                                </View>
                            </TouchableHighlight>
                        )
                    }}
                    numColumns="3"
                />
            </View>
        </View>
    );
}
 
export default HomeView;
