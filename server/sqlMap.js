var sqlMap = {
  // 用户
  user: {
    add: 'insert into user(username,password, age) values(?,?,?)',
    query: 'select * from user where username= ? and password= ?'
  }
}

module.exports = sqlMap
