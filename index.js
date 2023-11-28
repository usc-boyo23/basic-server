import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import mysql from 'mysql2'

dotenv.config()

if (!process.env.PORT) {
  process.exit(1)
}

const app = express()
const port = parseInt(process.env.PORT, 10)

app.use(cors())
app.use(express.json())

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'basicserver',
})

// GET
app.get('/api', (_, res) => {
  conn.query('SELECT * FROM user', (err, results) => {
    if (!err) {
      res.status(200).send(results)
    } else {
      res.status(500).send({ message: 'An error has occured while executing the query' })
    }
  })
})

app.get('/api/:id', (req, res) => {
  const id = req.params.id

  conn.query('SELECT * FROM user WHERE id = ?', [id], (err, results) => {
    if (!err) {
      res.status(200).send(results[0])
    } else {
      res.status(404).send({ message: `User with id: ${id} does not exist!` })
    }
  })
})

// POST
app.post('/api', (req, res) => {
  const { username, password } = req.body

  conn.query('INSERT INTO user (username, password) VALUES (?, ?)', [username, password], (err, _) => {
    if (!err) {
      res.status(200).send({ message: `Successfully inserted ${username}` })
    } else {
      res.status(500).send({ message: 'An error has occured while executing the query' })
    }
  })
})

// PUT
app.put('/api/:id', (req, res) => {
  const { username, password } = req.body
  const id = req.params.id

  conn.query('UPDATE user SET username = ?, password = ? WHERE id = ?', [username, password, id], (err, _) => {
    if (!err) {
      res.status(200).send({ message: `Successfully updated user with id: ${id}` })
    } else {
      res.status(404).send({ message: 'User not found!' })
    }
  })
})

// DELETE
app.delete('/api/:id', (req, res) => {
  const id = req.params.id

  conn.query('DELETE FROM user WHERE id = ?', [id], (err, _) => {
    if (!err) {
      res.status(200).send({ message: `Successfully deleted user with id: ${id}` })
    } else {
      res.status(404).send({ message: 'User not found!' })
    }
  })
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
