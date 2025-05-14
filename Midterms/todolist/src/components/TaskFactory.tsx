'use client'

import { Task } from '@/types/Tasks';
import { BasicTaskCreator } from './BasicTask/BasicTaskCreator';
import { TimedTaskCreator } from './TImedTask/TimedTaskCreator';
import { ChecklistTaskCreator } from './ChecklistTask/ChecklistTaskCreator';
import { BasicTaskDisplay } from './BasicTask/BasicTaskDisplay';
import { TimedTaskDisplay } from './TImedTask/TimedTaskDisplay';
import { ChecklistTaskDisplay } from './ChecklistTask/ChecklistTaskDisplay';

// Factory Pattern Implementation
interface TaskFactoryProps {
  type: 'basic' | 'timed' | 'checklist';
  task?: Task;
  onAddTask?: (task: Task) => void;
  onRemove?: () => void;
  onToggleComplete?: () => void;
  onToggleChecklistItem?: (taskId: string, itemId: string) => void;
  onCancel?: () => void;
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
        return <BasicTaskCreator onAddTask={onAddTask} onCancel={onCancel} />;
      case 'timed':
        return <TimedTaskCreator onAddTask={onAddTask} onCancel={onCancel} />;
      case 'checklist':
        return (
          <ChecklistTaskCreator onAddTask={onAddTask} onCancel={onCancel} />
        );
      default:
        return <BasicTaskCreator onAddTask={onAddTask} onCancel={onCancel} />;
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
        );
      case 'basic':
        return (
          <BasicTaskDisplay
            task={task}
            onRemove={onRemove}
            onToggleComplete={onToggleComplete}
          />
        );
      case 'timed':
        return (
          <TimedTaskDisplay
            task={task}
            onRemove={onRemove}
            onToggleComplete={onToggleComplete}
          />
        );
      default:
        return (
          <BasicTaskDisplay
            task={task}
            onRemove={onRemove}
            onToggleComplete={onToggleComplete}
          />
        );
    }
  }

  return null;
}