import { ClipboardList, CheckCircle2, Circle } from 'lucide-react';
import { useTodos } from '@/hooks/use-todos';
import { AddTodoForm } from '@/components/AddTodoForm';
import { PostItNote } from '@/components/PostItNote';

const Index = () => {
  const { todos, addTodo, toggleTodo, deleteTodo, changeColor, editTodo, stats } = useTodos();

  return (
    <div className="min-h-screen bg-background px-4 py-8 md:py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-3 mb-3">
          <ClipboardList className="w-8 h-8 text-primary" />
          <h1 className="text-4xl md:text-5xl font-handwriting font-bold text-foreground">
            My To-Do's
          </h1>
        </div>
        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><Circle className="w-3.5 h-3.5" /> {stats.pending} pending</span>
          <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> {stats.completed} done</span>
        </div>
      </div>

      {/* Add Form */}
      <AddTodoForm onAdd={addTodo} />

      {/* Notes Grid */}
      {todos.length === 0 ? (
        <div className="text-center py-20">
          <p className="font-handwriting text-2xl text-muted-foreground">No tasks yet!</p>
          <p className="text-muted-foreground mt-1">Add your first to-do above ☝️</p>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {todos.map((todo, i) => (
            <div key={todo.id} className="group animate-fade-in" style={{ animationDelay: `${i * 30}ms` }}>
              <PostItNote
                todo={todo}
                index={i}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onChangeColor={changeColor}
                onEdit={editTodo}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Index;
