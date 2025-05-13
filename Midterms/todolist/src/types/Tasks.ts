// Task Interface
export interface ChecklistItem {
  id: string
  text: string
  completed: boolean
}

// Base Task Interface
export interface Task {
  id: string
  title: string
  description?: string
  dueDate?: string
  completed: boolean
  type: 'basic' | 'timed' | 'checklist'
  createdAt: string
  priority?: number

  // Timed Task properties
  estimatedTime?: string

  // Checklist Task properties
  checklistItems?: ChecklistItem[]
}

// Adapter Pattern Implementation
export class TaskAdapter {
  // Convert from external API format to our Task format
  static fromApiFormat(apiTask: any): Task {
    return {
      id: apiTask.id || crypto.randomUUID(),
      title: apiTask.title || apiTask.name || 'Untitled Task',
      description: apiTask.description || apiTask.notes || '',
      dueDate: apiTask.dueDate || apiTask.due_date || undefined,
      completed: apiTask.completed || apiTask.is_completed || false,
      type: this.determineTaskType(apiTask),
      createdAt:
        apiTask.createdAt || apiTask.created_at || new Date().toISOString(),
      priority: apiTask.priority || 0,
      estimatedTime:
        apiTask.estimatedTime || apiTask.estimated_time || undefined,
      checklistItems: this.convertChecklistItems(apiTask),
    }
  }

  // Determine task type based on API data
  private static determineTaskType(
    apiTask: any
  ): 'basic' | 'timed' | 'checklist' {
    if (apiTask.type) {
      if (['basic', 'timed', 'checklist'].includes(apiTask.type)) {
        return apiTask.type as 'basic' | 'timed' | 'checklist'
      }
    }

    if (apiTask.checklist || apiTask.checklistItems || apiTask.items) {
      return 'checklist'
    }

    if (apiTask.estimatedTime || apiTask.estimated_time || apiTask.duration) {
      return 'timed'
    }

    return 'basic'
  }

  // Convert checklist items from various formats
  private static convertChecklistItems(
    apiTask: any
  ): ChecklistItem[] | undefined {
    const items = apiTask.checklistItems || apiTask.checklist || apiTask.items

    if (!items || !Array.isArray(items)) {
      return undefined
    }

    return items.map((item: any) => ({
      id: item.id || crypto.randomUUID(),
      text: item.text || item.name || item.title || 'Untitled Item',
      completed: item.completed || item.is_completed || false,
    }))
  }

  // Convert to format for external API
  static toApiFormat(task: Task): any {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      due_date: task.dueDate,
      is_completed: task.completed,
      type: task.type,
      created_at: task.createdAt,
      priority: task.priority,
      estimated_time: task.estimatedTime,
      checklist: task.checklistItems?.map((item) => ({
        id: item.id,
        text: item.text,
        is_completed: item.completed,
      })),
    }
  }
}

