export interface User {
  id: string
  firstName: string
  lastName: string
  groupName: string
  role: string
  expectedSalary: string | number
  expectedDateOfDefense: string
  createdAt?: string
  updatedAt?: string
}

export interface UserFormData {
  id: string
  firstName: string
  lastName: string
  groupName: string
  role: string
  expectedSalary: string | number
  expectedDateOfDefense: string
}
