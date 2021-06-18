const date = new Date()
const earliestYear = 2006
const currentYear = () => {
    return Number(date.getFullYear())
}
const years = Array.apply(null, {length: (currentYear()-earliestYear+1)}).map((e, i) => (currentYear()-i))
const months = [
    'Semua',
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember'
]

exports.years = years
exports.months = months