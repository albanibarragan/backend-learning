import express from 'express'
const PORT = 3000
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json()) // Middleware para parsear JSON

const users = [
  { id: 1, name: 'Alice', lastname: 'Smith', username: 'alice123'},
  { id: 2, name: 'Bob', lastname: 'Johnson', username: 'bob456' },
  { id: 3, name: 'Charlie', lastname: 'Williams', username: 'charlie789' }
]

// CRUD: Create, Read, Update, Delete

app.post('/users', (req, res) => {
  const { name, lastname, username } = req.body
    if (!name || !lastname || !username) {
    return res.status(400).send('Missing required fields')
    }

    const newUser = {
      id: users.reduce((maxId, user) => Math.max(maxId, user.id), 0) + 1,
        name,
        lastname,
        username
    }

    users.push(newUser)
    res.status(201).send(newUser)       
})

// obtener usuarios
app.get('/users', (req, res) => {
  return res.send(users)
})

//obtener usuario por id
app.get('/users/:id', (req, res) => {
  const { id } = req.params
  const user = users.find(u => u.id === parseInt(id))
  if (!user) {
    return res.status(404).send('User not found')
  }
  res.send(user)
})

app.patch('/users/:id', (req, res) => {
  const { id } = req.params
  const userIndex = users.findIndex(u => u.id === parseInt(id))
  if (userIndex === -1) {
    return res.status(404).send('User not found')
  }
  users[userIndex] = { ...users[userIndex], ...req.body }
  res.send(users[userIndex])
})

app.put('/users/:id', (req, res) => {
  const { id } = req.params
  const userIndex = users.findIndex(u => u.id === parseInt(id))
  if (userIndex === -1) {
    return res.status(404).send('User not found')
  }
  users[userIndex] = { ...users[userIndex], ...req.body }
  res.send(users[userIndex])
})

app.delete('/users/:id', (req, res) => {
  const { id } = req.params
  const userIndex = users.findIndex(u => u.id === parseInt(id))
  if (userIndex === -1) {
    return res.status(404).send('User not found')
  }
  users.splice(userIndex, 1)
  res.send('User deleted')
})

app.listen(PORT, () => {
  console.log('Server is running on http://localhost:' + PORT)
} )