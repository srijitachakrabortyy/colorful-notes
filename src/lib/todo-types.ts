export type NoteColor =
  | 'yellow' | 'pink' | 'blue' | 'purple' | 'orange'
  | 'green' | 'red' | 'teal' | 'indigo' | 'rose'
  | 'amber' | 'emerald' | 'cyan' | 'violet' | 'lime';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  color: NoteColor;
  createdAt: number;
}

export const NOTE_COLORS: { name: NoteColor; label: string }[] = [
  { name: 'yellow', label: 'Yellow' },
  { name: 'pink', label: 'Pink' },
  { name: 'blue', label: 'Blue' },
  { name: 'purple', label: 'Purple' },
  { name: 'orange', label: 'Orange' },
  { name: 'green', label: 'Green' },
  { name: 'red', label: 'Red' },
  { name: 'teal', label: 'Teal' },
  { name: 'indigo', label: 'Indigo' },
  { name: 'rose', label: 'Rose' },
  { name: 'amber', label: 'Amber' },
  { name: 'emerald', label: 'Emerald' },
  { name: 'cyan', label: 'Cyan' },
  { name: 'violet', label: 'Violet' },
  { name: 'lime', label: 'Lime' },
];

export const colorClassMap: Record<NoteColor, string> = {
  yellow: 'bg-note-yellow',
  pink: 'bg-note-pink',
  blue: 'bg-note-blue',
  purple: 'bg-note-purple',
  orange: 'bg-note-orange',
  green: 'bg-note-green',
  red: 'bg-note-red',
  teal: 'bg-note-teal',
  indigo: 'bg-note-indigo',
  rose: 'bg-note-rose',
  amber: 'bg-note-amber',
  emerald: 'bg-note-emerald',
  cyan: 'bg-note-cyan',
  violet: 'bg-note-violet',
  lime: 'bg-note-lime',
};
