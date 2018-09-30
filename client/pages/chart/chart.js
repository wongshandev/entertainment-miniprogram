var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
Page({
  data:{
    chartData:[],
    page:1,
    moreLoading:false,
    windowHeight:0,
    scrollTop:0,
    refresh:false
  },
  onLoad(){
    wx.setNavigationBarTitle({
      title: '萌妹子~'
    });
    this.getChartData();
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight
        })
        console.info(res);
     
      }
    }); 
  },
  getChartData(){
    var that = this;
    wx.request({
      url: "https://ls1016421.top/chart",
      data:{
        page:that.data.page
      },
      success:res=>{
          var data = res.data.data.msg;
          that.setData({
            chartData: data,
            moreLoading:false
          })
        if(that.data.refresh){
          that.setData({
            refresh:false
          })
        }
      },
      fail:err=>{
        console.log(err);
      }

    })
  },
  lower(){
    this.setData({
      page: this.data.page+1,
      moreLoading:true
    });
    setTimeout(_ => {
      this.getChartData();
    }, 500)
  },
  upper(){
    this.setData({
      refresh:true,
      page:1
    });
    setTimeout(_=>{
      this.getChartData();
    },500)
  },
  scroll: function (event) {
    this.setData({
      scrollTop: event.detail.scrollTop
    });
  },
  handleLongTap(e){
    const url = "https://ls1016421.top/download?url=" + e.target.dataset.url
    wx.request({
      url: url,
      success(res){
        console.log("res",res)
        const newUrl = res.data;
        wx.downloadFile({
          url: newUrl, //仅为示例，并非真实的资源
          success: function (res) {
            // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
            if (res.statusCode === 200) {
              wx.playVoice({
                filePath: res.tempFilePath
              })
            }
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success:
                function (data) {
                  console.log(data);
                  wx.showModal({
                    title: '下载成功',
                    content: '下载成功',
                  })
                },
            })
          }
        })
      }
    })

  }
})