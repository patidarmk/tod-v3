import React, { useState, useRef, useEffect } from 'react';
import { Todo } from '@/types';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Trash2, Edit, Save } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete, onUpdate }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpdate = () => {
    if (editText.trim()) {
      onUpdate(todo.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleUpdate();
    } else if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  return (
    <div className="flex items-center gap-4 p-3 bg-card rounded-lg border transition-all hover:shadow-md">
      <Checkbox
        id={`todo-${todo.id}`}
        checked={todo.completed}
        onCheckedChange={() => onToggle(todo.id)}
        aria-label={`Mark ${todo.text} as ${todo.completed ? 'incomplete' : 'complete'}`}
      />
      <div className="flex-1">
        {isEditing ? (
          <Input
            ref={inputRef}
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleUpdate}
            className="h-8"
          />
        ) : (
          <label
            htmlFor={`todo-${todo.id}`}
            className={cn(
              'font-medium cursor-pointer transition-colors',
              todo.completed ? 'text-muted-foreground line-through' : 'text-foreground'
            )}
          >
            {todo.text}
          </label>
        )}
      </div>
      <div className="flex items-center gap-1">
        {isEditing ? (
          <Button variant="ghost" size="icon" onClick={handleUpdate} aria-label="Save task">
            <Save className="h-4 w-4" />
          </Button>
        ) : (
          <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)} aria-label="Edit task">
            <Edit className="h-4 w-4" />
          </Button>
        )}
        <Button variant="ghost" size="icon" onClick={() => onDelete(todo.id)} aria-label="Delete task">
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </div>
    </div>
  );
}