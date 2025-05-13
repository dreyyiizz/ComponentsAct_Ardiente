'use client'

import { useState, useEffect } from 'react'
import { TaskFactory } from '@/components/TaskFactory'
import { TaskManager } from '@/lib/TaskManager'
import { TaskSortingStrategy } from '@/lib/TaskSortingStrategy'
import type { Task } from '@/types/Tasks'
import { Notification } from '@/components/Notification'
import { Button } from '@/components/ui/button'
import { PlusCircle, Clock, CheckSquare, ListTodo } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [sortStrategy, setSortStrategy] = useState<'date' | 'name' | 'id'>(
    'date'
  )
  const [taskType, setTaskType] = useState<'basic' | 'timed' | 'checklist'>(
    'basic'
  )
  const [showAddTask, setShowAddTask] = useState(false)

  useEffect(() => {
    // Initialize with some sample tasks
    const initialTasks = TaskManager.getTasks()
    setTasks(initialTasks)
  }, [])

  const addTask = (task: Task) => {
    const updatedTasks = TaskManager.addTask(task)
    setTasks(updatedTasks)
    setShowAddTask(false)
  }

  const removeTask = (id: string) => {
    const updatedTasks = TaskManager.removeTask(id)
    setTasks(updatedTasks)
  }

  const toggleTaskCompletion = (id: string) => {
    const updatedTasks = TaskManager.toggleTaskCompletion(id)
    setTasks(updatedTasks)
  }

  const toggleChecklistItem = (taskId: string, itemId: string) => {
    const updatedTasks = TaskManager.toggleChecklistItem(taskId, itemId)
    setTasks(updatedTasks)
  }

  const getSortedTasks = () => {
    switch (sortStrategy) {
      case 'date':
        return TaskSortingStrategy.sortByDate(tasks)
      case 'name':
        return TaskSortingStrategy.sortByName(tasks)
      case 'id':
        return TaskSortingStrategy.sortById(tasks)
      default:
        return tasks
    }
  }

  const sortedTasks = getSortedTasks()
  const hasOverdueTasks = sortedTasks.some(
    (task) =>
      task.dueDate && new Date(task.dueDate) < new Date() && !task.completed
  )

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Task Manager
          </h1>
          <p className="text-slate-500">
            Organize your tasks with design patterns
          </p>
        </div>

        {hasOverdueTasks && (
          <Notification>
            You have overdue tasks that need attention!
          </Notification>
        )}

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              {!showAddTask ? (
                <Button
                  onClick={() => setShowAddTask(true)}
                  className="flex items-center gap-2"
                >
                  <PlusCircle className="h-4 w-4" />
                  Add Task
                </Button>
              ) : (
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    variant={taskType === 'basic' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTaskType('basic')}
                    className="flex items-center gap-1"
                  >
                    <ListTodo className="h-4 w-4" />
                    Basic
                  </Button>
                  <Button
                    variant={taskType === 'timed' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTaskType('timed')}
                    className="flex items-center gap-1"
                  >
                    <Clock className="h-4 w-4" />
                    Timed
                  </Button>
                  <Button
                    variant={taskType === 'checklist' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTaskType('checklist')}
                    className="flex items-center gap-1"
                  >
                    <CheckSquare className="h-4 w-4" />
                    Checklist
                  </Button>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-black">Sort by:</span>
              <Select
                value={sortStrategy}
                onValueChange={(value) =>
                  setSortStrategy(value as 'date' | 'name' | 'id')
                }
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Due Date</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="id">ID</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {showAddTask && (
            <div className="mb-6 p-4 border border-slate-200 rounded-lg bg-slate-50">
              <TaskFactory
                type={taskType}
                onAddTask={addTask}
                onCancel={() => setShowAddTask(false)}
              />
            </div>
          )}

          <div className="space-y-4">
            {sortedTasks.length === 0 ? (
              <div className="text-center py-12 text-black">
                <p>No tasks yet. Add your first task to get started!</p>
              </div>
            ) : (
              sortedTasks.map((task) => (
                <div key={task.id} className="relative">
                  <TaskFactory
                    type={task.type}
                    task={task}
                    onRemove={() => removeTask(task.id)}
                    onToggleComplete={() => toggleTaskCompletion(task.id)}
                    onToggleChecklistItem={toggleChecklistItem}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
