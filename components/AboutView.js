import React from 'react'
import { FlatList, View } from 'react-native'
import { Title, Headline } from 'react-native-paper'

export default function AboutView() {
    const data=[
        {
            label: 'Kantor',
            item: 'BPS Kabupaten Minahasa Utara'
        },
        {
            label: 'Telepon',
            item : '0431-891050',
        },
        {
            label: 'Email',
            item: 'bps7106@bps.go.id'
        },
        {
            label: 'Website',
            item: 'minutkab.bps.go.id'
        }
    ]
    return (
        <View>
            <FlatList
                data={data}
                keyExtractor={item => `about-${item.label}`}
                renderItem={({item})=>{
                    return (
                        <View style={{
                            flexDirection: 'column',
                            padding: 24
                        }}>
                            <Headline style={{
                                marginRight: 10
                            }}>{item.label}</Headline>
                            <View style={{
                                marginTop: 16,
                                padding: 8,
                                borderRadius: 8,
                                backgroundColor: '#004D91',
                            }}>
                                <Title style={{
                                    flex:1,
                                    color: 'white'
                                }}>{item.item}</Title>
                            </View>
                        </View>
                    )
                }}
            />
        </View>
    )
}