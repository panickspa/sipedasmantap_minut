import React from 'react'
import { ActivityIndicator, Dimensions, FlatList, RefreshControl, ScrollView, View } from 'react-native'
import { Chip, List, Portal, Title, Modal, Dialog, Button, Snackbar } from 'react-native-paper'
import { default_domain, getSubCat, getSubject, getVar } from '../helper/api'
import DetaiDataView from './DetaiDataView'



const containerStyle = {
    backgroundColor: 'transparent', 
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    minHeight: 200,
    maxHeight: 300,
    padding: 12,
    // width: 400
};

const initCat = {subcat_id: -1, title: 'Kategori Belum Dipilih'}
const initSub = {sub_id: 0, title:'Subjek Belum Dipilih'}
const initVar = {var_id:0, title: 'Variabel Belum Dipilih'}

const showSnackBar = (p) => p.item == p.target

const DataView = () => {

    const [category, setCategory] = React.useState({subcat_id: -1, title: 'Kategori Belum Dipilih'})
    const [categories, setCategories] = React.useState([])
    const [catModal, setCatModal] = React.useState(false)
    const [curCatPage, setCurCatPage] = React.useState(0)
    const [curCatPages, setCurCatPages] = React.useState(0)
    const [catLoaded, setCatLoaded] = React.useState(false)
    const [catNettErr, setCatNetErr] = React.useState(false)
    const [subject, setSubject] = React.useState({sub_id: 0, title:'Subjek Belum Dipilih'})
    const [subjects, setSubjects] = React.useState([])
    const [subModal, setSubModal] = React.useState(false)
    const [curSubPage, setCurSubPage] = React.useState(0)
    const [curSubPages, setCurSubPages] = React.useState(0)
    const [subsLoaded, setSubsLoaded] = React.useState(false)
    const [subsNetError, setSubsNetErr] = React.useState(false)
    const [varia, setVaria] = React.useState({var_id:0, title: 'Variabel Belum Dipilih'})
    const [vars, setVars] = React.useState([])
    const [vModal, setVModal] = React.useState(false)
    const [varsLoaded, setVarsLoaded] = React.useState(false)
    const [varsNettErr, setVarsNettErr] = React.useState(false)
    const [curVarPage, setCurVarPage] = React.useState(0)
    const [curVarPages, setCurVarPages] = React.useState(0)
    const [filter, setFilter] = React.useState(false)
    const [snackC, setSnackC] = React.useState(false)
    const [snackS, setSnackS] = React.useState(false)
    const [snackV, setSnackV] = React.useState(false)

    function s(s, v){
        return v == s
    }

    function catDisabled(){
        return categories.length == 0
    }

    function subDisabled(){
        return category.subcat_id == -1
    }

    function varDisabled(){
        return subject.sub_id == 0
    }

    const getCat = () => {
        setCategories([])
        setCatNetErr(false)
        getSubCat({
            domain: default_domain,
        }).then(resp =>{
            // console.log(resp)
            if(resp.status == "OK")
                if(resp["data-availability"] == "available"){
                    setCategories(resp.data[1])
                    setCurCatPage(resp.data[0].page)
                    setCurCatPages(resp.data[0].pages)
                }
        }).catch(err => {
            console.log('get cat err')
            setCatNetErr(true)
        }).finally(()=>{
            setCatLoaded(true)
        })
    }

    const getSub = () => {
        setSubjects([])
        setSubsNetErr(false)
        getSubject({
            domain: default_domain,
            subcat: category.subcat_id
        }).then(resp => {
            // console.log(resp)
            if(resp.status == "OK")
                if(resp["data-availability"] == "available"){
                    setSubjects(resp.data[1])
                    setCurSubPage(resp.data[0].page)
                    setCurSubPages(resp.data[0].pages)
                }
        }).catch(err => {
            console.log('get sub err')
            setSubsNetErr(true)
        }).finally(()=>{
            setSubsLoaded(true)
        })
    }

    const getVars = () => {
        setVars([])
        setVarsNettErr(false)
        getVar({
            domain: default_domain,
            subject: subject.sub_id
        }).then(resp => {
            // console.log(resp)
            if(resp.status == "OK")
                if(resp["data-availability"] == "available"){
                    setVars(resp.data[1])
                    setCurVarPage(resp.data[0].page)
                    setCurVarPages(resp.data[0].pages)
                }
        }).catch(err => {
            console.log('get vars err')
            setCatNetErr(true)
        }).finally(()=>{
            setVarsLoaded(true)
        })
    }

    const nextPage = (e) => {
        if(e == 0){
            let next = curCatPage+1
            if(next > curCatPages+1){
                getSubCat({
                    domain: default_domain,
                    lang: 'ind',
                    page: next
                }).then(resp => {
                    if(resp.status == "OK")
                        if(resp["data-availability"] == "available"){
                            setCategories([...categories, ...resp.data[1]])
                        }
                }).catch(err => {
                    console.log('get next cat err')
                    setSnackC(true)
                })
            }
        }
        else if(e == 1){
            let next = curSubPage+1
            if(next > curSubPages+1){
                if(category.subcat_id > -1) getSubject({
                    domain: default_domain,
                    lang: 'ind',
                    page: next,
                    subcat: category.subcat_id
                }).then(resp => {
                    if(resp.status == "OK")
                        if(resp["data-availability"] == "available"){
                            setCategories([...subjects, ...resp.data[1]])
                        }
                }).catch(err => {
                    console.log('get next sub err')
                    setSnackS(true)
                })
            }
        }else{
            let next = curVarPage+1
            if(next > curVarPages+1){
                if(subject.sub_id > 0) getVar({
                    domain: default_domain,
                    lang: 'ind',
                    page: next,
                    subject: subject.sub_id
                }).then(resp => {
                    if(resp.status == "OK")
                        if(resp["data-availability"] == "available"){
                            setCategories([...subjects, ...resp.data[1]])
                        }
                }).catch(err => {
                    console.log('get next var err')
                    setSnackV(true)
                })
            }
        }
    }

    React.useEffect(()=>{
        getCat()
        // console.log([catDisabled(), subDisabled(), varDisabled()])
    }, [])

    React.useEffect(()=>{
        if(category.subcat_id > -1) getSub()
        // console.log([catDisabled(), subDisabled(), varDisabled()])
    },[category])


    React.useEffect(()=>{
        if(subject.sub_id > 0) getVars()
        // console.log([catDisabled(), subDisabled(), varDisabled()])
    }, [subject])

    return (
        <View
            nestedScrollEnabled={true}
            contentContainerStyle={{
                flex:1
            }}
            style={{
                flex:1,
                justifyContent:'center',
                alignItems: 'center'
            }}
        >
            <View style={{
                flexDirection:'row', 
                justifyContent:'center', 
                alignItems: 'center', 
                paddingHorizontal: 10,
                width: Dimensions.get('window').width}}>
                <View style={{flex:1}}>
                    <List.Accordion
                        expanded={filter}
                        title={`Variabel : ${varia.title}`}
                        onPress={()=>{
                            let f = !filter
                            setFilter(f)
                        }}
                        style={{
                            backgroundColor: 'rgb(220,220,240)',
                            marginTop: 10,
                            color: '#004D91',
                            borderRadius: 10,
                        }}
                        titleStyle={{
                            color: '#004D91'
                        }}    
                    >
                        <List.Item title="Kategori" description={category.title}
                            titleStyle={{
                                color: 'white'
                            }}
                            style={{
                                backgroundColor: '#004D91',
                                paddingRight: 10,
                                marginVertical: 8,
                                borderRadius: 10,
                            }}
                            descriptionStyle={{
                                color: 'rgb(200,200,200)'
                            }}
                            onPress={()=>{
                                setCatModal(true)
                            }}
                            disabled={catDisabled()}/>
                        <List.Item title="Subjek" description={subject.title}
                            titleStyle={{
                                color: 'white'
                            }}
                            style={{
                                borderRadius: 10,
                                backgroundColor: '#004D91',
                                paddingRight: 10,
                                marginBottom: 8
                            }}
                            descriptionStyle={{
                                color: `rgb(200,200,200)`
                            }}
                            onPress={()=>{
                                setSubModal(true)
                            }}
                            disabled={subDisabled()}/>
                        <List.Item title="Variabel" description={varia.title}
                            titleStyle={{
                                color: 'white'
                            }}
                            style={{
                                backgroundColor: '#004D91',
                                paddingRight: 10,
                                borderRadius: 10,
                            }}
                            descriptionStyle={{
                                color: `rgb(200,200,200)`
                            }}
                            onPress={()=>{
                                setVModal(true)
                            }}
                            disabled={varDisabled()}/>
                    </List.Accordion>
                </View>
                <View style={{
                    alignSelf: 'flex-start',
                    marginTop: 16,
                    marginLeft: 8
                }}>
                    <Button mode="contained" onPress={()=>{
                        setCategories([])
                        setCategories(initCat)
                        setSubjects([])
                        setSubject(initSub)
                        setVars([])
                        setVaria(initVar)
                        getCat()
                    }} labelStyle={{color: 'white'}} color="#004D91" icon="reload">Reset</Button>
                </View>
            </View>
            <DetaiDataView
                variable={varia}
            />
            <Portal>
                <Modal contentContainerStyle={containerStyle} 
                    visible={catModal} 
                    onDismiss={()=>{ 
                        setCatModal(false)
                    }}
                    dismissable={true}
                >
                    <Title style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'stretch',
                        textAlign: 'center',
                        color: 'white',
                        borderRadius: 10,
                        backgroundColor: '#004D91',
                        padding: 10
                    }}>
                        Pilih Kategori
                    </Title>
                    {catLoaded ? <FlatList
                        style={{
                            marginVertical: 10,
                            padding: 10,
                            backgroundColor: 'white',
                            borderRadius: 10
                        }}
                        contentContainerStyle={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            maxHeight: 200,
                            // alignSelf: 'center'
                        }}
                        scrollEnabled={true}
                        data={categories}
                        keyExtractor={(item) => item.subcat_id}
                        renderItem={({item}) => {
                            return <Chip onPress={()=>{
                                setCategory(item)
                                setSubject({sub_id: 0, title:'Subjek Belum Dipilih'})
                                setVaria({var_id:0, title: 'Variabel Belum Dipilih'})
                                setCatModal(false)
                            }}
                            style={{
                                margin: 6,
                                marginHorizontal: 8,
                            }}
                            
                            onResponderEnd={()=>{
                                setVModal(false)
                            }}
                            selected={s(item.subcat_id, category.subcat_id)}>{item.title}</Chip>
                        }}
                        extraData={category}
                        onEndReachedThreshold={3}
                        onEndReached={()=>{
                            nextPage(0)
                        }}
                    />  : <ScrollView style={{
                        padding: 10,
                        backgroundColor: 'white',
                        borderRadius: 10
                    }} contentContainerStyle={{
                        padding: 10,
                        backgroundColor: 'white',
                        borderRadius: 10
                    }} refreshControl={
                        <RefreshControl refreshing={!subsLoaded}
                            onRefresh={()=>{
                                getCat()
                            }}
                        />
                    }>
                       {catNettErr && catLoaded ?  <Title>Gagal memuat kategori, silahkan refresh kembali</Title> : <ActivityIndicator animating={true}/>}
                    </ScrollView>}
                </Modal>
                <Modal contentContainerStyle={containerStyle} 
                    visible={subModal} 
                    onDismiss={()=>{
                        setSubModal(false)
                    }}
                >
                    <Title style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'stretch',
                        textAlign: 'center',
                        borderRadius: 10,
                        backgroundColor: '#004D91',
                        padding: 10,
                        color: 'white',
                        marginBottom: 10
                    }}>
                        Pilih Subjek
                    </Title>
                    {subjects.length > 0 && subsLoaded ? <FlatList
                        style={{
                            marginVertical: 10,
                            padding: 10,
                            backgroundColor: 'white',
                            borderRadius: 10
                        }}
                        contentContainerStyle={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                            padding: 10,
                            backgroundColor: 'white',
                            borderRadius: 10
                        }}
                        style={{
                            padding: 10,
                            backgroundColor: 'white',
                            borderRadius: 10
                        }}
                        scrollEnabled={true}
                        data={subjects}
                        keyExtractor={(item) => item.sub_id}
                        renderItem={({item}) => {
                            return <Chip onPress={()=>{
                                setSubject(item)
                                setVaria({var_id:0, title: 'Variabel Belum Dipilih'})
                                setSubModal(false)
                            }}
                            style={{
                                margin: 6,
                                marginHorizontal: 8,
                            }}
                            onResponderEnd={()=>{
                                setSubModal(false)
                            }}
                            selected={s(item.sub_id, subject.sub_id)}>{item.title}</Chip>
                        }}
                        extraData={category}
                        onEndReachedThreshold={3}
                        onEndReached={()=>{
                            nextPage(1)
                        }}
                    /> : subjects.length < 1 && subsLoaded ? <Title
                        style={{
                            marginTop: 10,
                            padding: 10,
                            backgroundColor: 'white',
                            borderRadius: 10
                        }}
                    >Tidak Ada Subjek dari kategori {subject.title}</Title> :
                        <ScrollView style={{
                            marginVertical: 10,
                            padding: 10,
                            backgroundColor: 'white',
                            borderRadius: 10
                        }} contentContainerStyle={{
                            padding: 10,
                            backgroundColor: 'white',
                            borderRadius: 10
                        }}
                            refreshControl={
                            <RefreshControl refreshing={!subsLoaded}
                                onRefresh={()=>{
                                    getSub()
                                }}
                            />
                        }
                        onRefresh={()=>{
                            getSub()
                        }}>
                            { subsNetError ? <Title>Gagal memuat subjek, silahkan refresh kembali</Title> : <ActivityIndicator animating={true} />}
                        </ScrollView> 
                    }
                </Modal>
                <Modal contentContainerStyle={containerStyle} 
                    visible={vModal} 
                    onDismiss={()=>{
                        setVModal(false)
                    }}
                >
                     <Title style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'stretch',
                            textAlign: 'center',
                            borderRadius: 10,
                            backgroundColor: '#004D91',
                            padding: 10,
                            color: 'white'
                        }}>
                            Pilih Variabel
                    </Title>
                    {vars.length > 0 && varsLoaded ? <FlatList
                        style={{
                            marginVertical: 10,
                            padding: 10,
                            backgroundColor: 'white',
                            borderRadius: 10
                        }}
                        contentContainerStyle={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                            padding: 10,
                            backgroundColor: 'white',
                            borderRadius: 10,
                        }}
                        scrollEnabled={true}
                        data={vars}
                        keyExtractor={(item) => item.var_id}
                        renderItem={({item}) => {
                            return <Chip onPress={()=>{
                                setVaria(item)
                                setVModal(false)
                                setFilter(false)
                            }}
                            
                            onResponderEnd={()=>{
                                setVModal(false)
                            }}
                            style={{
                                margin: 6,
                                marginHorizontal: 8,
                                justifyContent: 'space-around',
                                alignSelf: 'stretch'
                            }}
                            selected={s(item.var_id, varia.var_id)}>{item.title}</Chip>
                        }}
                        extraData={subject}
                        onEndReachedThreshold={3}
                        onEndReached={()=>{
                            nextPage(2)
                        }}
                    /> : vars.length < 1 && varsLoaded ? <Title
                        style={{
                            marginTop: 10,
                            padding: 10,
                            backgroundColor: 'white',
                            borderRadius: 10
                        }}
                    >Tidak ada variabel dari subjek {subject.title} </Title> :
                    <ScrollView style={{
                        marginVertical: 10,
                        padding: 10,
                        backgroundColor: 'white',
                        borderRadius: 10
                    }} contentContainerStyle={{
                        padding: 10,
                        backgroundColor: 'white',
                        borderRadius: 10
                    }} refreshControl={
                        <RefreshControl refreshing={!varsLoaded}
                            onRefresh={()=>{
                                getVars()
                            }}
                        />
                    }
                    onRefresh={()=>{
                        getSub()
                    }}>
                        {varsNettErr ? <Title>Gagal memuat subjek, silahkan refresh kembali</Title> : <ActivityIndicator animating={true} />}
                    </ScrollView> }
                </Modal>
            </Portal>
            <Snackbar visible={snackC}
                action={{
                    label: 'Coba Lagi',
                    onPress: ()=>{
                        nextPage(0)
                    }
            }}>Gagal memuat kategori selanjutnya</Snackbar>
            <Snackbar visible={snackS} 
                action={{
                    label: 'Coba Lagi',
                    onPress: ()=>{
                        nextPage(1)
                    }
            }}>Gagal memuat subjek selanjutnya</Snackbar>
            <Snackbar visible={snackV} 
                action={{
                    label: 'Coba Lagi',
                    onPress: ()=>{
                        nextPage(2)
                    }
            }}>Gagal memuat variabel selanjutnya</Snackbar>
        </View>
    )
}

export default DataView