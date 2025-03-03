import { Router, Request, Response, NextFunction} from 'express'

const router = Router()


router.get('/', (req, res, next) => {
  try {
    res.status(200).json({ message: 'YOoooooo' })
  } catch (error) {
    next(error)
  }
})


router.post('/', (req, res, next) => {
  try {
    res.status(201).json({ message: 'I am in POST', receivedData: req.body })
  } catch (error) {
    next(error)
  }
})

router.put('/', (req, res, next) => {
  try {
    res.status(200).json({ message: 'I am in PUT', updatedData: req.body })
  } catch (error) {
    next(error)
  }
})

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong', details: err.message })
})

export default router
