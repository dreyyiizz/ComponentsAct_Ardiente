import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.send('YOoooooo')
})

router.post('/', (req, res) => {
  res.send('I am in post')
})

router.put('/', (req, res) => {
  res.send('I am in put')
})

export default router
