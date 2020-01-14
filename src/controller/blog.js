const { exec } = require('../db/mysql')

const getList = (author, keyword) => {
    let sql = `select * from blogs where 1=1 ` //占位，防止后面没有值
    if (author) {
        sql += `and author='${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`

    // 返回promise
    return exec(sql);
}

const getDetail = (id) => {
    return {
        id: 1,
        title: '标题A',
        content: '内容A',
        createTime: 1578902338571,
        author: 'zhanghsan'
    }

}

const newBlog = (blogData = {}) => {

}

const updateBlog = (id, blogData = {}) => {

}

const delBlog = (id) => {
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}