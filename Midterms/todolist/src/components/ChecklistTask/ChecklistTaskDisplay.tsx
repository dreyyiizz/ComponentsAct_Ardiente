// ChecklistTaskDisplay.tsx

'use client'

import type { Task, ChecklistItem } from '@/types/Tasks'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { CalendarIcon, Trash2 } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'

interface ChecklistTaskDisplayProps {
  task: Task
  onRemove?: () => void
  onToggleComplete?: () => void
  onToggleChecklistItem?: (taskId: string, itemId: string) => void
}

export function ChecklistTaskDisplay({
  task,
  onRemove,
  onToggleComplete,
  onToggleChecklistItem,
}: ChecklistTaskDisplayProps) {
  const isOverdue =
    task.dueDate && new Date(task.dueDate) < new Date() && !task.completed
  const checklistItems = task.checklistItems || []
  const completedItems = checklistItems.filter((item) => item.completed).length
  const progress =
    checklistItems.length > 0
      ? Math.round((completedItems / checklistItems.length) * 100)
      : 0

  return (
    <div
      className={cn(
        'p-4 border rounded-lg transition-all',
        task.completed
          ? 'bg-slate-50 border-slate-200'
          : 'bg-white border-slate-200',
        isOverdue ? 'border-red-200' : ''
      )}
    >
      <div className="flex items-start gap-3">
        <Checkbox
          checked={task.completed}
          onCheckedChange={onToggleComplete}
          className="mt-1"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3
              className={cn(
                'font-medium line-clamp-2',
                task.completed && 'line-through text-black'
              )}
            >
              {task.title}
            </h3>

            {onRemove && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onRemove}
                className="h-8 w-8 -mt-1 -mr-1"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>

          {task.description && (
            <p
              className={cn(
                'text-sm text-black mt-1',
                task.completed && 'text-black'
              )}
            >
              {task.description}
            </p>
          )}

          {task.dueDate && (
            <div
              className={cn(
                'flex items-center mt-2 text-xs',
                isOverdue ? 'text-red-500' : 'text-black',
                task.completed && 'text-black'
              )}
            >
              <CalendarIcon className="h-3 w-3 mr-1" />
              <span>
                {isOverdue ? 'Overdue: ' : 'Due: '}
                {format(new Date(task.dueDate), 'PPP')}
              </span>
            </div>
          )}

          {checklistItems.length > 0 && (
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between text-xs text-black">
                <span>
                  Progress: {completedItems}/{checklistItems.length} items
                </span>
                <span>{progress}%</span>
              </div>

              <div className="w-full bg-slate-100 rounded-full h-1.5">
                <div
                  className="bg-green-500 h-1.5 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              <ul className="mt-2 space-y-1">
                {checklistItems.map((item) => (
                  <li key={item.id} className="flex items-start gap-2">
                    <Checkbox
                      checked={item.completed}
                      disabled={task.completed}
                      onCheckedChange={() =>
                        onToggleChecklistItem &&
                        onToggleChecklistItem(task.id, item.id)
                      }
                      className="mt-0.5"
                    />
                    <span
                      className={cn(
                        'text-sm',
                        item.completed && 'line-through text-black',
                        task.completed && 'text-black'
                      )}
                    >
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
