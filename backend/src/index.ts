import express from 'express'
import cors from 'cors'
import messageRoute from './routes/message'
import employeeRoute from './routes/employee'

const app = express()
const PORT = 3000
// app.listen(PORT)

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('hello Paul')
})

app.use('/messages', messageRoute)
app.use('/employees', employeeRoute)


app.listen(PORT, () => {
  console.log(`Server can be found at http://localhost:${PORT}`)
})
