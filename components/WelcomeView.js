import React from 'react'
import { Text, View, FlatList, Image } from 'react-native'
import { Button, Headline, Portal, TouchableRipple } from 'react-native-paper'
import { defaultLogo } from '../helper/api'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const IconMaterial = MaterialCommunityIcons;

const WelcomeView = (props) => {
    const menu = [
        {
            icon: 'door-open',
            name: 'Masuk Ke Aplikasi',
            navigate: 'Main'
        },
        {
            icon: 'information',
            name: 'Tentang Aplikasi',
            navigate: 'About'
        }
    ]
    return (
        <View
            style={{
                backgroundColor: 'rgb(0,41,78)',
                height: '100%',
                flexDirection: 'column'
            }}
        >
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'red'
                    // justifyContent: 'center',
                    // alignItems: 'center',
                }}>
                <View
                    style={{
                    flex: 2,
                    backgroundColor: 'blue',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    alignSelf: 'center',
                    }}>
                    <Image source={defaultLogo} style={{}} resizeMode="center" />
                </View>
                <View style={{
                    flex: 1,
                    backgroundColor: 'green'
                }}>
                    <Headline style={{
                            color: 'white',
                            textAlign: 'center'
                        }}>Sistem Layanan</Headline>
                    <Headline style={{
                            color: 'white',
                            textAlign: 'center'
                        }}>
                        Elektronik dan Online Statisik
                    </Headline>
                    <Headline style={{
                            color: 'white',
                            textAlign: 'center'
                        }}>
                        BPS Kabupaten Minahasa Utara
                    </Headline>
                </View>
            </View>
            <View
                style={{
                    // marginVertical: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                    // alignSelf: 'center',
                    padding: 20
                    // width: (sIco()/2)
                }}>
                <FlatList
                    data={menu}
                    contentContainerStyle={{
                        flexDirection: 'row'
                    }}
                    keyExtractor={(item,i) => `${item.name}-${i}-menu-welcome`}
                    renderItem={({item})=>{
                        return <TouchableRipple borderless={true} style={{
                            marginRight: 8,
                        }}
                        onPress={()=>{
                            // console.log(item.navigate)
                            props.navigation.navigate(item.navigate)
                        }}>
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'rgb(239, 248, 255)',
                                padding: 8,
                                borderRadius: 10
                            }}>
                                <IconMaterial
                                    name={item.icon}
                                    size={24}
                                    color="black"
                                />
                                <Text style={{
                                    color: 'black',
                                    marginTop: 10
                                }}>
                                    {item.name}
                                </Text>
                            </View>
                        </TouchableRipple>
                    }}
                />
            </View>
        </View>
    )
}

export default WelcomeView
