Page({
  onLoad(){
    wx.request({
      url:"https://ls1016421.top/article/ids",
      success(res){
        console.log(res)
      }
    })
  }
})