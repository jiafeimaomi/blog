var sqlMap = {
  // 用户
  user: {
    add: 'insert into user(username,password, age) values(?,?,?)',
    query: 'select * from user where username= ? and password= ?'
  },
  blog: {
    add: 'insert into blog_info(title, content) values(?,?);',
    queryTotal: 'select count(id) total from blog_info;',
    queryList: 'select * from blog_info limit ?, ?;',
    edit: 'UPDATE blog_info SET title = ?, content = ? WHERE id = ?;',
    del: 'DELETE FROM blog_info WHERE id in(?)',
    get: 'SELECT * FROM blog_info where id=?;'
  }
}

module.exports = sqlMap
