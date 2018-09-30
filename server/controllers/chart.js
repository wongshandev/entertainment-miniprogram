const request = require("superagent");
var dataArr = [];
module.exports = async ctx=>{
  const page = ctx.request.query.page - 0;
  if(page===1){
    dataArr = [];
  }
 const res = await request.get("https://www.apiopen.top/meituApi").query({"page":page});
  const data = JSON.parse(res.text);
 dataArr = dataArr.concat(data.data);
 ctx.state.data = {
   msg: dataArr
 }
}