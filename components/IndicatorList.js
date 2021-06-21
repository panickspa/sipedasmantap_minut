import React from 'react'
import { FlatList, View, Dimensions, RefreshControl } from 'react-native'
import { Text, Headline, Title, List } from 'react-native-paper'

const IndicatorList = (props) => {

    const renderValue = (val, unit) => {
        let e = val.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        let rp = unit.search('Rupiah')
        return unit == 'Persen' ? `${e}%` : rp == 0 ? `Rp. ${e},-` :
        rp > 0 ? `Rp. ${e} ${unit.substr(0,rp)}` : `${e} ${unit != 'Tidak Ada Satuan' ? unit : ''}`
    }

    const boxWidth = (Dimensions.get('window').width/2)-24

    return (
        <FlatList
            data={props.data}
            // initialNumToRender={4}
            // onEndReachedThreshold={2}
            // onEndReached={()=>{
            //     props.endReached()
            // }}
            // refreshControl={<RefreshControl
            //     refreshing={!props.loaded}
            //     onRefresh={() => {
            //         props.onRefresh()
            //     }}
            // />}
            keyExtractor={(item)=>item.indicator_id}
            renderItem={({item})=>{
                return(
                    // <List.Item 
                    //     titleStyle={{
                    //         fontWeight: 'bold',
                    //         color: 'black'
                    //     }}
                    //     descriptionStyle={{
                    //         fontWeight: 'bold',
                    //         color: 'grey'
                    //     }}
                    //     title={`${item.title} ${item.tahun} ${item.turvar.val ? `( ${item.turvar.label} )` : '' }`}
                    //     description={`${renderValue(item.value, item.unit)}`}
                    // />
                    <View style={{
                        width: boxWidth,
                        minheight: (boxWidth/1.5),
                        padding: 8,
                        // backgroundColor: "#004D91",
                        margin: 8,
                    }}>
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'stretch'
                        }}>
                            <Text style={{
                                borderColor: "#004D91",
                                borderWidth: 2,
                                borderTopLeftRadius: 4,
                                borderTopRightRadius: 4,
                                fontWeight: 'bold',
                                padding: 6,
                                textAlign: 'center'
                            }}>{item.tahun} {item.turvar.val ? `( ${item.turvar.label} )` : '' } </Text>
                        </View>
                        <View style={{
                            flex: 1,
                            borderBottomLeftRadius: 4,
                            borderBottomRightRadius: 4,
                            backgroundColor: '#004D91',
                            padding: 4,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <View style={{
                                alignItems: 'center',
                                // flexWrap: 'wrap',
                                width: '100%',
                                justifyContent: 'center'
                            }}>
                                <Title style={{
                                    color: 'white',
                                    textAlign: 'center',
                                }}>{renderValue(item.value, item.unit)}</Title>
                            </View>
                        </View>
                    </View>
                )
            }}
            numColumns={2}
        />
    )
}

export default IndicatorList
