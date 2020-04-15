import { goWhere } from "../../utils/util"
import { myworks } from "../../utils/myworks"
import Wave from "../../utils/wave"

const app = getApp();
Page({
  data: {
    canvasTop: app.globalData.canvasTop,
    navHeight: app.globalData.navHeight,
    navData: {
      propTitle: "首页",   //导航栏标题
      propTitleColor: "#fff",   //导航栏标题颜色
      propIconColor: "#fff",   //导航栏左上角icon颜色
      propHome: true,   //是否首页
      propIsBackImg: false,   //是否需要展示背景图
      propBack: "#3dcaff"   //背景颜色或者背景图
    },
    myworks: [],
    circleData: []
  },
  onLoad: function (options) {   //页面加载完成
    Wave.render("#anicanvas", { height: 60 });    //启动波浪动画   离开页面时需要清除动画
    this.setCircleData();
  },
  onReady: function () {  //页面初次渲染完成

  },
  onShow: function () {  //监听页面显示
    
  },
  onHide: function () {  //监听页面隐藏
    
  },
  setCircleData() {   //设置圆环进度图的数据
    let obj = { mini: 0, mobile: 0, pc: 0, h5: 0, totol: myworks.length };
    myworks.forEach((item , index) => {
      let { type } = item;
      let { mini, mobile, pc, h5 } = obj;
      if (type == 1){
        obj.mini = ++mini;
      }else if (type == 2){
        obj.mobile = ++mobile;
      }else if (type == 3){
        obj.pc = ++pc;
      }else {
        obj.h5 = ++h5;
      }
    })

    let arr = [{ 
      id: "miniCanvas",
      className: "mini",
      type: 1,
      num: obj.mini,
      percent: (obj.mini / obj.totol)*100,
      color: "#00c0ef",
      info: "小程序",
    },{ 
      id: "mobileCanvas",
      className: "mobile",
      type: 2,
      num: obj.mobile,
      percent: (obj.mobile / obj.totol)*100,
      color: "#00a65a",
      info: "移动端"
    },{ 
      id: "pcCanvas",
      className: "pc",
      type: 3,
      num: obj.pc,
      percent: (obj.pc / obj.totol)*100,
      color: "#932ab6",
      info: "PC端"
    },{ 
      id: "h5Canvas",
      className: "h5",
      type: 4,
      num: obj.h5,
      percent: (obj.h5 / obj.totol)*100,
      color: "#ff9800",
      info: "H5页面"
    }]
    this.setData({ circleData: arr, myworks });
  }

})