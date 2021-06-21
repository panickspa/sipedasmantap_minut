import React from 'react'
import { View, Text, FlatList, SafeAreaView, ScrollView, Dimensions, Button, RefreshControl, } from 'react-native'
import { Caption, Chip, DataTable, Portal, Title, ActivityIndicator } from 'react-native-paper'
import { default_domain, getDynData } from '../helper/api'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { renderValue, renderCapitalOnly } from '../helper/renderer'

const setTypeTable = (data) => {
    let type = '00'
    if(data.turvar.length > 1){
        type = '1'+type.substr(1,2)
    }
    if(data.turtahun.length > 1){
        type = type[0]+'1'+type[2]
    }
    if(data.vervar.length > 1){
        type = type.substr(0,2)+'1'
    }
    // console.log(type, data.turvar.length, data.turtahun.length)
    return type
}

const chipFilterStyle = {
    width: 100,
    marginRight: 10,
    justifyContent: 'center'
}

const fTabelStyle = (w) =>{
    return {
        // width: w,
        justifyContent: 'flex-start',
        paddingVertical: 10,
    }
}

const titleTableStyle = {
    textAlign: 'center'
}

function ascNumber(e,f){
    return Number(f.label) - Number(e.label)
}

function show(e){
    return e ? 'flex': 'none'
}

const DCels = (props) => {
    return props.cells.map((e, i) => <DataTable.Cell style={{
        justifyContent: 'center'
    }} key={`${e}-${i}-cell`}>
            {e}
        </DataTable.Cell>)
}

const DTitle = (props) => {
    return props.cells.map((e,i) => i == 0 ? <DataTable.Title key={`${e}-${i}-header`}
    numberOfLines={10}
    style={{
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'stretch',
        alignSelf: 'stretch'
    }}>
        {e}
    </DataTable.Title> : <DataTable.Title key={`${e}-${i}-header`}
    numberOfLines={10}
    style={{
        flexWrap: 'wrap',
        justifyContent: 'center'
    }}
    numeric={true}>
        {e}
    </DataTable.Title>)
}

const DRows = (props) => {
    
    return props.rows.map((e, i) => <DataTable.Row key={`${e}-${i}-row`}>
            <DCels cells={e}/>
        </DataTable.Row>)
}

const DTable = (props) => {
    const [lVVar, setLVVar] = React.useState(false)


    React.useEffect(()=>{
        let f = props.data.vervar.find(e => e.label.length > 20)
        f ? setLVVar(true) : setLVVar(false)
    }, [props.v])

    const transfrom = () => {
        if(props.type == '1') return props.data.vervar.map(vvar => {
            let v = props.data.turtahun.map(e => {
                let k = `${vvar.val}${props.v.var_id}${props.turvar.val}${props.tahun.val}${e.val}`
                // console.log('type 1 k : ', k)
                return props.data.datacontent[k] ? renderValue(String(props.data.datacontent[k]), props.v.unit) : '-'
            })
            // console.log('type 1 v : ', v)
            // console.log(vvar.label)
            return [vvar.label.length > 20 ? renderCapitalOnly(vvar.label) : vvar.label, ...v]
        })
        else {
            return props.data.tahun.map(tahun => {
                let v = props.data.turtahun.map(e =>{
                    let k = `${props.data.vervar[0].val}${props.v.var_id}${props.turvar.val}${tahun.val}${e.val}`
                    // console.log('type 2 k : ', k)
                    return props.data.datacontent[k] ? renderValue(String(props.data.datacontent[k]), props.v.unit) : '-'
                })
                // console.log('type 2 v : ', v)
                return [tahun.label, ...v]
            })
        }
    }

    const header = () => {
        return props.type == '1' ? [props.data.labelvervar, props.data.turvar.length > 1 ? props.turvar.label : props.v.title ] :
        ['Tahun', ...(props.data.turtahun.length > 1 ? props.data.turtahun.map(e => e.label) : [props.v.title]) ]
    }

    // React.useEffect(()=>{
    //     console.log(transfrom())
    //     console.log(header())
    // }, [])

    const showHint = ()=>{
        return props.data.vervar.find(e => e.label.length > 20)
    }

    const minWidth = (Dimensions.get('screen').width )
    const maxWidth = (Dimensions.get('screen').width*1.5 )

    return <ScrollView horizontal={true}>
        <View style={{
            minWidth: minWidth,
            maxWidth: maxWidth,
            justifyContent: 'center',
            alignSelf: 'stretch',
            alignItems: 'stretch'
        }}>
            <ScrollView>
                <View>
                    <DataTable>
                        <DataTable.Header>
                            <DTitle cells={header()} />
                        </DataTable.Header>
                        <DRows rows={transfrom()}/>
                    </DataTable>
                    <View style={{
                        display: show(lVVar),
                        marginTop: 10
                    }}>
                        { 
                            props.data.vervar.map(
                                (e,i) => <Caption key={`vervar-${e.val}-${e.label}-${i}`}> 
                                    {renderCapitalOnly(e.label)} : {e.label}
                                </Caption>)
                        }
                    </View>
                </View>
            </ScrollView>
        </View>
    </ScrollView>

}

