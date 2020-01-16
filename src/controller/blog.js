const { exec } = require('../db/mysql')

const getList = (author, keyword) => {
    const sql = `select * from blogs where 1=1 ` //占位，防止后面没有值
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
    // blogData是一个博客对象，包含title content author属性
    const title = blogData.title;
    const content = blogData.content;
    const author = blogData.author;
    const createtime = Date.now();
    const sql = `insert into blogs (title,content,createtime,author)
                values ('${title}','${content}',${createtime},'${author}')`
    return exec(sql).then(insertData => {
        return {
            id:insertData.insertId
        }
    })
}

const updateBlog = (id, blogData = {}) => {
    // blogData是一个博客对象，包含title content author属性
    const title = blogData.title;
    const content = blogData.content;
    const sql = `update blogs set title='${title},content=${title}' where id = ${id}`;
    // return exec(sql).then(upDateData => {
    //     return {
    //         id: upDateData.insertId
    //     }
    // })
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