/* private constant */
const default_domain = "7106"
const currentDate = new Date()
const version = "v1"

/* exported constant */
const apiKey = "23b53e3e77445b3e54c11c60604350bf"
const defaultImage = require('../images/default.png')

/* private method */
const optVal = (e=['page', 1]) => e[1] ? `${e[0]}/${e[1]}/` : ''

/* exported method */
const getPressReleaseDetail = (domain,id) => fetch(
    `https://webapi.bps.go.id/${version}/api/view/domain/${domain}/model/pressrelease/lang/ind/id/${id}/key/${apiKey}/`
)

const getPressReleaseList = (req = {
    domain: default_domain,
    page: 0,
}) => fetch(`https://webapi.bps.go.id/${version}/api/list/model/pressrelease/lang/ind/domain/${req.domain}/page/${optVal('page', req.page)}/key/${apiKey}/`)

const getInfografis = (req = {
    domain: default_domain,
    page: 0,
    keyword: ''
}) => {
    console.log(
        `https://webapi.bps.go.id/${version}/api/list/model/infographic/lang/${
    req.lang ? req.lang : "ind"
    }/domain/${
        req.domain
    }/${
        optVal(['page', req.page])
    }${
        optVal(['keyword', req.keyword])
    }key/${apiKey}/`
    )
    return fetch(`https://webapi.bps.go.id/${version}/api/list/model/infographic/lang/${
    req.lang ? req.lang : "ind"
    }/domain/${
        req.domain
    }/${
        optVal(['page', req.page])
    }${
        optVal(['keyword', req.keyword])
    }key/${apiKey}/`).then(resp => resp.json())}

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
}) => fetch(`https://webapi.bps.go.id/${version}/api/list/model/data/lang/ind/domain/${req.domain}/${
    optVal(['var', req.var])
}var/${req.var}/${
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
    vervar: ''
}) => fetch(`https://webapi.bps.go.id/${version}/api/list/model/var/domain/${req.domain}/${
    req.subject ? `subject/${req.subject}/` : ''
}${
    optVal(['page', req.page])
}${
    optVal(['year', req.year])
}${
    optVal(['area', req.area])
}${
    optVal(['vervar', reg.vervar])
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
    `https://webapi.bps.go.id/${version}/api/list/model/turvar/${req.domain}/${
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
})=>fetch(
    `https://webapi.bps.go.id/v1/list/model/subject/domain/${req.domain}/${
        optVal(['lang', req.lang])
    }${
        optVal(['subcat', req.subcat])
    }${
        optVal(['page', req.page])
    }key/${apiKey}/`
)
const getSubCat = (req={
    domain: default_domain,
    lang: 'ind',
    page: 0,
})=>fetch(
    `https://webapi.bps.go.id/v1/list/model/subcat/domain${req.domain}/${
        optVal(['lang', req.lang])
    }${
        optVal(['page', req.page])
    }key/${apiKey}`
)


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
exports.getIndikatorStrategis = getIndikatorStrategis
exports.getDynData = getDynData
exports.getVar = getVar
exports.getVervar = getVervar
exports.getPeriodData = getPeriodData
exports.getDerPeriodData = getDerPeriodData
exports.getDerVar = getDerVar
exports.getSubCat = getSubCat
exports.getSubject = getSubject

/* Bundle */
exports.Methods = Methods
exports.Constant = Constant


/* Export All */
// export default Api;