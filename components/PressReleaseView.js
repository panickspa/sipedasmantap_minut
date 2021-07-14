/* eslint-disable no-useless-escape */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eqeqeq */
/* eslint-disable curly */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {View, Dimensions} from 'react-native';
import {Title, Text, IconButton, Caption} from 'react-native-paper';
import {getPressReleaseDetail} from '../helper/api';
import {decode as htmlDecode} from 'html-entities';
import RNFetchBlob from 'rn-fetch-blob';

const PressReleaseView = props => {
  const [loaded, setLoaded] = React.useState(false);
  const widthWindows = Dimensions.get('window').width
  const widthContent = Number(widthWindows) - 144;
  const [pR, setPr] = React.useState({
    brs_id: 0,
    title: '',
    abstract: '<span>Loading ...<span>',
    rl_date: '',
    updt_date: '',
    pdf: '',
    size: '',
  });
  //   function displayPress() {
  //     return pR.id == 0
  //       ? {display: 'none'}
  //       : {display: 'flex', flexDirection: 'column'};
  //   }

  function downloadPDF(url, fileName) {
    const {config, fs} = RNFetchBlob;
    const downloads = fs.dirs.DownloadDir;
    return config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: downloads + '/' + fileName + '.pdf',
        mediaScannable: true,
        mime: 'application/pdf',
      },
    })
      .fetch('GET', url)
      .then(res => {
        fs.scanFile([
          {
            path: res.path(),
            mime: 'application/pdf',
          },
        ]).catch(err => {
          console.log("error view press release download");
        });
      });
  }

  React.useEffect(() => {
    if (pR.brs_id != 0) setLoaded(true);
    else setLoaded(false);
  }, [pR]);

  React.useEffect(() => {
    getPressReleaseDetail('7106', props.brsId)
      .then(resp => {
        // console.log(resp.data.abstract ? resp.data.brs_id : `no abstract ${resp.data.brs_id}`)
        if (resp.status == 'OK') {
          if (resp['data-availability'] == 'available') {
            setPr({
              brs_id: resp.data.brs_id,
              title: resp.data.title,
              abstract: resp.data.abstract ? htmlDecode(resp.data.abstract)
                .replace('background-color: rgb(255, 255, 255);', '')
                .replace(/&quot;/g, "'")
                .replace(/class="abstrak-item-brs"/g, '')
                .replace(/font-family: 'Segoe UI';/g, '')
                : " ",
              rl_date: resp.data.rl_date,
              updt_date: resp.data.updt_date,
              pdf: resp.data.pdf,
              size: resp.data.size,
            });
          }
        }
      })
      .catch(err => {
        console.log("error load press release view");
      });
  }, []);

  return (
    <View
      style={{
        flexDirection: 'column',
        paddingHorizontal: 12,
        marginBottom: 18,
        padding: 15,
        margin: 16,
        borderRadius: 5,
        backgroundColor: 'white',
      }}>
      <Title
        style={{
          fontWeight: 'bold',
        }}>
        {pR.title}
      </Title>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <View
          style={{
            width: widthContent,
          }}>
          {/* <HTML
                        source={{html: String(pR.abstract)}}
                        contentWidth={widthContent}
                    /> */}
          <Caption>
            {pR.abstract
              .replace(/(<[a-zA-Z])([a-zA-Z0-9:;\.\s\(\)\-\,=\\\"%]*)(>)/g, '')
              .replace(
                /(<\/[a-zA-Z])([a-zA-Z0-9:;\.\s\(\)\-\,=\\\"%]*)(>)/g,
                '',
              )}
          </Caption>
        </View>
        <View
          style={{
            flexDirection: 'column-reverse',
            alignItems: 'center',
          }}>
          <Text>{pR.size}</Text>
          {loaded ? (
            <IconButton
              size={72}
              icon="file-pdf-box"
              color={'red'}
              onPress={() => {
                // console.log(pR.pdf, pR.title)
                downloadPDF(pR.pdf, pR.title);
              }}
            />
          ) : (
            <Text> </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default PressReleaseView;
