import type { Task } from '../types';

interface Props {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

// Convierte "2026-10-20" en "20 oct 2026". Se agrega la hora para que
// el navegador no corra la fecha un día por la zona horaria.
const formatDate = (date: string) =>
  new Date(`${date}T00:00:00`).toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

// Fecha de hoy en formato AAAA-MM-DD, para saber si una tarea ya venció
const today = () => {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
};

export default function TaskItem({ task, onToggle, onEdit, onDelete }: Props) {
  const overdue = !task.completed && task.dueDate < today();

  return (
    <li className={`card task ${task.completed ? 'done' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        aria-label={`Marcar "${task.title}" como completada`}
      />

      <div className="task-info">
        <strong>{task.title}</strong>
        <span className={overdue ? 'date overdue' : 'date'}>
          {overdue ? 'Vencida: ' : 'Entrega: '}
          {formatDate(task.dueDate)}
        </span>
      </div>

      <span className={`badge ${task.priority}`}>{task.priority}</span>

      <div className="actions">
        <button onClick={() => onEdit(task)}>Editar</button>
        <button className="danger" onClick={() => onDelete(task.id)}>
          Eliminar
        </button>
      </div>
    </li>
  );
}
