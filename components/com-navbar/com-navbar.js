const app = getApp();
Component({
  data: {
    navHeight: '',
    contentHeight: "",  //标题、按钮等外部高度
    navTop: "",  //标题栏距离顶部高度top
    defaultFont: "",   //设备默认字体大小
    showToHome: false,    //第一次进入的页面不是首页时，展示回到首页按钮
    isTab: false
  },
  properties: {   //传入的属性列表
    /*
    *  propTitle: "",   //导航栏标题
    *  propTitleColor: "#fff",   //导航栏标题颜色
    *  propIconColor: "#666",   //导航栏左上角icon颜色
    *  propHome: false,   //是否首页
    *  propIsBackImg: true,   //是否需要展示背景图
    *  propBack: ""   //背景颜色或者背景图
    */ 
    navData: {
      type: Object,
      value: {}
    }
  },
  attached() {
    let { navHeight, defaultFont } = app.globalData;
    let { height, top } = app.globalData.menueBtnTop;
    this.setData({ navHeight, contentHeight: height, navTop: top, defaultFont, ...this.data.navData });

    //判断第一次进入页面时是不是首页，不是首页要展示回到首页按钮
    let _ar = getCurrentPages();
    let tabBarObj = ['pages/index/index', 'pages/works/works', 'pages/my/my']
    this.setData({ isTab: tabBarObj.indexOf(_ar[_ar.length - 1].route) == -1 ? false : true });   //判断当前页面是否为tab页面

    if (!_ar || (_ar.length == 1 && tabBarObj.indexOf(_ar[0].route) == -1)){
      this.setData({ showToHome: true });
    }
    console.log("刚进入页面时页面栈-----", getCurrentPages());
  },
  methods: {
    topbtnFun() {  //点击顶部按钮
      let { propHome } = this.data.navData, _ar = getCurrentPages(), { showToHome } = this.data;
      console.log(_ar);

      if (propHome){   //在首页，跳转到个人信息页面
        wx.navigateTo({ url: "/child-infos/pages/myinfo/myinfo" });
        return;
      }

      if (showToHome){   //第一次进入的页面不是首页，跳转到首页去
        wx.switchTab({ url: "/pages/index/index" });
      }else {
        wx.navigateBack();
      }
    }
  }
})
