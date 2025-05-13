'use client'

import { useState } from 'react'
import type { Task, ChecklistItem } from '@/types/Tasks'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { format } from 'date-fns'
import { CalendarIcon, Clock, Trash2, Plus, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { v4 as uuidv4 } from 'uuid'

// Factory Pattern Implementation
interface TaskFactoryProps {
  type: 'basic' | 'timed' | 'checklist'
  task?: Task
  onAddTask?: (task: Task) => void
  onRemove?: () => void
  onToggleComplete?: () => void
  onToggleChecklistItem?: (taskId: string, itemId: string) => void
  onCancel?: () => void
}

export function TaskFactory({
  type,
  task,
  onAddTask,
  onRemove,
  onToggleComplete,
  onToggleChecklistItem,
  onCancel,
}: TaskFactoryProps) {
  // If we're creating a new task
  if (!task && onAddTask) {
    switch (type) {
      case 'basic':
        return <BasicTaskCreator onAddTask={onAddTask} onCancel={onCancel} />
      case 'timed':
        return <TimedTaskCreator onAddTask={onAddTask} onCancel={onCancel} />
      case 'checklist':
        return (
          <ChecklistTaskCreator onAddTask={onAddTask} onCancel={onCancel} />
        )
      default:
        return <BasicTaskCreator onAddTask={onAddTask} onCancel={onCancel} />
    }
  }

  // If we're displaying an existing task
  if (task) {
    switch (task.type) {
      case 'checklist':
        return (
          <ChecklistTaskDisplay
            task={task}
            onRemove={onRemove}
            onToggleComplete={onToggleComplete}
            onToggleChecklistItem={onToggleChecklistItem}
          />
        )
      case 'basic':
        return (
          <BasicTaskDisplay
            task={task}
            onRemove={onRemove}
            onToggleComplete={onToggleComplete}
          />
        )
      case 'timed':
        return (
          <TimedTaskDisplay
            task={task}
            onRemove={onRemove}
            onToggleComplete={onToggleComplete}
          />
        )
      default:
        return (
          <BasicTaskDisplay
            task={task}
            onRemove={onRemove}
            onToggleComplete={onToggleComplete}
          />
        )
    }
  }

  return null
}

// Basic Task Creator
function BasicTaskCreator({
  onAddTask,
  onCancel,
}: {
  onAddTask: (task: Task) => void
  onCancel?: () => void
}) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState<Date | undefined>(undefined)

  const handleSubmit = () => {
    if (!title.trim()) return

    onAddTask({
      id: uuidv4(),
      title,
      description,
      dueDate: date ? date.toISOString() : undefined,
      completed: false,
      type: 'basic',
      createdAt: new Date().toISOString(),
    })

    setTitle('')
    setDescription('')
    setDate(undefined)
  }

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Add Basic Task</h3>
      <Input
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-full justify-start text-left font-normal',
                !date && 'text-black'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, 'PPP') : 'Set due date (optional)'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button onClick={handleSubmit} disabled={!title.trim()}>
          Add Task
        </Button>
      </div>
    </div>
  )
}

// Timed Task Creator
function TimedTaskCreator({
  onAddTask,
  onCancel,
}: {
  onAddTask: (task: Task) => void
  onCancel?: () => void
}) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [estimatedTime, setEstimatedTime] = useState('')

  const handleSubmit = () => {
    if (!title.trim()) return

    onAddTask({
      id: uuidv4(),
      title,
      description,
      dueDate: date ? date.toISOString() : undefined,
      completed: false,
      type: 'timed',
      estimatedTime: estimatedTime || '0',
      createdAt: new Date().toISOString(),
    })

    setTitle('')
    setDescription('')
    setDate(undefined)
    setEstimatedTime('')
  }

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Add Timed Task</h3>
      <Input
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="grid grid-cols-2 gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-full justify-start text-left font-normal',
                !date && 'text-black'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, 'PPP') : 'Set due date (optional)'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-black" />
          <Input
            type="number"
            placeholder="Est. time (minutes)"
            value={estimatedTime}
            onChange={(e) => setEstimatedTime(e.target.value)}
            min="0"
          />
        </div>
      </div>
      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button onClick={handleSubmit} disabled={!title.trim()}>
          Add Task
        </Button>
      </div>
    </div>
  )
}

// Checklist Task Creator
function ChecklistTaskCreator({
  onAddTask,
  onCancel,
}: {
  onAddTask: (task: Task) => void
  onCancel?: () => void
}) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([
    { id: uuidv4(), text: '', completed: false },
  ])

  const addChecklistItem = () => {
    setChecklistItems([
      ...checklistItems,
      { id: uuidv4(), text: '', completed: false },
    ])
  }

  const removeChecklistItem = (id: string) => {
    if (checklistItems.length > 1) {
      setChecklistItems(checklistItems.filter((item) => item.id !== id))
    }
  }

  const updateChecklistItem = (id: string, text: string) => {
    setChecklistItems(
      checklistItems.map((item) => (item.id === id ? { ...item, text } : item))
    )
  }

  const handleSubmit = () => {
    if (!title.trim() || checklistItems.some((item) => !item.text.trim()))
      return

    onAddTask({
      id: uuidv4(),
      title,
      description,
      dueDate: date ? date.toISOString() : undefined,
      completed: false,
      type: 'checklist',
      checklistItems: checklistItems.filter((item) => item.text.trim()),
      createdAt: new Date().toISOString(),
    })

    setTitle('')
    setDescription('')
    setDate(undefined)
    setChecklistItems([{ id: uuidv4(), text: '', completed: false }])
  }

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Add Checklist Task</h3>
      <Input
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'w-full justify-start text-left font-normal',
              !date && 'text-black'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, 'PPP') : 'Set due date (optional)'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h4 className="text-sm font-medium">Checklist Items</h4>
          <Button
            variant="outline"
            size="sm"
            onClick={addChecklistItem}
            className="h-8 px-2"
          >
            <Plus className="h-4 w-4 mr-1" /> Add Item
          </Button>
        </div>

        {checklistItems.map((item, index) => (
          <div key={item.id} className="flex items-center gap-2">
            <Input
              placeholder={`Item ${index + 1}`}
              value={item.text}
              onChange={(e) => updateChecklistItem(item.id, e.target.value)}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeChecklistItem(item.id)}
              disabled={checklistItems.length === 1}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button
          onClick={handleSubmit}
          disabled={
            !title.trim() || checklistItems.some((item) => !item.text.trim())
          }
        >
          Add Task
        </Button>
      </div>
    </div>
  )
}

// Basic Task Display
function BasicTaskDisplay({
  task,
  onRemove,
  onToggleComplete,
}: {
  task: Task
  onRemove?: () => void
  onToggleComplete?: () => void
}) {
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

// Timed Task Display
function TimedTaskDisplay({
  task,
  onRemove,
  onToggleComplete,
}: {
  task: Task
  onRemove?: () => void
  onToggleComplete?: () => void
}) {
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

          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
            {task.dueDate && (
              <div
                className={cn(
                  'flex items-center text-xs',
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

            {task.estimatedTime && (
              <div
                className={cn(
                  'flex items-center text-xs text-black',
                  task.completed && 'text-black'
                )}
              >
                <Clock className="h-3 w-3 mr-1" />
                <span>Est. {task.estimatedTime} min</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Checklist Task Display
function ChecklistTaskDisplay({
  task,
  onRemove,
  onToggleComplete,
  onToggleChecklistItem,
}: {
  task: Task
  onRemove?: () => void
  onToggleComplete?: () => void
  onToggleChecklistItem?: (taskId: string, itemId: string) => void
}) {
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
