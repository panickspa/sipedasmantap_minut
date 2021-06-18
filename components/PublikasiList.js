import React from 'react'
import { FlatList, RefreshControl, ScrollView, StyleSheet, View, Image } from 'react-native'
import { ActivityIndicator, Caption, Headline, IconButton, Button, Text } from 'react-native-paper'
import { defaultImage, default_domain, getDetPublication, getPublication } from '../helper/api'
import Share from 'react-native-share'
import RNFetchBlob from 'rn-fetch-blob'
import HTML from 'react-native-render-html'

const PublikasiWindow =  (props) => {
    /* 
        id,
        title,
        cover,
        abstract
    */
        const donwloadPDF = (url, fileName) => {
            // console.log(url, fileName)
            const {config, fs} = RNFetchBlob
            const downloads = fs.dirs.DownloadDir
            return config({
                fileCache: true,
                addAndroidDownloads: {
                    useDownloadManager: true,
                    notification: true,
                    path: downloads+'/'+fileName+'.pdf'
                }
            }).fetch('GET', url).then(res => fs.scanFile([{
                path: res.path(),
                mime: `application/pdf`
            }]))
            .catch(err => {
                console.log(err)
            })
        }
    
        // const sharePDF = (url, message) => {
        //     const {config, fs} = RNFetchBlob
        //     return config({
        //         fileCache: true,
        //         addAndroidDownloads: {
        //             useDownloadManager: true,
        //             notification: true,
        //         }
        //     }).fetch('GET', url)
        //     .then(resp => {
        //         // the image path you can use it directly with Image component
        //         pubPath = resp.path();
        //         return resp.readFile("base64");
        //     })
        //     .then(async base64Data => {
        //         var base64Data = `application/pdf` + base64Data;
        //         // here's base64 encoded image
        //         await Share.open({ url: base64Data, message: message });
        //         // remove the file from storage
        //         return fs.unlink([pubPath]);
        //     })
        // }
    
    return <View>
        <View style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            marginBottom: 10
        }}>
            <View
                style={{
                    flex: 1,
                    minHeight: 200,
                    alignContent: 'flex-start',
                    justifyContent: 'flex-start',
                    paddingRight: 10
                }}
            >
                <Image
                    loadingIndicatorSource={defaultImage}
                    source={{
                        uri: props.cover
                    }}
                    style={{
                        resizeMode: 'contain',
                        minHeight: 250,
                        width: '100%',
                        alignContent: 'flex-start',
                        justifyContent: 'flex-start',
                        alignSelf: 'flex-start'
                        // minWidth: 200,
                        // alignSelf: 'center'
                        // minHeight: viewWidth,
                        // maxHeight: viewWidth,
                        // width: viewWidth
                    }}
                />
                <Button icon="download"
                    mode="contained"
                    color="#004D91"
                    style={{
                        marginTop: 20,
                        marginHorizontal: 10
                    }}
                    onPress={()=>{
                        donwloadPDF(props.pdf, props.title)
                    }}
                >Download</Button>
            </View>
            <View style={{
                    flex: 1
                }}>
                <Text style={{fontWeight: 'bold'}}>{props.title}</Text>
                <Caption>
                    {props.abstract ? props.abstract.replace(/(<[a-zA-Z])([a-zA-Z0-9:;\.\s\(\)\-\,=\\\"%]*)(>)/g, "").replace(/[\n\r]/g, ' ').replace(/(<\/[a-zA-Z])([a-zA-Z0-9:;\.\s\(\)\-\,=\\\"%]*)(>)/g, '') : ' '}
                </Caption>
                {/* <HTML
                style={{
                    textAlign: 'justify'
                }}
                ignoredStyles={['font-size', 'background-color', 'color', 'margin', 'padding', 'font-family']}
                source={{
                    html: props.abstract ? props.abstract.replace(/(<[a-zA-Z])([a-zA-Z0-9:;\.\s\(\)\-\,=\\\"%]*)(>)/g, "").replace(/[\n\r]/g, ' ').replace(/(<\/[a-zA-Z]>)/g, '') : ' '
                }}
                baseFontStyle={{
                    textAlign: 'justify',
                    fontSize: 12
                }}/> */}
                {/* <Caption style={{
                    textAlign: 'justify'
                }}>{props.abstract}</Caption> */}
                <View style={{
                    flexDirection: 'row'
                }}>
                    {/* <Button icon="download"
                        onPress={()=>{
                            donwloadPDF(props.pdf, props.title)
                        }}
                    >Download</Button> */}
                    {/* <IconButton icon="share-variant"
                        onPress={()=>{
                            sharePDF(props.pdf, props.title)
                        }}
                    /> */}
                </View>
            </View>
        </View>
    </View>
}

const PublikasiList = (props) => {

    const [pList, setPList] = React.useState([])
    const [errNetwork, setErrNetwork] = React.useState(false)
    const [loaded, setLoaded] = React.useState(false)
    const [curPage, setCurPage] = React.useState(0)
    const [curPages, setCurPages] = React.useState(0)
    const [loadMore, setLoadMore] = React.useState(false)
    const [noData, setNoData] = React.useState(false)
    

    React.useEffect(()=>{
        // console.log(pList.length, errNetwork, loaded)
        if(pList.length > 0) setLoaded(true)
        else if(errNetwork){
            setLoaded(true)
        }else if(noData){
            setLoaded(true)
        }else setLoaded(false)
    }, [errNetwork, pList, noData])

    const getList = ()=>{
        // console.log("get list")
        setNoData(false)
        setErrNetwork(false)
        getPublication({
            domain: default_domain,
            lang: 'ind',
            // month: props.month == 'Semua' ? null : props.month,
            year: props.year == 'Semua' ? null : props.year,
            keyword: props.keywords
        }).then(resp => {
            // console.log(resp)
            if(resp.status == 'OK')
                if(resp["data-availability"] == "available"){
                    // console.log('publis init',resp.data[0])
                    Promise.all(
                        resp.data[1].map(e=>{
                            return getDetPublication({
                                domain: default_domain,
                                id:e.pub_id,
                                lang: 'ind'
                            })
                        })
                    ).then(resp2 => resp2.map(e => {
                            // console.log(e)
                            if(e.status == 'OK')
                                    if(e["data-availability"] == "available") 
                                        return e.data
                            return null
                        }).filter(e => e)).then(pubs => {
                            // console.log(pubs.length)
                            setPList(pubs)
                        })
                    .catch(err => {
                        console.log(err)
                    })
                    setCurPage(resp.data[0].page)
                    setCurPages(resp.data[0].pages)
                }
                else {
                    setNoData(true)
                }
            else{
                setNoData(true)
            }
            
        })
        .catch(err=>{
            console.log(err)
            setErrNetwork(true)
        })
    }
    
    const nextList = ()=>{
        let next = curPage+1
        // console.log(curPage, next, curPages)
        if(next < curPages+1){
            if(!loadMore){ 
                setLoadMore(true)
                getPublication({
                    domain: default_domain,
                    page: next,
                    lang: 'ind',
                    year: props.year == 'Semua' ? null : props.year,
                }).then(resp => {
                    // console.log(resp)
                    if(resp.status == 'OK')
                        if(resp["data-availability"] == "available"){
                            setCurPage(resp.data[0].page)
                            setCurPages(resp.data[0].pages)
                            Promise.all(resp.data[1].map(e => {
                                return getDetPublication({
                                    domain: default_domain,
                                    lang: 'ind',
                                    id: e.pub_id
                                }).catch(err => err)
                            })).then(resp2 => {
                                return resp2.map(e => {
                                    if(e.status == 'OK')
                                        if(e["data-availability"] == "available") return e.data
                                    return null
                                }).filter(e => e)
                            }).then(p => {
                                setPList([...pList, ...p])
                            }).catch(err => {
                                console.log(err)
                            })
                        }
                }).catch(err =>{
                    console.log(err)
                })
                .finally(()=>{
                    setLoadMore(false)
                })
            }
        }
    }

    React.useEffect(()=>{
        setPList([])
        getList()
    }, [props.year, props.keywords])
    
    return (
        loaded && !errNetwork ? <FlatList
            data={pList}
            refreshControl={<RefreshControl
                onRefresh={()=>{
                    setPList([])
                    getList()
                }}
            />}
            contentContainerStyle={{
                paddingHorizontal: 8
            }}
            scrollEnabled={true}
            initialNumToRender={6}
            onEndReachedThreshold={4}
            onEndReached={()=>{
                nextList()
            }}
            keyExtractor={(item,i) => `${item.pub_id}-${i}`}
            renderItem={({item})=><PublikasiWindow
                title={item.title}
                abstract={item.abstract}
                cover={item.cover}
                id={item.pub_id}
                key={item.pub_id}
                pdf={item.pdf}
            />}
        /> : noData && loaded ? 
            <ScrollView style={{
                flex: 1,
                alignContent: 'center',
                justifyContent: 'center',
            }}>
                <Headline style={{marginTop:10, justifyContent: 'center',textAlign: 'center', color: 'black'}}>Tidak Ada Publikasi</Headline>
            </ScrollView>
        : errNetwork ? 
        <ScrollView style={{
            flex: 1,
            alignContent: 'center',
            justifyContent: 'center',
        }}>
            <Headline style={{marginTop:10, justifyContent: 'center'}}>Tidak Ada Jaringan, silahkan periksa kembali koneksi anda</Headline>
        </ScrollView> :
        <ActivityIndicator animating={true} style={{marginTop: 10}}/>
    )
}

export default PublikasiList

