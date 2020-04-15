import { myworks } from "../../utils/myworks"

const app = getApp();
Page({
  data: {
    navHeight: app.globalData.navHeight,
    navData: {
      propTitle: "我的项目",   //导航栏标题
      propTitleColor: "#fff",   //导航栏标题颜色
      propIconColor: "#fff",   //导航栏左上角icon颜色
      propHome: false,   //是否首页
      propIsBackImg: false,   //是否需要展示背景图
      propBack: "#3dcaff"   //背景颜色或者背景图
    },
    cursearch: "",
    curdrop: 0,
    dropList: ['请选择类型', '小程序', '移动端', 'PC端', 'H5页面'],
    worksList: [],
    typeObj: {
      1: "小程序",
      2: "移动端",
      3: "PC端",
      4: "H5页面"
    }
  },
  onLoad: function (options) {   //页面加载完成
    let { type } = options;
    console.log("当前类型为------", type);
  },
  onReady: function () {  //页面初次渲染完成

  },
  onShow: function () {  //监听页面显示
    this.getListData('all');
  },
  onHide: function () {  //监听页面隐藏
    
  },
  bindPickerChange: function (e) {    //下拉框值变动时查询
    this.setData({ curdrop: e.detail.value });
    this.getListData();
  },
  bindinput(e) {   //输入框值变动时查询
    let { value } = e.detail;
    this.setData({ cursearch: value });
    this.getListData();
  },
  closeInput() {    //清空输入框
    this.setData({ cursearch: "" });
    this.getListData('all');
  },
  getListData(isAll) {   //组装数据
    if (!myworks || !myworks.length){
      this.setData({ worksList: [] });
      return;
    }

    if (isAll){   //第一次加载或者清空时展示全部数据
      this.setData({ worksList: myworks });
      return;
    }

    //过滤数据
    let { curdrop, cursearch } = this.data;
    let newArr = myworks.reduce((arr, current) => {
      if (+curdrop){
        if (curdrop == current.type){
          if (cursearch){
            if (current.name.toLocaleLowerCase().indexOf(cursearch.toLocaleLowerCase()) != -1){
              arr.push(current);
            }
          }else {
            arr.push(current);
          }
        }

      }else {
        if (cursearch){
          if (current.name.toLocaleLowerCase().indexOf(cursearch.toLocaleLowerCase()) != -1){
            arr.push(current);
          }
        }else {
          arr.push(current);
        }
      }
      return arr;
    }, []);
    this.setData({ worksList: newArr });
  }

})