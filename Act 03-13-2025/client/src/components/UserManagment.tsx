import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import axios from 'axios'
import { User, UserFormData } from '../types'
import './UserManagement.css'

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [formData, setFormData] = useState<UserFormData>({
    id: '',
    firstName: '',
    lastName: '',
    groupName: '',
    role: '',
    expectedSalary: '',
    expectedDateOfDefense: '',
  })
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async (): Promise<void> => {
    setLoading(true)
    try {
      const response = await axios.get<User[]>('/api/users')
      setUsers(response.data)
      setError(null)
    } catch (err) {
      console.error('Error fetching users:', err)
      setError('Failed to fetch users. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setLoading(true)
    try {
      if (isEditing) {
        await axios.put(`/api/users/${formData.id}`, formData)
      } else {
        await axios.post('/api/users', formData)
      }

      resetForm()
      fetchUsers()
      setError(null)
    } catch (err) {
      console.error('Error saving user:', err)
      setError(
        `Failed to ${isEditing ? 'update' : 'create'} user. Please try again.`
      )
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (user: User): void => {
    const formattedUser = {
      ...user,
      expectedDateOfDefense: user.expectedDateOfDefense.split('T')[0],
    }
    setFormData(formattedUser)
    setIsEditing(true)
  }

  const handleDelete = async (id: string): Promise<void> => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setLoading(true)
      try {
        await axios.delete(`/api/users/${id}`)
        fetchUsers()
        setError(null)
      } catch (err) {
        console.error('Error deleting user:', err)
        setError('Failed to delete user. Please try again.')
      } finally {
        setLoading(false)
      }
    }
  }

  const resetForm = (): void => {
    setFormData({
      id: '',
      firstName: '',
      lastName: '',
      groupName: '',
      role: '',
      expectedSalary: '',
      expectedDateOfDefense: '',
    })
    setIsEditing(false)
  }

  return (
    <div className="user-management">
      <h1>User Management System</h1>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="user-form">
        <h2>{isEditing ? 'Edit User' : 'Add New User'}</h2>

        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="groupName">Group Name</label>
          <input
            type="text"
            id="groupName"
            name="groupName"
            value={formData.groupName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="role">Role</label>
          <input
            type="text"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="expectedSalary">Expected Salary</label>
          <input
            type="number"
            id="expectedSalary"
            name="expectedSalary"
            value={formData.expectedSalary}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="expectedDateOfDefense">
            Expected Date of Defense
          </label>
          <input
            type="date"
            id="expectedDateOfDefense"
            name="expectedDateOfDefense"
            value={formData.expectedDateOfDefense}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-buttons">
          <button type="submit" disabled={loading}>
            {loading ? 'Processing...' : isEditing ? 'Update' : 'Add'}
          </button>
          {isEditing && (
            <button type="button" onClick={resetForm} disabled={loading}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="users-list">
        <h2>Users List</h2>
        {loading && <p>Loading...</p>}
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Group Name</th>
              <th>Role</th>
              <th>Expected Salary</th>
              <th>Expected Defense Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="user-row">
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.groupName}</td>
                  <td>{user.role}</td>
                  <td>${Number(user.expectedSalary).toLocaleString()}</td>
                  <td>
                    {new Date(user.expectedDateOfDefense).toLocaleDateString()}
                  </td>
                  <td>
                    <button onClick={() => handleEdit(user)} disabled={loading}>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      disabled={loading}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7}>{loading ? 'Loading...' : 'No users found'}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserManagement
