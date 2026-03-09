import { useState } from 'react';
import { Check, Trash2, Palette, X } from 'lucide-react';
import { Todo, NoteColor, NOTE_COLORS, colorClassMap } from '@/lib/todo-types';

interface PostItNoteProps {
  todo: Todo;
  index: number;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onChangeColor: (id: string, color: NoteColor) => void;
  onEdit: (id: string, text: string) => void;
}

const rotations = [-2, 1.5, -1, 2, -1.5, 0.5, -0.8, 1.2, -1.8, 2.5, -0.5, 1, -2.2, 0.8, -1.2];

export function PostItNote({ todo, index, onToggle, onDelete, onChangeColor, onEdit }: PostItNoteProps) {
  const [showPalette, setShowPalette] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const rotation = rotations[index % rotations.length];

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText.trim());
    } else {
      setEditText(todo.text);
    }
    setIsEditing(false);
  };

  return (
    <div
      className={`note-card ${colorClassMap[todo.color]} p-5 pt-6 min-h-[140px] flex flex-col`}
      style={{ '--rotation': `${rotation}deg` } as React.CSSProperties}
    >
      <div className="note-pin" />

      {/* Actions */}
      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={() => setShowPalette(!showPalette)} className="p-1 rounded hover:bg-foreground/10 transition-colors">
          <Palette className="w-3.5 h-3.5 text-foreground/50" />
        </button>
        <button onClick={() => onDelete(todo.id)} className="p-1 rounded hover:bg-destructive/20 transition-colors">
          <Trash2 className="w-3.5 h-3.5 text-foreground/50" />
        </button>
      </div>

      {/* Color palette */}
      {showPalette && (
        <div className="absolute top-8 right-2 bg-card rounded-lg p-2 shadow-lg z-20 animate-scale-in">
          <div className="grid grid-cols-5 gap-1.5">
            {NOTE_COLORS.map(c => (
              <button
                key={c.name}
                onClick={() => { onChangeColor(todo.id, c.name); setShowPalette(false); }}
                className={`w-6 h-6 rounded-full ${colorClassMap[c.name]} border transition-transform hover:scale-125 ${
                  todo.color === c.name ? 'border-foreground/50' : 'border-transparent'
                }`}
                title={c.label}
              />
            ))}
          </div>
          <button onClick={() => setShowPalette(false)} className="mt-1 w-full text-center">
            <X className="w-3 h-3 mx-auto text-muted-foreground" />
          </button>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 flex items-start gap-2 mt-1" onClick={() => !isEditing && setIsEditing(true)}>
        <button
          onClick={e => { e.stopPropagation(); onToggle(todo.id); }}
          className={`shrink-0 mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
            todo.completed ? 'bg-foreground/20 border-foreground/30' : 'border-foreground/25 hover:border-foreground/40'
          }`}
        >
          {todo.completed && <Check className="w-3 h-3 text-foreground/60" />}
        </button>

        {isEditing ? (
          <textarea
            autoFocus
            value={editText}
            onChange={e => setEditText(e.target.value)}
            onBlur={handleSave}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSave(); } }}
            className="flex-1 bg-transparent border-none outline-none resize-none font-handwriting text-lg leading-snug text-foreground min-h-[60px]"
          />
        ) : (
          <p className={`flex-1 font-handwriting text-lg leading-snug cursor-text ${
            todo.completed ? 'line-through text-foreground/40' : 'text-foreground/80'
          }`}>
            {todo.text}
          </p>
        )}
      </div>
    </div>
  );
}
