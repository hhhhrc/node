const http = require('http')
const queryString = require('querystring')

// const server = http.createServer((req, res) => {
//     console.log('mothod:', req.method)
//     const url = req.url;
//     console.log('url:', url)
//     req.query = queryString.parse(url.split('?')[1]);
//     console.log('query:', req.query);
//     res.end(
//         JSON.stringify(req.query)
//     )
// })

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        console.log('req cntent-type', req.headers['content-type']);
        // 接收数据
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString();
        })
        req.on('end', () => {
            console.log('postData:', postData)
            res.end('hello！')
        })
    }
})

server.listen(8000)
console.log('ok')