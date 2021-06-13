import React from 'react'
import { View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import {default_domain, getInfografis} from '../helper/api'
import InfografisList from './InfografisList'

const InfografisView = () => {
    const [infos, setInfos] = React.useState([])
    // const [extraInfos, setExtraInfos] = React.useState([])
    const [curPages, setCurPages] = React.useState(0)
    const [curPage, setCurPage] = React.useState(0)
    const [loaded, setLoaded] = React.useState(false)
    const [loadMore, setLoadMore] = React.useState(false)
    const [counter, setCounter] = React.useState(0)

    const getInfo = (req) => {
        getInfografis({
            domain: req.domain,
        }).then(resp => {
            // console.log(resp)
            if(resp.status == "OK")
                if(resp["data-availability"] == "available"){
                    setInfos([...resp.data[1]])
                    // console.log(resp.data[0])
                    setCurPage(resp.data[0].page)
                    setCurPages(resp.data[0].pages)
                }
        })
        .catch(err => {
            console.log(err)
        })
        .finally(()=>{
            let c = counter+1;
            setCounter(c)
        })
    }
    React.useEffect(()=>{
        getInfo({
            domain: default_domain
        })
    }, [])

    React.useEffect(()=>{
        if(infos.length > 0 ){
            setLoaded(true)
        }else{
            setLoaded(false)
        }
    }, [infos, counter])

    const nextInfo = ()=>{
        const next = curPage+1
        console.log(next)
        if(next < curPages+1) {
            if(!loadMore) setLoadMore(true)
            setCurPage(next)
            getInfografis({
                domain: default_domain,
                page: next
            })
            .then(resp => {
                // console.log(resp)
                if(resp.status == 'OK')
                    if(resp["data-availability"] == "available"){
                        setInfos([...infos, ...resp.data[1]])
                        console.log('info', resp.data[0].page)
                    }
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => setLoadMore(false))
        }
        // else console.log("no more loaded", next, curPages)
    }

    function indLoadMore(){
        return loadMore ? 'flex' : 'none'
    }

    return (
        <View>
            {loaded ? 
            <InfografisList data={infos}
                endReached={() => {
                    console.log('end reach')
                    // setLoadMore(true)
                    nextInfo()
                }}
                loaded={loaded}
                onRefresh={()=>{
                    setLoaded(false)
                    setInfos([])
                    getInfo({
                        domain: default_domain
                    })
                }}/> 
            : <ActivityIndicator style={{marginTop: 10}} animating={true}/>}
            <ActivityIndicator style={{marginTop: 10, display: indLoadMore()}} animating={true}/>
        </View>
    )
}

export default InfografisView