const TabelView = (props) =>{
    const [v, setV] = React.useState({})
    const [data, setData] = React.useState([])
    const [type, setType] = React.useState('00')
    const [loaded, setLoaded] = React.useState(false)
    const [tahun, setTahun] = React.useState({})
    const [turth, setTurth] = React.useState({})
    const [turvar, setTurvar] = React.useState({})
    

    const sItem = (e,v) => {
        // console.log('select item', e,v)
        return e == v
    }

    const wScreen = Dimensions.get('window').width

    React.useEffect(()=>{
        setV(props.variable)
        setData(props.data)
        setType(setTypeTable(props.data))
        setTurvar(props.data.turvar[props.data.turvar.length-1])
        setTahun(props.data.tahun[props.data.tahun.length-1])
        setTurth(props.data.turtahun[props.data.turtahun.length-1])
    }, [v])

    React.useEffect(()=>{
        if(
            Object.keys(data).length
            && v.title 
            && tahun.label
            && turth.label
            && turvar.label
        ) setLoaded(true)
        else setLoaded(false)
    }, [data, v, turth, turvar, tahun])
    
    return (
        loaded ? (
            <View
             style={{
                flex: 1,
                padding: 10,
                alignContent: 'stretch',
                justifyContent: 'flex-start'
            }}>
                <Caption style={{
                    display: show(type[0] == '1')
                }}>Kelompok Variabel</Caption>
                <View style={{
                    display: show(type[0] == '1')
                }}>
                    <FlatList
                        contentContainerStyle={fTabelStyle(wScreen)}
                        horizontal={true}
                        scrollEnabled={true}
                        // extraData={v}
                        data={data.turvar}
                        keyExtractor={(e,i) => `th-${v.var_id}-${e.val}-${i}`}
                        renderItem={({item}) => (<Chip
                            style={{
                                justifyContent: 'center'
                            }}
                            onTouchStart={()=>{
                                setTurvar(item)
                            }}
                            selected={sItem(turvar.val, item.val)}
                        >
                            {item.label}
                        </Chip>)}
                    />
                </View>
                <Caption style={{
                    display: show(type[2] == 1)
                }}>Tahun</Caption>
                <View style={{
                    display: show(type[2] == 1)
                }}>
                    <FlatList 
                        contentContainerStyle={fTabelStyle(wScreen)}
                        horizontal={true}
                        // extraData={v}
                        data={data.tahun.sort(ascNumber)}
                        keyExtractor={(e,i) => `th-${v.var_id}-${e.val}-${i}`}
                        renderItem={({item}) => (
                            <Chip
                                onTouchStart={()=>{
                                    setTahun(item)
                                }}
                                style={chipFilterStyle}
                                selected={sItem(tahun.val, item.val)}
                            >
                                {item.label}
                            </Chip>
                        )}
                    />
                </View>
                {/* <Caption style={{
                    display: show(type[1] == '1')
                }}>Kelompok Tahun</Caption>
                <View style={{
                    display: show(type[1] == '1')
                }}>
                    <FlatList 
                        contentContainerStyle={fTabelStyle(wScreen)}
                        horizontal={true}
                        // extraData={v}
                        data={data.turtahun}
                        keyExtractor={(e,i) => `th-${v.var_id}-${e.val}-${i}`}
                        renderItem={({item}) => (
                            <Chip
                                onTouchStart={()=>{
                                    setTurth(item)
                                }}
                                style={chipFilterStyle}
                                selected={sItem(turth.val, item.val)}
                            >
                                {item.label}
                            </Chip>
                        )}
                    />
                </View> */}
                {
                    type == `111` ? 
                        <Title style={titleTableStyle}>{v.title} {turvar.label}{data.labelvervar == turth.label ? `` : ` Dalam ${turth.label}`} {turth.label} {tahun.label}</Title> :
                    type == `101` ? 
                        <Title style={titleTableStyle}>{v.title}{data.labelvervar == turth.label ? `` : ` Dalam ${turth.label}`} Tahun {tahun.label} ( {turvar.label} )</Title> :
                    type == `011` ? 
                        <Title style={titleTableStyle}>{v.title}{data.labelvervar == turth.label ? `` : ` Dalam ${turth.label}`} {turth.label} {tahun.label} </Title> :
                    type == `001` ? 
                        <Title style={titleTableStyle}>{v.title}{data.labelvervar == turth.label ? `` : ` Dalam ${turth.label}`} Tahun {tahun.label}</Title> :
                    type == `110` || type == `100` ? 
                        <Title style={titleTableStyle}>{v.title} {turvar.label} {data.vervar[0].label}</Title> : 
                        <Title style={titleTableStyle}>{v.title} {data.vervar[0].label}</Title>
                }
                {
                    type[2] == `1` ? <DTable data={data} turth={turth} v={v} tahun={tahun} turvar={turvar} type={type[2]}/>:
                    <DTable data={data} turth={turth} v={v} tahun={tahun} turvar={turvar} type={type[2]}/>
                }
            </View>) : <View>
               <Title>Tabel tidak termuat silahkan refresh kembali</Title>
            </View>
    )
}
/*         type == '11' ? 
            
        : type == '10' ? <View style={{
            padding: 10,
            flex: 1,
            alignContent: 'stretch',
            justifyContent: 'center'
        }}>
            <Caption>Kelompok Variabel</Caption>
            <View>
                <FlatList
                    contentContainerStyle={fTabelStyle(wScreen)}
                    horizontal={true}
                    scrollEnabled={true}
                    // extraData={v}
                    data={data.turvar}
                    keyExtractor={(e,i) => `th-${v.var_id}-${e.val}-${i}`}
                    renderItem={({item}) => (
                        <Chip
                            onTouchStart={()=>{
                                setTurvar(item)
                            }}
                            style={chipFilterStyle}
                            selected={sItem(turvar.val, item.val)}
                        >
                            {item.label}
                        </Chip>
                    )}
                />
            </View>
            <Caption>Tahun</Caption>
            <View>
                <FlatList
                    contentContainerStyle={fTabelStyle(wScreen)} 
                    horizontal={true}
                    // extraData={v}
                    data={data.tahun.sort(ascNumber)}
                    keyExtractor={(e,i) => `th-${v.var_id}-${e.val}-${i}`}
                    renderItem={({item}) => (
                        <Chip
                            onTouchStart={()=>{
                                setTahun(item)
                            }}
                            style={chipFilterStyle}
                            selected={sItem(tahun.val, item.val)}
                        >
                            {item.label}
                        </Chip>
                    )}
                />
            </View>
            <RowView data={data} turth={turth} v={v} tahun={tahun} turvar={turvar}/>
        </View>
        : type == '01' ? <View style={{
            padding: 10,
            flex: 1,
            alignContent: 'stretch',
            justifyContent: 'center'
        }}>
            <Caption>Kelompok Tahun</Caption>
            <View>
                <FlatList
                    contentContainerStyle={fTabelStyle(wScreen)}
                    horizontal={true}
                    // extraData={v}
                    data={data.turtahun}
                    keyExtractor={(e,i) => `th-${v.var_id}-${e.val}-${i}`}
                    renderItem={({item}) => (
                        <Chip
                            onTouchStart={()=>{
                                setTurth(item)
                            }}
                            style={chipFilterStyle}
                            selected={sItem(turth.val, item.val)}
                        >
                            {item.label}
                        </Chip>
                    )}
                />
            </View>
            <Caption>Tahun</Caption>
            <View>
                <FlatList
                    contentContainerStyle={fTabelStyle(wScreen)} 
                    horizontal={true}
                    // extraData={v}
                    data={data.tahun.sort(ascNumber)}
                    keyExtractor={(e,i) => `th-${v.var_id}-${e.val}-${i}`}
                    renderItem={({item}) => (
                        <Chip
                            onTouchStart={()=>{
                                setTahun(item)
                            }}
                            style={chipFilterStyle}
                            selected={sItem(tahun.val, item.val)}
                        >
                            {item.label}
                        </Chip>
                    )}
                />
            </View>
            <RowView data={data} turth={turth} v={v} tahun={tahun} turvar={turvar}/>
        </View> : <View style={{
            padding: 10,
            flex: 1,
            alignContent: 'stretch',
            justifyContent: 'center'
        }}>
            <Caption>Tahun</Caption>
            <View>
                <FlatList
                    contentContainerStyle={fTabelStyle(wScreen)} 
                    horizontal={true}
                    // extraData={v}
                    data={data.tahun.sort(ascNumber)}
                    keyExtractor={(e,i) => `th-${v.var_id}-${e.val}-${i}`}
                    renderItem={({item}) => (
                        <Chip
                            onTouchStart={()=>{
                                setTahun(item)
                            }}
                            style={chipFilterStyle}
                            selected={sItem(tahun.val, item.val)}
                        >
                            {item.label}
                        </Chip>
                    )}
                />
            </View>
            <RowView data={data} turth={turth} v={v} tahun={tahun} turvar={turvar}/>
            <DTable data={data} turth={turth} v={v} tahun={tahun} turvar={turvar} />
        </View> ) : <View>
            <Title>Tabel tidak termuat silahkan refresh kembali</Title>
            <Text>{tahun.val}</Text>
            <Text>{turvar.val}</Text>
            <Text>{turth.val}</Text>
            <Text>{data["data-availability"]}</Text>
            <Text>{v.var_id}</Text>
        </View>
    )
 } */


