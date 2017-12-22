let globalVueFilter = () => {
  // 时间
  Vue.filter('datetime', function (value) {
    var val
    if (typeof value === 'number') {
      val = value.toString()
    }
    if (val.length === 14) {
      return val.slice(0, 4) + '-' + val.slice(4, 6) + '-' + val.slice(6, 8)
    } else if (val.length === 13) {
      return new Date(value).Format('yyyyMMddhhmmss')
    }
    return val
  })
}
export default globalVueFilter
