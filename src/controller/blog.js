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
    const sql = `select * from blogs where id='${id}'`
    return exec(sql).then(rows => {
        return rows[0];
    });
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