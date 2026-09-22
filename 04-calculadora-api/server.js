import express from 'express'

const PORT = 3000

const app = express()

app.use(express.json())

app.use((request, response, next) => {
  const timeString = new Date().toLocaleTimeString()

  console.log(
    `Petición recibida a las ${timeString}, ${request.method} ${request.url}`
  )

  next()
})

app.get('/', (req, res) => {
  return res.send('Mi primera API con Express')
})

app.post('/calculate', (req, res) => {
  const { operation, a, b } = req.body

  let result

  if (a === undefined || b === undefined || operation === undefined) {
    return res.status(400).send('Faltan parámetros en la solicitud')
  }

  if (isNaN(a) || isNaN(b)) {
    return res.status(400).send('Los parámetros a y b deben ser números')
  }

  switch (operation) {
    case 'sum':
      result = parseFloat(a) + parseFloat(b)
      break

    case 'subtract':
      result = parseFloat(a) - parseFloat(b)
      break

    case 'multiply':
      result = parseFloat(a) * parseFloat(b)
      break

    case 'divide':
      if (parseFloat(b) === 0) {
        return res.status(400).send('No se puede dividir por cero')
      }

      result = parseFloat(a) / parseFloat(b)
      break

    default:
      return res.status(400).send('Operación no válida')
  }

  res.json({ result })
})

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`)
})