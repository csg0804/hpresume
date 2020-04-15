import { goWhere } from "../../utils/util"

const app = getApp();
Page({
  data: {
    navHeight: app.globalData.navHeight,
    navData: {
      propTitle: "个人中心",   //导航栏标题
      propTitleColor: "#fff",   //导航栏标题颜色
      propIconColor: "#fff",   //导航栏左上角icon颜色
      propHome: false,   //是否首页
      propIsBackImg: false,   //是否需要展示背景图
      propBack: "#3dcaff"   //背景颜色或者背景图
    },
  },
  onLoad: function (options) {   //页面加载完成
    
  },
  onReady: function () {  //页面初次渲染完成

  },
  onShow: function () {  //监听页面显示
    
  },
  onHide: function () {  //监听页面隐藏
    
  },
  toconcernFun(e) {    //跳转到对应页面
    let { menu } = e.currentTarget.dataset;
    let pathObj = {
      1: "/child-infos/pages/myinfo/myinfo",
      2: "/child-infos/pages/experience/experience",
      3: "/pages/works/works"
    }
    goWhere(pathObj[menu]);
  }

})