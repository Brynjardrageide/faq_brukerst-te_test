# hvordan bruke sqllite

//koble til databasen
//tutorioal
//lage tabell

//sql = `CREATE TABLE users(id INTEGER PRIMARY KEY,first_name,last_name,username,password,email)`;
//db.run(sql);

//droppe tabell
//db.run('DROP TABLE users')

//insert data
/_ sql = `INSERT INTO users(first_name,last_name,username,password,email) VALUES(?,?,?,?,?)`;
db.run(sql,["brynjar", "drageide", "minigru", "7698", "brynjar@drageide.com"],
(err)=>{
if(err) return console.error(err.message);
}) _/

//update data
/_ sql = `UPDATE users SET first_name = ? WHERE id = ?`;
db.run(sql,["vidar", 1],(err)=>{
if(err) return console.error(err.message);
}) _/

//delete data
/\* sql = `DELETE from users where id = ?`;
db.run(sql,[ 1],(err)=>{
if(err) return console.error(err.message);
})

//query data
sql = `SELECT * FROM users`;
db.all(sql,[],(err,rows)=>{
if(err) return console.error(err.message);
rows.forEach((row)=>{
console.log(row);
})
}) \*/
