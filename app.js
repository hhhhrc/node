const queryString = require('querystring')
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');

//session数据
const SESSISON_DATA = {}

// 获取cookie过期时间
const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 20 * 60 * 1000))
    console.log(d.toGMTString())
    return d.toGMTString()
}

//用于处理post data
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
    console.log('刚进来的时候', SESSISON_DATA);
    // 设置返回格式
    res.setHeader('Content-type', 'application/json')

    //获取path
    const url = req.url;
    const path = url.split('?')[0]

    //解析query
    req.query = queryString.parse(url.split('?')[1])

    // 解析cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || ''  // k2=v1;k2=v2..
    cookieStr.split(';').forEach(item => {
        if (!item) {
            return
        } else {
            const arr = item.split('=')
            const key = arr[0].trim()
            const val = arr[1].trim()
            req.cookie[key] = val
        }
    })

    //解析session
    let needSetCookie = false
    let userId = req.cookie.userid
    if (userId) {
        if (!SESSISON_DATA[userId]) {
            SESSISON_DATA[userId] = {}
        }
    } else {
        // cokkie中没有userid，需要set进去一个
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}`   //随机数
        // 给SESSISON_DATA这一项设为{}
        SESSISON_DATA[userId] = {}
    }
    // 如果没登录，req.session = {},如果登录了，这里就把这个userId的值赋给req.session，并以此作为是否登录标志位
    req.session = SESSISON_DATA[userId]


    getPostData(req).then(postData => {
        req.body = postData
        //处理blog
        const blogResult = handleBlogRouter(req, res)
        if (blogResult) {
            blogResult.then(blogData => {
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `userid=${userId};path=/; httpOnly; expires=${getCookieExpires()}`)
                }
                res.end(
                    JSON.stringify(blogData)
                )
            })
            return
        }

        //处理user
        const userResult = handleUserRouter(req, res)
        if (userResult) {
            userResult.then(userData => {
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `userid=${userId};path=/; httpOnly; expires=${getCookieExpires()}`)
                }
                res.end(
                    JSON.stringify(userData)
                )
            })
            return
        }

        // 未命中，404,纯文本
        res.writeHead(404, { 'content-type': 'text/plain' });
        res.write('404 not found');
        res.end()
    })

}

module.exports = serverHandle