import { v4 as uuidv4 } from 'uuid'
import { Router } from 'express'

const router = Router()

interface User {
  id: string
  firstName: string
  lastName: string
  groupName: string
  role: string
  expectedSalary: number
  expectedDateOfDefense: string
  createdAt: Date
  updatedAt?: Date
}

let users: User[] = []

router.get('/users', (req, res) => {
  res.json(users)
})

router.get('/users/:id', (req, res) => {
  const user = users.find((user) => user.id === req.params.id)
  if (!user) {
    res.status(404).json({ message: 'User not found' })
  }
  res.json(user)
})

router.post('/users', (req, res) => {
  try {
    const {
      firstName,
      lastName,
      groupName,
      role,
      expectedSalary,
      expectedDateOfDefense,
    } = req.body

    if (
      !firstName ||
      !lastName ||
      !groupName ||
      !role ||
      expectedSalary === undefined ||
      !expectedDateOfDefense
    ) {
      res.status(400).json({ message: 'All fields are required' })
    }

    const newUser: User = {
      id: uuidv4(),
      firstName,
      lastName,
      groupName,
      role,
      expectedSalary: Number(expectedSalary),
      expectedDateOfDefense,
      createdAt: new Date(),
    }

    users.push(newUser)
    res.status(201).json(newUser)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error creating user', error: (error as Error).message })
  }
})

router.put('/users/:id', (req, res) => {
  try {
    const userIndex = users.findIndex((user) => user.id === req.params.id)
    if (userIndex === -1) {
      res.status(404).json({ message: 'User not found' })
    }

    const {
      firstName,
      lastName,
      groupName,
      role,
      expectedSalary,
      expectedDateOfDefense,
    } = req.body
    if (
      !firstName ||
      !lastName ||
      !groupName ||
      !role ||
      expectedSalary === undefined ||
      !expectedDateOfDefense
    ) {
      res.status(400).json({ message: 'All fields are required' })
    }

    const updatedUser: User = {
      ...users[userIndex],
      firstName,
      lastName,
      groupName,
      role,
      expectedSalary: Number(expectedSalary),
      expectedDateOfDefense,
      updatedAt: new Date(),
    }

    users[userIndex] = updatedUser
    res.json(updatedUser)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error updating user', error: (error as Error).message })
  }
})

router.delete('/users/:id', (req, res) => {
  try {
    const userIndex = users.findIndex((user) => user.id === req.params.id)
    if (userIndex === -1) {
      res.status(404).json({ message: 'User not found' })
    }

    users.splice(userIndex, 1)
    res.status(200).json({ message: 'User deleted successfully' })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting user', error: (error as Error).message })
  }
})

export default router
