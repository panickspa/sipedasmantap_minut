/* private constant */
const default_domain = "7106"
const currentDate = new Date()
const version = "v1"

/* exported constant */
const apiKey = "23b53e3e77445b3e54c11c60604350bf"
const defaultImage = require('../images/default.png')
const defaultLogo = require('../images/ico.png')
const defaultLogoDark = require('../images/ico_dark.png')
const defaultBPS = require('../images/bpsminut.png')
const defaultBPSDark = require('../images/bpsminut_dark.png')
const splashLogo = require('../images/splash.png')

/* private method */
const optVal = (e=['keyword', 'some keyword']) => e[1] ? `${e[0]}/${e[1]}/` : ''

const optValNum = (e=['var_id', 1] ) => e[1] > -1 ? `${e[0]}/${e[1]}/` : ''

/* exported method */
const getPressReleaseDetail = (domain,id) => fetch(
    `https://webapi.bps.go.id/${version}/api/view/domain/${domain}/model/pressrelease/lang/ind/id/${id}/key/${apiKey}/`
).then(resp => resp.json())

const getPressReleaseList = (req = {
    domain: default_domain,
    page: 1,
}) => fetch(
    `https://webapi.bps.go.id/${version}/api/list/model/pressrelease/lang/ind/domain/${req.domain}/${optValNum(['page', req.page])}key/${apiKey}/`
).then(resp => resp.json())

const getInfografis = (req = {
    domain: default_domain,
    page: 0,
    keyword: ''
}) => fetch(`https://webapi.bps.go.id/${version}/api/list/model/infographic/lang/${
    req.lang ? req.lang : "ind"
    }/domain/${
        req.domain
    }/${
        optVal(['page', req.page])
    }${
        optVal(['keyword', req.keyword])
    }key/${apiKey}/`).then(resp => resp.json())

const getIndikatorStrategis = (req={
    domain: default_domain,
    page: 0,
}) => fetch(
    `https://webapi.bps.go.id/${version}/api/list/model/indicators/lang/ind/domain/${req.domain}/${
        optVal(['page', req.page])
    }key/${apiKey}/`
).then(resp => resp.json())

const getDynData = (req={
    domain: default_domain,
    var: '',
    turvar: 0,
    vervar: 0,
    th: 0,
    turth: 0
}) => fetch(`https://webapi.bps.go.id/${version}/api/list/model/data/lang/ind/domain/${req.domain}/var/${req.var}/${
    optVal(['turvar', req.turvar])
}${
    optVal(['vervar', req.vervar])
}${
    optVal(['th', req.th])
}${
    optVal(['turth', req.turth])
}key/${apiKey}/`).then((r)=>r.json())

const getVar = (req={
    domain: default_domain,
    page: 0,
    year: currentDate.getFullYear(),
    area: '',
    vervar: '',
    subject: 0
}) => fetch(`https://webapi.bps.go.id/${version}/api/list/model/var/domain/${req.domain}/${
    req.subject ? `subject/${req.subject}/` : ''
}${
    optVal(['page', req.page])
}${
    optVal(['year', req.year])
}${
    optVal(['area', req.area])
}${
    optVal(['vervar', req.vervar])
}key/${apiKey}/`).then(r => r.json())

const getVervar = (req={
    domain: default_domain,
    var: '',
    page: 0
}) => fetch(`https://webapi.bps.go.id/${version}/api/list/model/vervar/domain/${req.domain}/${
    optVal(['var', req.var])
}${
    optVal(['page', req.page])
}key/${apiKey}/`).then(r => r.json())

const getPeriodData = (req = {
    domain: default_domain,
    var: '',
    page: 0
}) => fetch(`https://webapi.bps.go.id/${version}/api/list/model/th/domain/${req.domain}/${
    optVal(['var', req.var])
}${
    optVal(['page', req.page])
}key/${apiKey}/`).then(r => r.json())

const getDerPeriodData = (req={
    domain: default_domain,
    var: '',
    page: 0
})=>fetch(`https://webapi.bps.go.id/${version}/api/list/model/turth/domain/${req.domain}/${
    optVal(['var', req.var])
}${
    optVal(['page', req.page])
}key/${apiKey}/`).then(r => r.json())

