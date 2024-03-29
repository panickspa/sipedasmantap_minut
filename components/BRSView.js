/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Dimensions, FlatList, Linking, Pressable, View} from 'react-native';
import {IconButton, Headline, Caption, Snackbar} from 'react-native-paper';
import PressRelaseList from './PressReleaseList';

const BRSView = props => {
  const [snack, setSnack] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  // eslint-disable-next-line no-unused-vars
  const [Menus, setMenus] = React.useState([
    {
      menu: 'BPS Kab Minut',
      icon: 'earth',
      nav: 'WebBPS',
      uri: 'https://minutkab.bps.go.id/',
    },{
      menu: 'BPS Prov Sulut',
      icon: 'earth',
      nav: 'WebBPS',
      uri: 'https://sulut.bps.go.id/',
    },
    {
      menu: 'Konsultasi',
      icon: 'face-agent',
      nav: 'Konsultasi',
      uri: 'https://silastik.bps.go.id/v3/index.php/site/login/',
    },
    {
      menu: 'Ulas Kami',
      icon: 'comment',
      nav: 'Review',
      uri: 'http://s.bps.go.id/7106_evaluasi_SILEOSMINUT  ',
    },
  ]);

  // React.useEffect(()=>{
  //   if(loaded){
  //     // setLoaded(true)
  //     props.navigation.navigate("Home")
  //   }
  // }, [loaded])
  
  return (
    <View
      style={{
        // display: 'flex',
        flexDirection: 'column',
        alignSelf: 'stretch',
        justifyContent: 'center',
        width: '100%',
        flex: 1,
      }}>
      <View
        style={{
          alignSelf: 'stretch',
          flex: 2,
          flexBasis: 'auto',
          justifyContent: 'flex-start',
          flexDirection: 'column',
          backgroundColor: '#EFF8FF',
          width: Dimensions.get('window').width,
        }}>
        <Headline
          style={{
            marginLeft: 10,
            fontSize: 30,
            fontWeight: 'bold',
            marginVertical: 20,
          }}>
          Berita Resmi Statistik
        </Headline>
        <PressRelaseList loaded={()=>{
            setLoaded(true)
          }
        } />
      </View>
      <Snackbar visible={snack}>
        Maaf membuka link ke browser tidak didukung
      </Snackbar>
    </View>
  );
};

export default BRSView;
