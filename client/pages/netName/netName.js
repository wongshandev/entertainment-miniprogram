var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
Page({
  data:{
    page:1,
    nameList:[],
    swiperList:[],
    windowHeight:0
  },
  onLoad(){
    wx.setNavigationBarTitle({
      title: '个性网名'
    });
    this.initList();
    this.getNetNameData();
    this.getWindowHeight();
  },
  getWindowHeight(){
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        that.setData({
          windowHeight: res.windowHeight
        })
      }
    }); 
  },
  initList(){
    const swiperList = Array.from({ length: 100 }, (v, k) => k);
    this.setData({
      swiperList
    })
  },
  getNetNameData(){
    var that = this;
    wx.request({
      url:"https://ls1016421.top/netName",
      data:{
        page:that.data.page
      },
      success(res){
        const data = res.data.data.msg;
        console.log(data)
        that.setData({
          nameList: data
        })
      },
      fail(res){
        console.log(res)
      }
    })
  },
  handleChange(event){
    const page = event.detail.current;
    this.setData({page})
    this.getNetNameData();
  }
})