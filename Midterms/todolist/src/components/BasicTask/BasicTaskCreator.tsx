'use client'

import { useState } from 'react'
import type { Task } from '@/types/Tasks'
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
import { CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { v4 as uuidv4 } from 'uuid'

interface BasicTaskCreatorProps {
  onAddTask: (task: Task) => void
  onCancel?: () => void
}

export function BasicTaskCreator({
  onAddTask,
  onCancel,
}: BasicTaskCreatorProps) {
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
