// Niveles de prioridad que puede tener una tarea
export type Priority = 'alta' | 'media' | 'baja';

// Estructura de una tarea académica
export interface Task {
  id: string;
  title: string;
  dueDate: string; // Formato AAAA-MM-DD (el que entrega <input type="date">)
  priority: Priority;
  completed: boolean;
}

// Datos que captura el formulario (el id y el estado los asigna la app)
export type TaskData = Omit<Task, 'id' | 'completed'>;

// Opciones de los filtros
export type StatusFilter = 'todas' | 'pendientes' | 'completadas';
export type PriorityFilter = Priority | 'todas';
