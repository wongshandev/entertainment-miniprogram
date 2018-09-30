Component({
  data:{
    wether:[]
  },
  attached: function () { 
    this.getWether();
  },
  methods:{
    getWether() {
      var that = this;
      wx.request({
        url: 'https://www.apiopen.top/weatherApi',
        data: {

        },
        success(res) {
         
          if (res.statusCode === 200) {
            var data = res.data.data.forecast;
            console.log(data)
            that.setData({
              wether: data
            })
          }
        }
      })
    },
  }
})