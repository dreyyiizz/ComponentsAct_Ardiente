'use client'

import { useState } from 'react'
import type { Task, ChecklistItem } from '@/types/Tasks'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import { CalendarIcon, Plus, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { v4 as uuidv4 } from 'uuid'

interface ChecklistTaskCreatorProps {
  onAddTask: (task: Task) => void
  onCancel?: () => void
}

export function ChecklistTaskCreator({
  onAddTask,
  onCancel,
}: ChecklistTaskCreatorProps) {
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
