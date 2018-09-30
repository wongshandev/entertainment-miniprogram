var request = require('superagent');
var dataArr = [];
async function fetchData() {
    var res = await request.get("https://www.apiopen.top/journalismApi");
    if (res.status === 200) {
        const data = JSON.parse(res.text);
        Object.values(data.data).forEach(item => {
            item.forEach(item2 => {
                dataArr.push(item2);
            })
        })
    }
}
fetchData();
module.exports = ctx => {
    const page = ctx.request.query.page - 0;
    const pageSize = ctx.request.query.pageSize - 0;
    const msg = dataArr.slice(0, page * pageSize);
    var noMore = false;
    if (msg.length === dataArr.length) {
        noMore = true
    }
    ctx.state.data = {
        msg,
        noMore,
        success: true
    }
}