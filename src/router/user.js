const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { set } = require('./../db/redis')


const handleUserRouter = (req, res) => {
    const method = req.method;
    const url = req.url;
    const path = url.split('?')[0]

    // 登录

    // 登录 POST
    if (method === 'POST' && req.path === '/api/user/login') {
        const { username, password } = req.body
        const result = login(username, password)
        return result.then(data => {
            if (data.username) {
                req.session.username = data.username
                // update redis
                set(req.sessionId, req.session)
                return new SuccessModel()
            }
            return new ErrorModel('登录失败')
        })
    }

    if (method === 'GET' && path === '/api/user/login') {
        // const { username, password } = req.body
        const { username, password } = req.query
        const result = login(username, password)
        return result.then(data => {
            if (data.username) {
                // 操作cookie,path=/是对所有路由都生效
                // res.setHeader('Set-Cookie', `username=${data.username};path=/; httpOnly; expires=${getCookieExpires()}`)
                //设置session
                req.session.username = data.username
                // update redis
                set(req.sessionId, req.session)

                return new SuccessModel()
            } else {
                return new ErrorModel('登录失败')
            }
        })
    }

    // 登录验证的测试
    if (method === 'GET' && path === '/api/user/login-test') {
        console.log(req.session)
        if (req.session && req.session.username) {
            return Promise.resolve(new SuccessModel({
                session: req.session
            }));
        }
        return Promise.resolve(new ErrorModel('尚未登录'))

    }
}

module.exports = handleUserRouter;
