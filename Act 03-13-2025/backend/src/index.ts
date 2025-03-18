import express, { Request, Response, NextFunction, Application } from 'express'
import cors from 'cors'
import userRoutes from './routes/userRoutes'

const app: Application = express()
const PORT = 5000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', userRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('User Management API is running')
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Something went wrong', error: err.message })
})

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
})
