import type { Task } from '@/types/Tasks'

// Strategy Pattern Implementation
export class TaskSortingStrategy {
  // Sort by due date (earliest first)
  static sortByDate(tasks: Task[]): Task[] {
    return [...tasks].sort((a, b) => {
      // Tasks without due dates go to the end
      if (!a.dueDate) return 1
      if (!b.dueDate) return -1

      // Sort by due date
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    })
  }

  // Sort by name (alphabetically)
  static sortByName(tasks: Task[]): Task[] {
    return [...tasks].sort((a, b) => a.title.localeCompare(b.title))
  }

  // Sort by ID (creation order)
  static sortById(tasks: Task[]): Task[] {
    return [...tasks].sort((a, b) =>
      a.createdAt && b.createdAt
        ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        : 0
    )
  }

  // Sort by completion status (incomplete first)
  static sortByCompletion(tasks: Task[]): Task[] {
    return [...tasks].sort((a, b) => {
      if (a.completed === b.completed) return 0
      return a.completed ? 1 : -1
    })
  }

  // Sort by priority (if tasks have priority property)
  static sortByPriority(tasks: Task[]): Task[] {
    return [...tasks].sort((a, b) => {
      const aPriority = a.priority || 0
      const bPriority = b.priority || 0
      return bPriority - aPriority // Higher priority first
    })
  }
}