const DetaiDataView = (props) => {
    const [data, setData] = React.useState({})
    const [loaded, setLoaded] = React.useState(false)
    const [refreshing, setRefreshing] = React.useState(false)
    const [netErr, setNetErr] = React.useState(false)

    const getD = ()=>{
        // // console.log(props.varaible.var_id)
        setRefreshing(true)
        if(props.variable.var_id != 0) getDynData({
            domain: default_domain,
            var: props.variable.var_id
        }).then(resp => {
            // // console.log(resp)
            if(resp.status == "OK")
                if(resp["data-availability"] == "available"){
                    setData(resp)
                }
        }).catch(err => {
            setNetErr(true)
        }).finally(()=>{
            setRefreshing(false)
            setLoaded(true)
        })
    }

    React.useEffect(()=>{
        // // console.log(props.var)
        setData({
            status: false
        })
        getD()
    }, [props.variable])


    React.useEffect(()=>{
        // // console.log(JSON.stringify(data))
        if(data.status) {
            if(refreshing) setRefreshing(false)
            setLoaded(true)
        }
        else if (netErr){
            if(refreshing) setRefreshing(false)
            setLoaded(true)
        }
        else {
            setRefreshing(false)
            setLoaded(false)
        }
    }, [data])

    return (
        <ScrollView
            contentContainerStyle={{
                flex: 1
            }}
            refreshControl={<RefreshControl 
                onRefresh={()=>{
                    setData({
                        status: false
                    })
                    setRefreshing(true)
                    getD()
                }}
                refreshing={refreshing}
            />}
        >
            {
                loaded && !refreshing && !netErr ?
                <TabelView 
                        data={data}
                        variable={props.variable}
                    /> 
                : loaded & !refreshing && netErr ? <Title>Koneksi Terputus Silahkan Coba Kembali</Title>
                // 
                : <View style={{flex: 1, alignSelf: 'center', alignContent: 'center', justifyContent: 'center'}}>
                    {data.var_id ?  <ActivityIndicator style={{marginTop: 10}} animating={true} /> : <Title>Silahkan pilih variabel data</Title> }
                </View>
            }
        </ScrollView>
    )
}

export default DetaiDataView
