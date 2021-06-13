import {
    default_domain, 
    getDynData,
} from './api'
/* 
    subject id
        subcat 26 : Indeks Pembangunan Manusia var 37 : IPM 
            vervar : wilayah 7106
        subcat 12 : Kependudukan var 45: jumlah penduduk 
            vervar : kecamatan 7106000
        subcat 12 : Kependudukan var 85: Sex Ratio 
            vervar : kecamatan 7106000
        subcat 6 : tenaga kerja var 70: TPT 
        vervar : wilayah 7106
        subcat 23 : Kemiskinan var 44: Jumlah Penduduk Miskin 
            vervar : wilayah 7106
        subcat 23 : Kemiskinan var 47: Presentase Penduduk Miskin 
            vervar : wilayah 7106
        subcat 11: PDRB var 58 : PDRB Kabupaten Atas Dasar Harga Berlaku Menurut Pengeluaran 
            vervar: PDRB total 8
        subcat 11: PDRB var 59 : PDRB Kabupaten Minahasa Utara Atas Dasar Harga Konstan Menurut Pengeluaran 
            vervar: PDRB total 8

    tahun : 
        2010 -> 110
        2020 -> 120

    turtahun = 0
*/

const indStratList = {
    jp:{
        var: 45,
        subcat: 12,
        vervar: 7106000
    },
    sr:{
        var: 85,
        subcat: 12,
        vervar: 7106000
    },
    ipm:{
        var: 37,
        subcat: 26,
        vervar: 7106
    },
    tpt:{
        var: 70,
        subcat: 6,
        vervar: 7106
    },
    jpm:{
        var: 44,
        subcat: 23,
        vervar: 7106
    },
    ppm:{
        var: 47,
        subcat: 23,
        vervar: 7106
    },
    pdrbHB:{
        var: 58,
        subcat: 11,
        vervar: 8
    },
    pdrbHK:{
        var: 59,
        subcat: 11,
        vervar: 8
    },
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }


const convertData = (data, verv) => {
    // let key = `${indStratList.jpm.vervar}${indStratList.jpm.var}`
    return data.turvar.map((turvar,i) => {
        return data.tahun.map((tahun, j) => {
            return data.turtahun.map((turtahun, l) => {
                let k = `${verv}${data.var[0].val}${turvar.val}${tahun.val}${turtahun.val}`
                return {
                    var: data.var[0].value,
                    title: data.var[0].label,
                    unit: data.var[0].unit,
                    value: String(data.datacontent[k]),
                    turvar: turvar,
                    tahun: tahun.label,
                    turtahun: turtahun.label,
                    indicator_id: k
                }
            }).flat()
        }).flat()
    }).flat().filter(e => e.value)
}

const getAll = () => Promise.all(
    Object.keys(indStratList).map(e => {
        return getDynData({
            domain: default_domain,
            var: indStratList[e].var,
            vervar: indStratList[e].vervar
        }).then(resp => {
            if(resp.status == 'OK')
                if(resp["data-availability"] == "available"){
                    return convertData(resp, indStratList[e].vervar)
                }else return (resp)
            else return (resp)
        }).catch(err => {
            return err
        })
    })
)

const getJumlahPenduduk = () => getDynData({
    domain: default_domain,
    var: indStratList.jp.var,
    vervar: indStratList.jp.vervar,
})
.then(
    (resp) =>{
        if(resp.status == 'OK')
            if(resp["data-availability"] == "available"){
               return convertData(resp, indStratList.jp.vervar)
            }else return (resp)
        else return (resp)
    }
).catch(err => {return err})

const getSexRatio = () => getDynData({
    domain: default_domain,
    var: indStratList.sr.var,
    vervar: indStratList.sr.vervar
})
.then(
    (resp) =>{
        if(resp.status == 'OK')
            if(resp["data-availability"] == "available"){
               return convertData(resp, indStratList.sr.vervar)
            }else return (resp)
        else return (resp)
    }
).catch(err => (err))

const getJumlahPendudukMiskin = () => getDynData({
    domain: default_domain,
    var: indStratList.jpm.var,
    vervar: indStratList.jpm.vervar
})
.then(
    (resp) =>{
        if(resp.status == 'OK')
            if(resp["data-availability"] == "available"){
               return convertData(resp, indStratList.jpm.vervar)
            }else return (resp)
        else return (resp)
    }
).catch(err => (err))

const getKetenagakerjaan = () => getDynData({
    domain: default_domain,
    var: indStratList.tpt.var,
    vervar: indStratList.tpt.vervar
})
.then(
    (resp) =>{
        if(resp.status == 'OK')
            if(resp["data-availability"] == "available"){
               return convertData(resp, indStratList.tpt.vervar)
            }else return (resp)
        else return (resp)
    }
).catch(err => (err))

const getIPM = () => getDynData({
    domain: default_domain,
    var: indStratList.ipm.var,
    vervar: indStratList.ipm.vervar
})
.then(
    (resp) =>{
        if(resp.status == 'OK')
            if(resp["data-availability"] == "available"){
               return convertData(resp, indStratList.ipm.vervar)
            }else return (resp)
        else return (resp)
    }
).catch(err => {return (err)})

const getPDRBHK = ()=>{
    return getDynData({
        domain: default_domain,
        var: indStratList.pdrbHB.var,
        vervar: indStratList.pdrbHB.vervar
    }).then(resp => {
        if(resp.status == 'OK')
            if(resp["data-availability"] == "available"){
                return convertData(resp, indStratList.pdrbHB.vervar)
            }else return resp
        else return resp
    })
}

const getPDRBHB = ()=>{
    return getDynData({
        domain: default_domain,
        var: indStratList.pdrbHK.var,
        vervar: indStratList.pdrbHK.vervar
    }).then(resp => {
        if(resp.status == 'OK')
            if(resp["data-availability"] == "available"){
                return convertData(resp, indStratList.pdrbHK.vervar)
            }else return resp
        else return resp
    })
}

exports.getPDRBHK = getPDRBHK
exports.getPDRBHB = getPDRBHB
exports.getJumlahPenduduk = getJumlahPenduduk
exports.getJumlahPendudukMiskin = getJumlahPendudukMiskin
exports.getIPM = getIPM
exports.getKetenagakerjaan = getKetenagakerjaan
exports.getSexRatio = getSexRatio
exports.getAll = getAll