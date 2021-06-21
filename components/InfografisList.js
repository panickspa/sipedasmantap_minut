import React from 'react'
import { FlatList, useWindowDimensions, Dimensions, View, Image, RefreshControl } from 'react-native'
import {Divider, Headline, IconButton, Title} from 'react-native-paper'
import {defaultImage} from '../helper/api'
import Share from 'react-native-share'
import RNFetchBlob from 'rn-fetch-blob'

const InfografisList = (props) => {
    const viewWidth = Dimensions.get('window').width
    // const viewHeight = Number(useWindowDimensions.width)+200

    const donwload = (url, fileName,ext) => {
        // console.log(fileName)
        const {config, fs} = RNFetchBlob
        const downloads = fs.dirs.DownloadDir
        return config({
            fileCache: true,
            appendExt: ext,
            addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                path: downloads+'/'+`${fileName}`,
                mime: `image/${ext}`,
            }
        }).fetch('GET', url)
        .then((res)=> fs.scanFile([{
            path: res.path(),
            mime: `image/${ext}`
        }]))
        .catch(err => {
            console.log(err)
        })
    }

    const shareImage = (url, ext, message) => {
        const {config, fs} = RNFetchBlob
        return config({
            fileCache: true
        }).fetch('GET', url)
        .then(resp => {
            // the image path you can use it directly with Image component
            imagePath = resp.path();
            return resp.readFile("base64");
        })
        .then(async base64Data => {
            var base64Data = `data:image/${ext};base64,` + base64Data;
            // here's base64 encoded image
            await Share.open({ url: base64Data, message: message });
            // remove the file from storage
            return fs.unlink(imagePath);
        })
    }

    return (
        <FlatList
            data={props.data}
            // extraData={props.extraData}
            keyExtractor={(item, index) => `info-${item.inf_id}-${index}`}
            onEndReachedThreshold={4}
            onEndReached={()=>{
                props.endReached()
            }}
            refreshControl={<RefreshControl
                refreshing={!props.loaded}
                onRefresh={() => {props.onRefresh()}}
            />}
            renderItem={({item})=>{
                // console.log(item.dl)             
                // console.log(viewWidth, typeof viewWidth)
                return(
                    <View style={{
                        flexDirection: 'column',
                        marginVertical: 8,
                        // padding: 8
                    }}>
                        
                        <Title style={{
                            marginLeft: 5
                        }}>{item.title}</Title>
                        <Divider style={{marginBottom: 10}}/>
                        <View style={{
                            maxHeight: 500,
                            width: viewWidth
                        }}>
                            <Image
                                style={{
                                    resizeMode: 'contain',
                                    minHeight: viewWidth,
                                    // maxHeight: viewWidth,
                                    width: viewWidth
                                }}
                                source={{
                                    uri: item.dl
                                }}
                                // defaultSource={defaultImage}
                                progressiveRenderingEnabled={true}
                                loadingIndicatorSource={defaultImage}
                            />
                        </View>
                        <Divider style={{marginBottom: 10}}/>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end'
                        }}>
                            <IconButton icon="download"
                            onPress={()=>{
                                let ext = item.img.split('.')
                                donwload(item.dl, item.title, ext[ext.length-1])
                            }}
                            size={26}
                            style={{marginLeft: 8}}/>
                            <IconButton onPress={()=>{
                                let ext = item.img.split('.')
                                shareImage(item.dl, ext[ext.length-1], item.title)
                            }} size={26} icon="share-variant"/>
                        </View>
                        
                    </View>
                )
            }}
        />
        // <View>
        //     <Headline>
                
        //     </Headline>
        // </View>
    )
}

export default InfografisList
