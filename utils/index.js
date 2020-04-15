const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

export const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

/**
 * 手机号码校验
 * @param {*number} phone 传入手机号码
 * @return {*number} 返回结果
 */
export const checkPhone = (phone) => {
  return /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/.test(phone);
}

/**
 * 手机号码每4位增加隔开
 * @param {*number} ph 传入手机号码
 * @return {*number} 返回结果
 */
export const formatPhone = (ph) => {
  //13430720942  ===>  134 3072 0942
  let formatPH = "--"
  if (ph) {
    formatPH = (ph + "").replace(/(\d{3})(\d{4})/, "$1 $2 ");
  }
  return formatPH;
}

/**
 * 判断展示的距离是米还是千米
 * @param {*number} value 传入初始数据 单位米
 * @return {*number} 返回结果
 */
export const distanceFun = (value) => {
  if (!value || !+value ) return "--km";
  
  if (+value < 100){
    return +(value.toFixed(1)) + "m";
  }else if (+value >= 100){
    return +((value/1000).toFixed(1)) + "km";
  }
}

/**
 * 除法
 * @param {*number} arg1 传入被除数
 * @param {*number} arg2 传入除的倍数
 * @return {*number} 返回结果
 */
export const accDiv = (arg1, arg2, it = 0) => {
  if (!arg1) { return 0; }
  var t1 = 0, t2 = 0, r1, r2;
  try { t1 = arg1.toString().split(".")[1].length } catch (e) { }
  try { t2 = arg2.toString().split(".")[1].length } catch (e) { }


  r1 = Number(arg1.toString().replace(".", ""))
  r2 = Number(arg2.toString().replace(".", ""))
  var _val = (r1 / r2) * Math.pow(10, t2 - t1);
  return it == 1 ? _val.toFixed(2) : _val
}

/**
 * 数据展示：大于10000展示： 10.32w,  10.88E（亿）
 * @param {*number} value 传入的数据
 * @return {*number} 返回结果
 */
export const numberExchange = (value) => {
  if (!value && value != 0) return "--";
  value = +value;
  if (value >= 100000000){
    return +((value/100000000).toFixed(2)) + "E";
  }else if (value >= 10000){
    return +((value/10000).toFixed(2)) + "w";
  }else {
    return +value;
  }
}

/**
 * px转rpx
 * @param {*number} arg1 传入px数值
 */
export const toRpx = (px) => {
  let { screenWidth } = wx.getSystemInfoSync();
  let factor = screenWidth / 750;
  return px ?( px / factor) : 0;
}


/**
 * rpx转px
 * @param {*number} arg1 传入rpx数值
 */
export const toPx = (rpx) => {
  let { screenWidth } = wx.getSystemInfoSync();
  let factor = screenWidth / 750;
  return rpx ? (rpx * factor) : 0;
}

