import { useState, type FormEvent } from 'react';
import type { Priority, Task, TaskData } from '../types';

interface Props {
  // Si llega una tarea, el formulario funciona en modo edición
  editing: Task | null;
  onSubmit: (data: TaskData) => void;
  onCancel: () => void;
}

export default function TaskForm({ editing, onSubmit, onCancel }: Props) {
  // Los campos arrancan con los datos de la tarea al editar, o vacíos al agregar.
  // App le pone una "key" distinta a cada tarea, así el estado se reinicia solo.
  const [title, setTitle] = useState(editing?.title ?? '');
  const [dueDate, setDueDate] = useState(editing?.dueDate ?? '');
  const [priority, setPriority] = useState<Priority>(editing?.priority ?? 'media');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const cleanTitle = title.trim();
    if (!cleanTitle || !dueDate) return;
    onSubmit({ title: cleanTitle, dueDate, priority });
    // Al terminar se limpia el formulario (en edición App lo reinicia por la key)
    setTitle('');
    setDueDate('');
    setPriority('media');
  };

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h2>{editing ? 'Editar tarea' : 'Nueva tarea'}</h2>

      <label>
        Actividad
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ej. Entregar práctica de React"
          required
        />
      </label>

      <div className="row">
        <label>
          Fecha de entrega
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
        </label>

        <label>
          Prioridad
          <select value={priority} onChange={(e) => setPriority(e.target.value as Priority)}>
            <option value="alta">Alta</option>
            <option value="media">Media</option>
            <option value="baja">Baja</option>
          </select>
        </label>
      </div>

      <div className="row">
        <button type="submit" className="primary">
          {editing ? 'Guardar cambios' : 'Agregar tarea'}
        </button>
        {editing && (
          <button type="button" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
