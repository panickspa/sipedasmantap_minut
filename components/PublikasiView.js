import React from 'react'
import { FlatList, Text, View } from 'react-native'
import { Chip, Portal, TouchableRipple, Modal, Title, Searchbar } from 'react-native-paper'
import { years, months} from '../helper/date'
import PublikasiList from './PublikasiList'

const YearList = (props)=>{
    const [year, setYear] = React.useState(props.year)
    const [key, setKey] = React.useState('')

    return <FlatList
        keyExtractor={(item,i) => `${item}`}
        scrollEnabled={true}
        data={['Semua', ...years]}
        initialNumToRender={10}
        contentContainerStyle={{
            justifyContent: 'center',
            alignItems:'center'
        }}
        keyExtractor={(item) => item}
        renderItem={
            ({item}) => (
                <Chip 
                key={item}
                style={{
                    fontWeight:'bold',
                    marginVertical: 10,
                    marginHorizontal: 2,
                }}
                selected={ year == String(item)}
                onPress={()=>{
                    if(props.yearChange) props.yearChange(String(item))
                    setYear(String(item))
                }}>
                    {String(item)}
                </Chip>
            )
        }
        numColumns={3}
        extraData={year}
    />
}

const PublikasiView = (props) => {
    // const [year, setYear] = React.useState(props.year)
    // const date = new Date()
    // const y = date.getMonth() == 0 ? years[1] : years[0]
    const [yModal, setYModal] = React.useState(false)
    const [year, setYear] = React.useState('Semua')
    const [ysModal, setYsModal] = React.useState('Semua')
    const [keywords, setKeywords] = React.useState('')
    const [keyword, setKeyword] = React.useState('')

    return (
        <View style={{
            marginTop: 10,
            flex: 1,
        }}>
            <View>
                <Searchbar
                    value={keyword}
                    onChangeText={(e => {
                        setKeyword(e)
                    })}
                    onSubmitEditing={()=>{
                        setKeywords(keyword)
                    }}
                    style={{
                        marginBottom: 10,
                        marginHorizontal: 10
                    }}
                />
            </View>
            <View style={{
                flexDirection: 'row',
                marginBottom: 10,
                marginLeft: 10
            }}>
                <Chip onPress={()=>{
                   setYModal(true)
                }}>
                    Tahun : {year}
                </Chip>
            </View>
            <PublikasiList
                year={year}
                keywords={keywords}
                // month={props.month}
            />
            <Portal>
                <Modal 
                    visible={yModal} 
                    onDismiss={()=>{
                        setYModal(false)
                        setYear(ysModal)
                    }}
                    contentContainerStyle={{
                        backgroundColor: 'white', 
                        padding: 20,
                        height: 400,
                        marginHorizontal: 10,
                        marginVertical: 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center'
                    }}>
                    <Title style={{
                        marginBottom: 10
                    }}>
                        Pilih Tahun
                    </Title>
                    <YearList
                        year={year}
                        yearChange={(y)=>{setYsModal(y)}}
                    />
                    {/* <FlatList
                        keyExtractor={(item,i) => `${item}`}
                        scrollEnabled={true}
                        data={years}
                        initialNumToRender={10}
                        contentContainerStyle={{
                            justifyContent: 'center',
                            alignItems:'center'
                        }}
                        renderItem={
                            ({item, index}) => (
                                <Chip style={{
                                    fontWeight:'bold',
                                    marginVertical: 10,
                                    marginHorizontal: 2,
                                }}
                                selected={ ysModal == String(item)}
                                onPress={()=>{
                                setYsModal(String(item))
                                }}>
                                    {String(item)}
                                </Chip>
                            )
                        }
                    /> */}
                </Modal>
                {/* <Modal 
                    visible={mModal}
                    onDismiss={()=>{setMModal(false)}}
                    contentContainerStyle={{
                    backgroundColor: 'white', 
                    padding: 20,
                    height: 400,
                    marginHorizontal: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    flexWrap: 'wrap',
                    textAlign: 'center',
                    }}
                >
                    <Title style={{
                    marginBottom: 10
                    }}>
                    Pilih Bulan
                    </Title>
                    <FlatList
                        keyExtractor={(item,i) => item}
                        scrollEnabled={true}
                        initialNumToRender={4}
                        removeClippedSubviews={true}
                        data={months}
                        initialNumToRender={10}
                        contentContainerStyle={{
                            justifyContent: 'center',
                            alignItems:'center',
                        }}
                        extraData={month}
                        renderItem={
                            ({item, index}) => (
                                <Chip key={`month-${item}-${index}`} style={{
                                    fontWeight:'bold',
                                    textAlign: 'center',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginVertical: 2,
                                    marginHorizontal: 10,
                                    // width: '100%',
                                }}
                                selectedColor="#004D91"
                                selected={item == month}
                                onPress={()=>{
                                    console.log(month)
                                    setMonth(item)
                                    setMModal(false)
                                }}
                                >
                                    <Text style={{
                                    textAlign: 'center',
                                    width: '100%'
                                    }}>
                                        {item}
                                    </Text>
                                </Chip>
                            )
                        }
                    />
                </Modal> */}
            </Portal>
        </View>
    )
}

export default PublikasiView