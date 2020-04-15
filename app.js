import moment from '/utils/moment.min'
import { toPx } from "/utils/index"
App({
  onLaunch: function (option) {
    // 顶部高度: 状态栏高度 + 胶囊按钮高度 + 胶囊按钮上下边距
    let _hei = 0;
    let _barHeigth = wx.getSystemInfoSync()['statusBarHeight'] || 0;   //状态栏高度
    let _titleFont = wx.getSystemInfoSync()['fontSizeSetting'];
    let _menueBtnTop = wx.getMenuButtonBoundingClientRect() || {height: 32, top: 26 };   //获取胶囊按钮的信息(默认iphone的: 高度32px + 上下边距12px)

    let { height, top } = _menueBtnTop;   //top: 到屏幕顶部的距离(包括状态栏高度)
    _hei = _barHeigth + height + (top - _barHeigth)*2;

    this.globalData.menueBtnTop = _menueBtnTop;
    this.globalData.navHeight = _hei;
    this.globalData.defaultFont = _titleFont;
    console.log("当前状态栏的高度------" + this.globalData.navHeight);
    console.log("胶囊按钮信息-----", wx.getMenuButtonBoundingClientRect());
    console.log("默认字体大小------" + this.globalData.defaultFont);

    // 判断是否由分享进入小程序
    if (option.scene == 1007 || option.scene == 1008) {
      this.globalData.isShare = true
    } else {
      this.globalData.isShare = false
    }

    //计算首页 波浪canvas距离顶部的top   父级节点高度：350rpx   canvas高度60px
    this.globalData.canvasTop = toPx(350) - 60 + this.globalData.navHeight;

    //设置全局moment
    moment.locale('en', {
      longDateFormat: {
        l: "YYYY-MM-DD",
        L: "YYYY-MM-DD HH:mm"
      }
    });
    wx.$moment = moment;
  },
  onShow() {
    this.upDateApp();
  },
  upDateApp() {   //更新小程序
    console.log("检查更新");
    if (!wx.canIUse('getUpdateManager')){   // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({ title: '提示', content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。' });
      return;
    }
    const updateManager = wx.getUpdateManager();
    updateManager.onCheckForUpdate((res) => {
      if (!res.hasUpdate) return;   //没有新版本
      updateManager.onUpdateReady(function () {
        wx.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success: function (res) {
            if (res.confirm) {  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate()
            }
          }
        })
      });
      updateManager.onUpdateFailed(function () {   // 新的版本下载失败
        wx.showModal({ title: '已经有新版本了哟~', content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~' });
      })
    })
  },
  globalData: {
    isShare: false, // 分享默认为false
    navHeight: 0, // 顶部高度: 状态栏高度 + 胶囊按钮高度 + 胶囊按钮上下边距
    menueBtnTop: {},   //胶囊按钮信息: 高度、距离顶部高度
    defaultFont: 28,   //默认字体大小
    canvasTop: 0    //首页波浪canvas的距离顶部的top
  }
})