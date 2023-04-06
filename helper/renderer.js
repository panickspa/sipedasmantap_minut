/* eslint-disable eqeqeq */
const renderValue = (val, unit) => {
  let e = replace(/\B(?=(\d{3})+(?!\d))/g, ' ').val.replace(/([.])+/g, ",");
  let rp = unit.search('Rupiah');
  return unit == 'Persen' ? `${e}%` : 
  rp == 0 ? `Rp. ${e},-` : rp > 0 ? `Rp. ${e} ${unit.substr(0, rp)}`  : `${e} ${unit != 'Tidak Ada Satuan' ? unit : ''}`;
};

const shortValue = (e) =>{
  return String(e).length > e
}

const renderCapitalOnly = val => {
  return val.replace(/([a-z\s])/g, '');
};

exports.renderValue = renderValue;
exports.renderCapitalOnly = renderCapitalOnly;
