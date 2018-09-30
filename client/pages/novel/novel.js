Page({
  data:{
    novelData:[]
  },
  onLoad:function(){
    wx.setNavigationBarTitle({
      title: '小说'
    })
    this.getNovelData();
  },
  getNovelData(){
    var that = this;
    wx.request({
      url: 'https://www.apiopen.top/novelApi',
      success(res) {
        console.log(res)
        if (res.statusCode === 200) {
          var data = res.data.data;
          
          that.setData({
            novelData: data
          })
        }
      }
    })
  }
})