const getDerVar = (req = {
    domain: default_domain,
    var: '',
    page: 0
})=>fetch(
    `https://webapi.bps.go.id/${version}/api/list/model/turvar/domain/${req.domain}/${
        optVal(['var', req.var])
    }${
        optVal(['page', req.page])
    }key/${apiKey}/`
)

const getSubject = (req={
    domain: default_domain,
    lang: 'ind',
    subcat: '',
    page: 0
})=> fetch(`https://webapi.bps.go.id/${version}/api/list/model/subject/domain/${req.domain}/${
    optVal(['lang', req.lang])
}${
    optValNum(['subcat', req.subcat])
}${
    optVal(['page', req.page])
}key/${apiKey}/`).then(r => r.json())

const getSubCat = (req={
    domain: default_domain,
    lang: 'ind',
    page: 0,
})=>fetch(
    `https://webapi.bps.go.id/${version}/api/list/model/subcat/domain/${req.domain}/${
        optVal(['lang', req.lang])
    }${
        optVal(['page', req.page])
    }key/${apiKey}`
).then(r => r.json())

const getPublication = (req={
    domain: default_domain,
    lang: 'ind',
    page: 0,
    month: '',
    year: '',
    keyword: ''
})=> fetch(
    `https://webapi.bps.go.id/v1/api/list/model/publication/domain/${req.domain}/${
        optVal(['page', req.page])
    }${
        optVal(['lang', req.lang])
    }${
        optVal(['month', req.month])
    }${
        optVal(['year', req.year])
    }${
        optVal(['keyword', req.keyword])
    }key/${apiKey}`
).then(resp => resp.json())

const getDetPublication = (req={
    domain: default_domain,
    lang: 'ind',
    id: 'REQUIRED'
}) => fetch(`https://webapi.bps.go.id/v1/api/view/model/publication/domain/${req.domain}/lang/${req.lang}/id/${req.id}/key/${apiKey}/`)
.then(resp => resp.json())


const Api = {
    /* constant */
    apiKey: apiKey,
    defaultImage : defaultImage,
    default_domain: default_domain,
    /* method */
    getPressReleaseDetail: getPressReleaseDetail,
    getPressReleaseList: getPressReleaseList,
    getInfografis : getInfografis,
    getIndikatorStrategis : getIndikatorStrategis,
    getDynData : getDynData,
    getVar : getVar,
    getVervar : getVervar,
    getPeriodData : getPeriodData,
    getDerPeriodData : getDerPeriodData,
    getDerVar : getDerVar,
    getSubCat : getSubCat,
    getSubject : getSubject,
}

const Methods = {
    getPressReleaseDetail: getPressReleaseDetail,
    getPressReleaseList: getPressReleaseList,
    getInfografis : getInfografis,
    getIndikatorStrategis : getIndikatorStrategis,
    getDynData : getDynData,
    getVar : getVar,
    getVervar : getVervar,
    getPeriodData : getPeriodData,
    getDerPeriodData : getDerPeriodData,
    getDerVar : getDerVar,
    getSubCat : getSubCat,
    getSubject : getSubject,
    getPublication : getPublication,
    getDetPublication : getDetPublication
}

const Constant = {
    apiKey: apiKey,
    defaultImage : defaultImage,
    default_domain: default_domain,
}

/* Element */
exports.apiKey = apiKey
exports.getPressReleaseDetail = getPressReleaseDetail
exports.getPressReleaseList = getPressReleaseList
exports.default_domain = default_domain
exports.getInfografis = getInfografis
exports.defaultImage = defaultImage
exports.defaultBPS = defaultBPS
exports.splashLogo = splashLogo
exports.defaultBPSDark = defaultBPSDark
exports.defaultLogo = defaultLogo
exports.defaultLogoDark = defaultLogoDark
exports.getIndikatorStrategis = getIndikatorStrategis
exports.getDynData = getDynData
exports.getVar = getVar
exports.getVervar = getVervar
exports.getPeriodData = getPeriodData
exports.getDerPeriodData = getDerPeriodData
exports.getDerVar = getDerVar
exports.getSubCat = getSubCat
exports.getSubject = getSubject
exports.getPublication = getPublication
exports.getDetPublication = getDetPublication

/* Bundle */
exports.Methods = Methods
exports.Constant = Constant


/* Export All */
// export default Api;