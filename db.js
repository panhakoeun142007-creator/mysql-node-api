import mysql from 'mysql2';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'user_db'
})
db.connect(err =>{
  if(err){
    console.error('Database connection failed:', err);
  }else{
    console.log('Connected to the database');
    
  }
})

export default db;
