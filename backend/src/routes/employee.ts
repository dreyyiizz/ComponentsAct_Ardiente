import { Router, Request} from "express"

const router = Router()

type Employee = {
  id: number
  name: string
  role: 'Entry Level' | 'Senior'
  salary: number
}


export const Employees: Employee[] = [
  {
    name: 'Juan',
    id: 1,
    salary: 25000,
    role: 'Entry Level',
  },
  {
    name: 'Juan',
    id: 1,
    salary: 25000,
    role: 'Entry Level',
  },
  {
    name: 'Janet',
    id: 5,
    salary: 50000,
    role: 'Senior',
  },
  {
    name: 'Janet',
    id: 5,
    salary: 50000,
    role: 'Senior',
  },
  {
    name: 'Bossing',
    id: 7,
    salary: 250000,
    role: 'Senior',
  },
]

router.get('/', (req, res, next) => {
  try {
    res.status(200).json({Employees})
  } catch (error) {
    next(error)
  }
})


export default router