const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
    const method = req.method;
    const url = req.url;
    const id = req.query.id
    const path = url.split('?')[0]

    //获取博客列表
    if (method === 'GET' && path === '/api/blog/list') {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        // const listData = getList(author, keyword)
        // return new SuccessModel(listData)
        const result = getList(author, keyword)
        // 返回一个promise
        return result.then(listData => {
            return new SuccessModel(listData)
        })
    }

    //获取博客详情
    if (method === 'GET' && path === '/api/blog/detail') {
        const result = getDetail(id)
        return result.then(data => {
            return new SuccessModel(data)
        })
    }

    //新建博客
    if (method === 'POST' && path === '/api/blog/new') {
        req.body.author = 'zhangsan'  // 假数据
        const result = newBlog(req.body)
        return result.then(data => {
            return new SuccessModel(data)
        })
    }

    //更新博客
    if (method === 'POST' && path === '/api/blog/update') {
        return {
            msg: '更新博客接口'
        }
    }

    //删除博客
    if (method === 'POST' && path === '/api/blog/del') {
        return {
            msg: '删除博客接口'
        }
    }
}

module.exports = handleBlogRouter;