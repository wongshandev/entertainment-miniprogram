const request = require("superagent");
var getRandomColor = function () {
  return '#' +
    (function (color) {
      return (color += '0123456789abcdef'[Math.floor(Math.random() * 16)])
        && (color.length == 6) ? color : arguments.callee(color);
    })('');
} 
module.exports = async ctx => {
  const page = ctx.request.query.page - 0;
  const res = await request.get("https://www.apiopen.top/femaleNameApi").query({ "page": page });
  const data = JSON.parse(res.text);
  const msg = data.data.map(item=>{
    item.color = getRandomColor();
    return item;
  })
  ctx.state.data = {
    msg: msg
  }
}