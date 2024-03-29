/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {FlatList, Dimensions, View, Image, RefreshControl} from 'react-native';
import {Divider, IconButton, Title} from 'react-native-paper';
import {defaultImage} from '../helper/api';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';

const InfografisList = props => {
  const viewWidth = Dimensions.get('window').width;
  // const viewHeight = Number(useWindowDimensions.width)+200

  const donwload = (url, fileName, ext) => {
    // console.log(fileName)
    const {config, fs} = RNFetchBlob;
    const downloads = fs.dirs.DownloadDir;
    return config({
      fileCache: true,
      appendExt: ext,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: downloads + '/' + `${fileName}.${ext}`,
        mime: `image/${ext}`,
        mediaScannable: true,
      },
    })
      .fetch('GET', url)
      .then(res => {
        fs.scanFile([
          {
            path: res.path(),
            mime: `image/${ext}`,
          },
          // eslint-disable-next-line prettier/prettier
        ]).catch(err =>{
          console.log(err)
        })
      })
      .catch(err => {
        console.log(err);
      });
  };

  const shareImage = (url, ext, message) => {
    const {fs} = RNFetchBlob;
    let filePath = null;
    return RNFetchBlob.config({
      fileCache: true,
      appendExt: ext
    })
      .fetch('GET', url)
      .then(resp => {
        // the image path you can use it directly with Image component
        // eslint-disable-next-line no-undef
        // imagePath = resp.path();
        // console.log(resp.bas)
        filePath = resp.path();
        return resp.readFile("base64");
      })
      .then(async base64Data => {
        if(base64Data){
          // console.log(typeof base64Data)
          let data = await base64Data
          const base64 = `data:image/${ext};base64,${data}`;
          // here's base64 encoded image
          console.log(base64)
          Share.open({url: base64, message: message})
          .then(e =>{
            console.log(e)
          })
          .catch(()=>{
            console.log("error share promise")
          }).finally(e =>{
            console.log("output share", e)
          })
          fs.unlink(filePath)
          // remove the file from storage
          // let unlink = fs.unlink(imagePath)
          // eslint-disable-next-line no-undef
          // return unlink;
        }
      }).catch(() =>{
        console.log("Error share")
      });
  };

  return (
    <FlatList
      data={props.data}
      // extraData={props.extraData}
      keyExtractor={(item, index) => `info-${item.inf_id}-${index}`}
      onEndReachedThreshold={10}
      onEndReached={() => {
        props.endReached();
      }}
      refreshControl={
        <RefreshControl
          refreshing={!props.loaded}
          onRefresh={() => {
            props.onRefresh();
          }}
        />
      }
      renderItem={({item}) => {
        // console.log(item.dl)
        // console.log(viewWidth, typeof viewWidth)
        return (
          <View
            style={{
              flexDirection: 'column',
              marginVertical: 8,
              // padding: 8
            }}>
            <Title
              style={{
                marginLeft: 5,
              }}>
              {item.title}
            </Title>
            <Divider style={{marginBottom: 10}} />
            <View
              style={{
                maxHeight: 500,
                width: viewWidth,
              }}>
              <Image
                style={{
                  resizeMode: 'contain',
                  minHeight: viewWidth,
                  // maxHeight: viewWidth,
                  width: viewWidth,
                }}
                source={{
                  uri: item.dl,
                }}
                // defaultSource={defaultImage}
                progressiveRenderingEnabled={true}
                loadingIndicatorSource={defaultImage}
              />
            </View>
            <Divider style={{marginBottom: 10}} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}>
              <IconButton
                icon="download"
                onPress={() => {
                  let ext = item.img.split('.');
                  donwload(item.dl, item.title, ext[ext.length - 1]);
                }}
                size={26}
                style={{marginLeft: 8}}
              />
              <IconButton
                onPress={() => {
                  let ext = item.img.split('.');
                  shareImage(item.dl, ext[ext.length - 1], item.title);
                }}
                size={26}
                icon="share-variant"
              />
            </View>
          </View>
        );
      }}
    />
    // <View>
    //     <Headline>

    //     </Headline>
    // </View>
  );
};

export default InfografisList;
