# faq svar

Du har jobbet med FAQ-oppgaven i en drøy uke og nå er det over en uke til neste gang. Derfor vil jeg du skal skrive ned noen notater til deg selv. De leveres her FØR du tar høstferie.

Hva hadde du tenkt?

- jeg hadde tenkt å ha en jemme kontor med spørsmål og svar en med data en hvor du kunne legge til og en hvor du kunne slette og svare og gjøre en søkemotor og css

Hvor langt har du kommet?

- jeg har komet til spøre data home lit svare

Hva har du igjen?

- ikke slete ikke css ikke søkemotor

Hva vil du gjøre mer av/annerledes hvis du skulle gjort mer med oppgaven?¨

- systemet med spørsmål og svar og css

## hvordan bruke sqllite

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
