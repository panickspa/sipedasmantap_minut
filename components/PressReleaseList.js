import React from 'react';
import { FlatList, RefreshControl, ScrollView, Text, View } from "react-native";
import {ActivityIndicator, Headline} from "react-native-paper"
import {getPressReleaseList, default_domain} from "../helper/api"
import PressReleaseView from "./PressReleaseView"

const PressReleaseList = () => {
    const [pRList, setPRList] = React.useState([])
    // const [newPRList, setNewPRList] = React.useState([])
    const [loaded, setLoaded] = React.useState(false)
    const [curPage, setCurPage] = React.useState(0)
    const [curPages, setCurPages] = React.useState(0)
    const [loadMore, setLoadMore] = React.useState(false)
    const [counter, setCounter] = React.useState(0)
    const [errNetwork, setErrNetwork] = React.useState(false)

    const getPress = () => {
        setErrNetwork(false)
        getPressReleaseList({
            domain: default_domain
        })
            .then(resp => resp.json())
            .then(resp =>{
                if(resp.status == 'OK'){
                    if(resp["data-availability"] == "available"){
                        setPRList([...resp.data[1]])
                        setCurPage(resp.data[0].page)
                        setCurPages(resp.data[0].pages)
                        // console.log("page", resp.data[0].page, "pages", resp.data[0].pages)
                        // console.log(resp.data[1])
                        // setLoaded(true)
                    }
                }
            })
            .catch(error => {
                console.log(error)
                setErrNetwork(true)
            })
            .finally(()=>{
                let c = counter+1
                setCounter(c)
            })
    }

    React.useEffect(() =>{
        getPress()
    },[])

    React.useEffect(()=>{
        // console.log("list length: ",pRList.length)
        if (pRList.length > 0) {
            setLoaded(true)
            setCurPage(1)
        }
        else if(errNetwork) setLoaded(true)
        else setLoaded(false)
    },[pRList, errNetwork, counter])

    const nextPage = ()=>{
        let next = curPage+1
        if(next < curPages+1) {
            // setCurPage(next)
            if(!loadMore){
                setLoadMore(true)
            }
            getPressReleaseList({
                domain: default_domain,
                page: next
            }).then(resp => resp.json())
            .then(resp => {
                if(resp.status == 'OK')
                    if(resp["data-availability"] == "available"){
                        setPRList([...pRList, ...resp.data[1]])
                        setCurPage(resp.data[0].page)
                    }
            })
            .catch(error => {
                console.log(error)
            })
            .finally(setLoadMore(false))
        }
    }

    return (
        loaded && !errNetwork ? 
        <FlatList
            bounces={true}
            alwaysBounceVertical={true}
            data={pRList}
            scrollEnabled={true}
            initialNumToRender={4}
            onEndReachedThreshold={2}
            keyExtractor={item => `pr-${item.brs_id}-${item.subj_id}`}
            // style={{
            //     height: '100%'
            // }}
            onEndReached={()=>{
                nextPage();
            }}
            renderItem={({item}) => {
                return (<PressReleaseView id={item.brs_id}/>)
                // <Text>{JSON.stringify(item)}</Text>
            }}

            refreshControl={<RefreshControl
                refreshing={!loaded}
                onRefresh={()=>{
                    // setLoaded(false)
                    setPRList([])
                    getPress()
                }}
            />}
            // extraData={newPRList}
        /> : errNetwork ?<ScrollView
            style={{
                flex: 1
            }}
            refreshControl={
                <RefreshControl
                    refreshing={!loaded}
                    onRefresh={()=>{
                        // setLoaded(false)
                        setPRList([])
                        getPress()
                    }}
                />
            }
        >
            <Headline
                style={{
                    textAlign: 'center'
                }}
            >Internet Tidak Ada, silahkan cek kembali koneksi anda</Headline>
        </ScrollView> : <ActivityIndicator animating={true}/>
        // <PressReleaseView id={pRList[0].brs_id}/>: <ActivityIndicator animating={true}/>
    );
}
 
export default PressReleaseList;