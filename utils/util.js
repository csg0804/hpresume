export function goWhere(url, isRedirect) {
  const filtersArr = ['/pages/index/index', '/pages/works/works', '/pages/my/my']
  let isTab = filtersArr.indexOf(url) > -1;
  if (!(/^\//.test(url))) url = `/${url}`;

  if (!isRedirect) {
    if (isTab) {
      wx.switchTab({ url })
    } else {
      wx.navigateTo({
        url: url,
        fail() {
          wx.redirectTo({ url })
        }
      })
    }
  } else {
    if (isTab) {
      wx.switchTab({
        url
      })
    } else {
      wx.redirectTo({ url })
    }
  }
}
