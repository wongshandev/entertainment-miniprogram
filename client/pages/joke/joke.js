Page({
  data:{
    jokeData:[]
  },
  onLoad(){
    wx.setNavigationBarTitle({
      title: '段子'
    })
    this.getJokeData();
  },
  getJokeData(){
    var that = this;
    wx.request({
      url: 'https://www.apiopen.top/satinApi?type=1&page=1',
      success(res) {
        console.log(res)
        if (res.statusCode === 200) {
          var data = res.data.data;
          that.setData({
            jokeData: data
          })
        }
      }
    })
  }  
})