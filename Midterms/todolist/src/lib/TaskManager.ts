
import type { Task } from '@/types/Tasks'
import { v4 as uuidv4 } from 'uuid'

// Singleton Pattern Implementation
class TaskManagerClass {
  private tasks: Task[] = []
  private static instance: TaskManagerClass

  private constructor() {
    // Initialize with sample tasks
    this.tasks = [
      {
        id: uuidv4(),
        title: 'Complete project documentation',
        description: 'Write up the final documentation for the project',
        dueDate: this.addDays(new Date(), 2).toISOString(),
        completed: false,
        type: 'basic',
        createdAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        title: 'Prepare presentation',
        description: 'Create slides for the client meeting',
        dueDate: this.addDays(new Date(), -1).toISOString(),
        completed: false,
        type: 'timed',
        estimatedTime: '120',
        createdAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        title: 'Weekly grocery shopping',
        description: 'Buy items for the week',
        dueDate: this.addDays(new Date(), 1).toISOString(),
        completed: false,
        type: 'checklist',
        checklistItems: [
          { id: uuidv4(), text: 'Fruits and vegetables', completed: true },
          { id: uuidv4(), text: 'Milk and dairy', completed: false },
          { id: uuidv4(), text: 'Bread and cereals', completed: false },
          { id: uuidv4(), text: 'Meat and fish', completed: false },
        ],
        createdAt: new Date().toISOString(),
      },
    ]
  }

  public static getInstance(): TaskManagerClass {
    if (!TaskManagerClass.instance) {
      TaskManagerClass.instance = new TaskManagerClass()
    }
    return TaskManagerClass.instance
  }

  private addDays(date: Date, days: number): Date {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
  }

  public getTasks(): Task[] {
    return [...this.tasks]
  }

  public addTask(task: Task): Task[] {
    this.tasks.push(task)
    return [...this.tasks]
  }

  public removeTask(id: string): Task[] {
    this.tasks = this.tasks.filter((task) => task.id !== id)
    return [...this.tasks]
  }

  public updateTask(updatedTask: Task): Task[] {
    this.tasks = this.tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    )
    return [...this.tasks]
  }

  public toggleTaskCompletion(id: string): Task[] {
    this.tasks = this.tasks.map((task) => {
      if (task.id === id) {
        // For checklist tasks, toggle all checklist items
        if (task.type === 'checklist' && task.checklistItems) {
          const allCompleted = !task.completed
          return {
            ...task,
            completed: allCompleted,
            checklistItems: task.checklistItems.map((item) => ({
              ...item,
              completed: allCompleted,
            })),
          }
        }

        return { ...task, completed: !task.completed }
      }
      return task
    })

    return [...this.tasks]
  }

  public toggleChecklistItem(taskId: string, itemId: string): Task[] {
    this.tasks = this.tasks.map((task) => {
      if (
        task.id === taskId &&
        task.type === 'checklist' &&
        task.checklistItems
      ) {
        const updatedItems = task.checklistItems.map((item) =>
          item.id === itemId ? { ...item, completed: !item.completed } : item
        )

        // Check if all items are completed
        const allCompleted = updatedItems.every((item) => item.completed)

        return {
          ...task,
          checklistItems: updatedItems,
          completed: allCompleted,
        }
      }
      return task
    })

    return [...this.tasks]
  }

  public searchTasks(query: string): Task[] {
    if (!query.trim()) return [...this.tasks]

    const lowerQuery = query.toLowerCase()
    return this.tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(lowerQuery) ||
        (task.description &&
          task.description.toLowerCase().includes(lowerQuery))
    )
  }
}

// Export the singleton instance
export const TaskManager = TaskManagerClass.getInstance()
