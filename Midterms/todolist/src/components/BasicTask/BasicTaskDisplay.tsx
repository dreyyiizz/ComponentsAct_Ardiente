// BasicTaskDisplay.tsx

'use client'

import type { Task } from '@/types/Tasks'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { CalendarIcon, Trash2 } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'

interface BasicTaskDisplayProps {
  task: Task
  onRemove?: () => void
  onToggleComplete?: () => void
}

export function BasicTaskDisplay({
  task,
  onRemove,
  onToggleComplete,
}: BasicTaskDisplayProps) {
  const isOverdue =
    task.dueDate && new Date(task.dueDate) < new Date() && !task.completed

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
          className="mt-1 border-gray-200"
        />
        {/* Nothing here for the display; the "Add Task" UI is handled in the parent component using TaskFactory. */}
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
        </div>
      </div>
    </div>
  )
}
