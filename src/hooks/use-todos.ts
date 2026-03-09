import { useState, useEffect, useCallback } from 'react';
import { Todo, NoteColor } from '@/lib/todo-types';

const STORAGE_KEY = 'postit-todos';

function loadTodos(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(loadTodos);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = useCallback((text: string, color: NoteColor) => {
    if (!text.trim()) return;
    setTodos(prev => [
      { id: crypto.randomUUID(), text: text.trim(), completed: false, color, createdAt: Date.now() },
      ...prev,
    ]);
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  }, []);

  const changeColor = useCallback((id: string, color: NoteColor) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, color } : t));
  }, []);

  const editTodo = useCallback((id: string, text: string) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, text } : t));
  }, []);

  const stats = {
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    pending: todos.filter(t => !t.completed).length,
  };

  return { todos, addTodo, toggleTodo, deleteTodo, changeColor, editTodo, stats };
}
