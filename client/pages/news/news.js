var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
Page({
  data:{
    newsData:[1,2],
    wether:{},
    page:1,
    pageSize:5,
    moreLoading:false,
    noMore:false
  },
  onReachBottom(){
    this.setData({
      moreLoading: true,
      page:this.data.page + 1
    });
    setTimeout(_=>{
      this.getNewsData();
    },500)
  },
  onLoad:function(){
    wx.setNavigationBarTitle({
      title: '娱乐一下'
    })
    this.getNewsData();
    this.getLocation();
  },
  getNewsData:function(){
    if(this.data.page===1){
      wx.showLoading();
    }
      var that = this;
    wx.request({
      url: "https://ls1016421.top/news", //仅为示例，并非真实的接口地址
      data: {
        page: that.data.page,
        pageSize: that.data.pageSize
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        const data = res.data.data;
        if (data.success) {
          that.setData({
            newsData: data.msg,
            moreLoading: false,
            noMore: data.noMore
          });
        } else {
          that.setData({
            newsData: [],
            moreLoading: false,
            noMore: data.noMore
          });
        }

        wx.hideLoading();
      }
    })
    // wx.request({
    //   url: "https://ls1016421.top/news",
    //   data: {
    //     page:that.data.page,
    //     pageSize:that.data.pageSize
    //   },
    //   success: res => {
    //     const data = res.data.data;
    //     if(data.success){
    //       that.setData({
    //         newsData: data.msg,
    //         moreLoading: false,
    //         noMore:data.noMore
    //       });
    //     }else{
    //       that.setData({
    //         newsData: [],
    //         moreLoading: false,
    //         noMore: data.noMore
    //       });
    //     }
        
    //     wx.hideLoading();
    //   },
    //   fail: err => {
    //     console.error(err)
    //     util.showModel('网络错误', err.message);
    //     wx.hideLoading();
    //   }
    // })
    },
    getLocation(){
      wx.getLocation({
        type: 'gcj02',
        success: function (res) {
          console.log(res)
          var latitude = res.latitude
          var longitude = res.longitude
          var speed = res.speed
          var accuracy = res.accuracy
        }
      })
    },
  handleTap(e){
    // const link = e.currentTarget.dataset.link
    // wx.navigateTo({ url:"/pages/webView/webView?link="+link})
  },
  onPullDownRefresh: function () {
    this.setData({
      page:1
    })
    wx.stopPullDownRefresh();
    this.getNewsData();
  }
})