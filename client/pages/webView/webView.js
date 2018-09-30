const utils = require("../../utils/util.js")
Page({
  data: {
    link: ''
  },
  onLoad: function () {
    wx.showLoading();
    const page = utils.getCurrentPageUrl();
    const options = page.options;
    console.log(options);
    this.setData({
      link:"https://ls1016421.top?link="+options.link
    })
    console.log("onLoad")
  },
  onReady:function(){
    wx.hideLoading();
    console.log("onReady")
  }
})