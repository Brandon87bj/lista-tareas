import { useState } from 'react';
import Filters from './components/Filters';
import InstallButton from './components/InstallButton';
import TaskForm from './components/TaskForm';
import TaskItem from './components/TaskItem';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { PriorityFilter, StatusFilter, Task, TaskData } from './types';

export default function App() {
  // Lista de tareas guardada en el dispositivo
  const [tasks, setTasks] = useLocalStorage<Task[]>('tareas-academicas', []);
  // Tarea que se está editando (null = el formulario agrega una nueva)
  const [editing, setEditing] = useState<Task | null>(null);
  const [status, setStatus] = useState<StatusFilter>('todas');
  const [priority, setPriority] = useState<PriorityFilter>('todas');

  // Agregar o guardar cambios, según si hay una tarea en edición
  const saveTask = (data: TaskData) => {
    if (editing) {
      setTasks(tasks.map((t) => (t.id === editing.id ? { ...t, ...data } : t)));
      setEditing(null);
    } else {
      setTasks([...tasks, { ...data, id: Date.now().toString(), completed: false }]);
    }
  };

  const toggleTask = (id: string) =>
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
    // Si se borra la tarea que se estaba editando, se cierra la edición
    if (editing?.id === id) setEditing(null);
  };

  // Se aplican los dos filtros y se ordena por fecha de entrega (la más cercana primero)
  const visibleTasks = tasks
    .filter((t) => status === 'todas' || (status === 'completadas') === t.completed)
    .filter((t) => priority === 'todas' || t.priority === priority)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));

  const pending = tasks.filter((t) => !t.completed).length;

  return (
    <main>
      <header>
        <h1>Tareas académicas</h1>
        <p>
          {pending} pendiente{pending === 1 ? '' : 's'} de {tasks.length}
        </p>
      </header>

      <InstallButton />

      <TaskForm
        key={editing?.id ?? 'nueva'}
        editing={editing}
        onSubmit={saveTask}
        onCancel={() => setEditing(null)}
      />

      <Filters
        status={status}
        priority={priority}
        onStatusChange={setStatus}
        onPriorityChange={setPriority}
      />

      {visibleTasks.length === 0 ? (
        <p className="empty">
          {tasks.length === 0
            ? 'Aún no tienes tareas. Agrega la primera con el formulario.'
            : 'Ninguna tarea coincide con los filtros.'}
        </p>
      ) : (
        <ul className="list">
          {visibleTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onEdit={setEditing}
              onDelete={deleteTask}
            />
          ))}
        </ul>
      )}
    </main>
  );
}
