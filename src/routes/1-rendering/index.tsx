import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

interface Todo {
  id: number
  text: string
  completed: boolean
}

export const Route = createFileRoute('/1-rendering/')({
  component: RouteComponent,
})

const TodoInput = ({ value, onChange, onAdd }: { value: string; onChange: (value: string) => void; onAdd: () => void }) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') onAdd()
  }

  return (
    <div className="mb-4 flex gap-2">
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Add new todo"
      />
      <Button onClick={onAdd}>Add</Button>
    </div>
  )
}

const TodoItem = ({ todo, onToggle, onRemove }: { todo: Todo; onToggle: () => void; onRemove: () => void }) => {
  return (
    <li className="flex items-center gap-2 p-2 border rounded">
      <Checkbox
        id={String(todo.id)}
        onCheckedChange={onToggle}
        checked={todo.completed}
      />
      <Label
        htmlFor={String(todo.id)}
        className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", todo.completed ? 'line-through' : '')}
      >
        {todo.text}
      </Label>
      <Button variant="destructive" onClick={onRemove} className="ml-auto">×</Button>
    </li>
  )
}

function RouteComponent() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState('')

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos(prev => [...prev, { id: Date.now(), text: newTodo.trim(), completed: false }])
      setNewTodo('')
    }
  }

  const removeTodo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  const toggleTodo = (id: number) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const handleInputChange = (value: string) => {
    setNewTodo(value)
  }

  const handleToggle = (id: number) => () => toggleTodo(id)
  const handleRemove = (id: number) => () => removeTodo(id)

  return (
    <div className="p-4 max-w-md mx-auto">
      <TodoInput value={newTodo} onChange={handleInputChange} onAdd={addTodo} />
      <ul className="space-y-2">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={handleToggle(todo.id)}
            onRemove={handleRemove(todo.id)}
          />
        ))}
      </ul>
    </div>
  )
}
