  import express from 'express'
import db from './db.js'

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World')
})

// get user by id
app.get('/users/:id', (req, res) => {
  const id = req.params.id

  db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) =>{
    if(err) return res.status(500).send(err)
      if (results.length === 0){
        return res.status(404).send('User not found')
      }
      res.json(results[0])
  })
})

// get all users
app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if(err) return res.status(500).send(err)
      res.json(results)
  })
})


// create
app.post('/users', (req, res) => {
  const { name, age, email } = req.body

  const sql = 'INSERT INTO users (name, age, email) VALUES (?, ?, ?)'

  db.query(sql, [name, age, email], (err, result) => {
    if (err) return res.status(500).send(err)

    res.status(201).json({
      id: result.insertId,
      name,
      age,
      email
    })
  })
})


//update
app.put('/users/:id', (req, res) => {
  const id = req.params.id
  const { name, age, email } = req.body

  const sql = 'UPDATE users SET name=?, age=?, email=? WHERE id=?'

  db.query(sql, [name, age, email, id], (err, result) => {
    if (err) return res.status(500).send(err)

    if (result.affectedRows === 0) {
      return res.status(404).send('User not found')
    }

    res.json({ message: 'User updated' })
  })
})


// delete
app.delete('/users/:id', (req, res) => {
  const id = req.params.id

  db.query('DELETE FROM users WHERE id=?', [id], (err, result) => {
    if (err) return res.status(500).send(err)

    if (result.affectedRows === 0) {
      return res.status(404).send('User not found')
    }

    res.status(204).send()
  })
})



app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
