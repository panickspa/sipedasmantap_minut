import React from 'react'
import { Dimensions, Image, View } from 'react-native'
import { Portal } from 'react-native-paper'
import {defaultBPS, defaultLogo} from '../helper/api'

const SplashView = () => {
    const sIco = () => {
        return (Dimensions.get('screen').width/3)
    }

    return (
        <Portal.Host>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgb(0,41,78)',
            }}>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                    alignSelf: 'center'
                }}>
                    <View style={{
                        width: sIco(),
                        height: sIco()
                    }}>
                        <Image 
                            source={defaultLogo}
                            resizeMode="contain"
                        />
                    </View>
                </View>
                <View style={{
                    marginVertical: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                    alignSelf: 'center'
                }}>
                    <Image 
                        source={defaultBPS}
                        resizeMode="contain"
                    />
                </View>
            </View>
        </Portal.Host>
    )
}

export default SplashView