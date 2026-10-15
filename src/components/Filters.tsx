import type { PriorityFilter, StatusFilter } from '../types';

interface Props {
  status: StatusFilter;
  priority: PriorityFilter;
  onStatusChange: (value: StatusFilter) => void;
  onPriorityChange: (value: PriorityFilter) => void;
}

export default function Filters({ status, priority, onStatusChange, onPriorityChange }: Props) {
  return (
    <div className="card row filters">
      <label>
        Estado
        <select value={status} onChange={(e) => onStatusChange(e.target.value as StatusFilter)}>
          <option value="todas">Todas</option>
          <option value="pendientes">Pendientes</option>
          <option value="completadas">Completadas</option>
        </select>
      </label>

      <label>
        Prioridad
        <select value={priority} onChange={(e) => onPriorityChange(e.target.value as PriorityFilter)}>
          <option value="todas">Todas</option>
          <option value="alta">Alta</option>
          <option value="media">Media</option>
          <option value="baja">Baja</option>
        </select>
      </label>
    </div>
  );
}
