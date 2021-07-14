/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable curly */
import React from 'react';
import {ScrollView, View, RefreshControl} from 'react-native';
import {ActivityIndicator, Headline, Searchbar} from 'react-native-paper';
import {default_domain, getInfografis} from '../helper/api';
import InfografisList from './InfografisList';

const InfografisView = () => {
  const [infos, setInfos] = React.useState([]);
  // const [extraInfos, setExtraInfos] = React.useState([])
  const [curPages, setCurPages] = React.useState(0);
  const [curPage, setCurPage] = React.useState(0);
  const [loaded, setLoaded] = React.useState(false);
  const [loadMore, setLoadMore] = React.useState(false);
  // const [counter, setCounter] = React.useState(0);
  const [errNetwork, setErrNetwork] = React.useState(false);
  //   const [noData, setNoData] = React.useState(false);
  //   const [key, setKey] = React.useState('');
  const [keywords, setKeywords] = React.useState('');
  const [keyword, setKeyword] = React.useState('');

  const getInfo = req => {
    setErrNetwork(false);
    getInfografis({
      domain: req.domain,
      keyword: req.keyword,
    })
      .then(resp => {
        // console.log(resp)
        if (resp.status == 'OK')
          if (resp['data-availability'] == 'available') {
            setInfos([...resp.data[1]]);
            // console.log(resp.data[0])
            setCurPage(resp.data[0].page);
            setCurPages(resp.data[0].pages);
          } else {
            setLoaded(true);
          }
      })
      .catch(err => {
        console.log('network error', err);
        setErrNetwork(true);
      })
      // .finally(() => {
        // let c = counter + 1;
        // setCounter(c);
      // });
  };

  React.useEffect(() => {
    setInfos([]);
    getInfo({
      domain: default_domain,
      keyword: keywords,
    });
  }, [keywords]);

  React.useEffect(() => {
    if (infos.length > 0) {
      setLoaded(true);
    } else if (errNetwork) setLoaded(true);
    else {
      setLoaded(false);
    }
  }, [infos, errNetwork]);

  const nextInfo = () => {
    const next = curPage + 1;
    console.log(next);
    if (next < curPages + 1) {
      if (!loadMore) setLoadMore(true);
      // setCurPage(next)
      getInfografis({
        domain: default_domain,
        page: next,
        keyword: keywords,
      })
        .then(resp => {
          // console.log(resp)
          if (resp.status == 'OK')
            if (resp['data-availability'] == 'available') {
              setInfos([...infos, ...resp.data[1]]);
              setCurPage(resp.data[0].page);
              // console.log('info', resp.data[0].page)
            }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => setLoadMore(false));
    }
    // else console.log("no more loaded", next, curPages)
  };

  function indLoadMore() {
    return loadMore && loaded ? 'flex' : 'none';
  }

  const loadMoreIndicator = () => {
    if (loadMore && loaded) {
      return (
        <ActivityIndicator
          style={{
            marginTop: 10,
            display: indLoadMore(),
            position: 'absolute',
            alignSelf: 'center',
          }}
          animating={true}
        />
      );
    }
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      <Searchbar
        value={keyword}
        placeholder="Ketik judul infografis ..."
        onChangeText={e => {
          setKeyword(e);
        }}
        onSubmitEditing={() => {
          setKeywords(keyword);
        }}
        style={{
          margin: 10,
        }}
      />
      {loaded && !errNetwork ? (
        <InfografisList
          data={infos}
          endReached={() => {
            // console.log('end reach')
            // setLoadMore(true)
            nextInfo();
          }}
          loaded={loaded}
          onRefresh={() => {
            setLoaded(false);
            setInfos([]);
            getInfo({
              domain: default_domain,
            });
          }}
        />
      ) : errNetwork ? (
        <ScrollView
          style={{
            flex: 1,
          }}
          refreshControl={
            <RefreshControl
              refreshing={!loaded}
              onRefresh={() => {
                setLoaded(false);
                setInfos([]);
                getInfo({
                  domain: default_domain,
                });
              }}
            />
          }>
          <Headline
            style={{
              textAlign: 'center',
            }}>
            Internet Tidak Ada, silahkan cek kembali koneksi anda
          </Headline>
        </ScrollView>
      ) : (
        <ActivityIndicator style={{marginTop: 10}} animating={true} />
      )}
      {loadMoreIndicator()}
    </View>
  );
};

export default InfografisView;
