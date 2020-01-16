const queryString = require('querystring')
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');

const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({})
            return
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }
            // console.log(postData);
            resolve(
                JSON.parse(postData)
            )
        })
    })
    return promise
}

const serverHandle = (req, res) => {
    // 设置返回格式
    res.setHeader('Content-type', 'application/json')

    //获取path
    const url = req.url;
    const path = url.split('?')[0]

    //解析query
    req.query = queryString.parse(url.split('?')[1])

    getPostData(req).then(postData => {
        req.body = postData
        //处理blog
        const blogResult = handleBlogRouter(req, res)
        if (blogResult) {
            blogResult.then(blogData => {
                res.end(
                    JSON.stringify(blogData)
                )
            })
            return
        }

        //处理user
        const userData = handleUserRouter(req, res)
        if (userData) {
            res.end(
                JSON.stringify(userData)
            )
            return
        }

        // 未命中，404,纯文本
        res.writeHead(404, { 'content-type': 'text/plain' });
        res.write('404 not found');
        res.end()
    })

}

module.exports = serverHandle