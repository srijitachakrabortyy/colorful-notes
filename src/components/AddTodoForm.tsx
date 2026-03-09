import { useState } from 'react';
import { Plus } from 'lucide-react';
import { NoteColor, NOTE_COLORS, colorClassMap } from '@/lib/todo-types';

interface AddTodoFormProps {
  onAdd: (text: string, color: NoteColor) => void;
}

export function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [text, setText] = useState('');
  const [color, setColor] = useState<NoteColor>('yellow');
  const [showColors, setShowColors] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text, color);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto mb-8">
      <div className={`${colorClassMap[color]} rounded-lg p-4 transition-colors duration-200`}
           style={{ boxShadow: 'var(--shadow-note)' }}>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="What needs to be done?"
            className="flex-1 bg-transparent border-none outline-none font-handwriting text-xl text-foreground placeholder:text-foreground/40 px-2 py-1"
          />
          <button
            type="submit"
            className="shrink-0 w-10 h-10 rounded-full bg-foreground/10 hover:bg-foreground/20 flex items-center justify-center transition-colors"
          >
            <Plus className="w-5 h-5 text-foreground/70" />
          </button>
        </div>
        <div className="mt-3">
          <button
            type="button"
            onClick={() => setShowColors(!showColors)}
            className="text-xs text-foreground/50 hover:text-foreground/70 transition-colors"
          >
            {showColors ? 'Hide colors' : '🎨 Pick a color'}
          </button>
          {showColors && (
            <div className="flex flex-wrap gap-2 mt-2 animate-fade-in">
              {NOTE_COLORS.map(c => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setColor(c.name)}
                  className={`w-7 h-7 rounded-full ${colorClassMap[c.name]} border-2 transition-transform hover:scale-110 ${
                    color === c.name ? 'border-foreground/50 scale-110' : 'border-transparent'
                  }`}
                  title={c.label}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
