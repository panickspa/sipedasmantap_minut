import React from 'react'
import { FlatList, ScrollView, RefreshControl, View } from 'react-native'

import { ActivityIndicator, Text, List, Headline } from 'react-native-paper'
import { getIndikatorStrategis, getSubCat, getSubject } from '../helper/api'
import IndicatorList from './IndicatorList'
import { 
    getPDRBHK,
    getPDRBHB,
    getJumlahPenduduk,
    getJumlahPendudukMiskin,
    getIPM,
    getSexRatio,
    getKetenagakerjaan,
    getAll
} from '../helper/indicator'

/* 

    Category: 
    1: Sex Ratio and Jumlah Penduduk
    2: Ketenagakerjaan
    3: Jumlah Penduduk Miskin
    4: PDRB

*/

const IndicatorView = () => {
    const [loaded, setLoaded] = React.useState(false)
    const [category, setCategory] = React.useState(0)
    const [indicators, setIndicators] = React.useState([])
    const [pdrbHK, setPdrbHB] = React.useState([])
    const [pdrbHB, setPdrbHK] = React.useState([])
    const [ipm, setIPM] = React.useState([])
    const [jp, setJp] = React.useState([])
    const [jpm, setJpm] = React.useState([])
    const [kt, setKt] = React.useState([])
    const [sr, setSr] = React.useState([])
    const [errNetwork, setErrNetwork] = React.useState(false)

    // const [text, setText] = React.useState('')

    // const mergeIndicators = () => {
    //     return [...ipm, ...pdrbHB, pdrbHK, ...jp, ...jpm, ...kt, ...sr]
    // }

    const getIndicator = () => {
        setErrNetwork(false)
        getAll().then(e => {
            setIndicators(e.map((ind, i )=> {
                // console.log(i)
                return ind.sort(function(a, b) {
                        return Number(b.tahun) - Number(a.tahun)
                      })
            }))
            // setIndicators(e.flat().sort(function(a, b) {
            //     return Number(b.tahun) - Number(a.tahun)
            //   }))
        }).catch(err => {
            // console.log(err)
            setErrNetwork(true)
        })
    }

    React.useEffect(
        () => {
            getIndicator()
        }
        ,[]
    )

    React.useEffect(()=>{
        if(indicators.length > 0) setLoaded(true)
        else if(errNetwork) setLoaded(true)
        else setLoaded(false)
    }, [indicators, errNetwork])


    return (
        // <ScrollView>
        //     <Text>{JSON.stringify(indicators.map(e => [e.key]))}</Text>
        // </ScrollView>
        // <FlatList
        //     data={indicators}
        //     scrollEnabled={true}
        //     keyExtractor={(item) => item.key}
        //     renderItem={({item}) => {
        //         return (<Text>{item.key}</Text>)
        //     }}
        // />
        loaded && !errNetwork ? 
        <List.Section>
            <FlatList
                data={indicators}
                refreshControl={<RefreshControl
                    refreshing={!loaded}
                    onRefresh={() => {
                        setIndicators([])
                        getIndicator()
                    }}
                />}
                keyExtractor={(item, i) => `indicator-${i}`}
                renderItem={({item, i}) => 
                    <List.Accordion
                        title={item[0].title}
                        
                    >
                        {/* <Title style={{
                            marginHorizontal: 16,
                            textAlign: 'justify'
                        }}>{item[0].title}</Title> */}
                        <IndicatorList
                            data={item}
                        />
                    </List.Accordion>
                }
            />
        </List.Section>
        :  errNetwork ?  <ScrollView
                style={{
                    flex: 1
                }}
                refreshControl={
                    <RefreshControl
                        refreshing={!loaded}
                        onRefresh={()=>{
                            // setLoaded(false)
                            setIndicators([])
                            getIndicator()
                        }}
                    />
                }
        >
            <Headline
                    style={{
                        textAlign: 'center'
                    }}
                >Internet Tidak Ada, silahkan cek kembali koneksi anda</Headline>
            </ScrollView>  :
        <ActivityIndicator style={{marginTop: 10}} animating={true}/>
    )
}

export default IndicatorView 
