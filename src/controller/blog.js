const getList = (author, keyword) => {
    return [
        {
            id: 1,
            title: '标题A',
            content: '内容A',
            createTime: 1578902338571,
            author: 'zhanghsan'
        }, {
            id: 2,
            title: '标题B',
            content: '内容B',
            createTime: 1578902338572,
            author: 'lisi'
        }
    ]
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

module.exports = {
    getList,
    getDetail
}