import React, { useState } from 'react';
import { Check, Trash2, Edit2 } from 'lucide-react';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
}

/**
 * Componente para mostrar una tarea individual
 * Demuestra:
 * - Props y estado local
 * - Eventos del mouse
 * - Animaciones CSS
 * - Manejo de formularios inline
 */
const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.title);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editValue.trim()) {
      onEdit(task.id, editValue);
      setIsEditing(false);
    }
  };

  return (
    <div 
      className={`group flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm 
        transition-all duration-300 hover:shadow-md
        ${task.completed ? 'opacity-75' : ''}`}
    >
      <button
        onClick={() => onToggle(task.id)}
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
          transition-colors duration-300
          ${task.completed 
            ? 'bg-green-500 border-green-500' 
            : 'border-gray-300 hover:border-green-500'}`}
      >
        {task.completed && <Check size={14} className="text-white" />}
      </button>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="flex-1">
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="w-full p-1 border rounded"
            autoFocus
            onBlur={() => setIsEditing(false)}
          />
        </form>
      ) : (
        <span 
          className={`flex-1 ${task.completed ? 'line-through text-gray-500' : ''}`}
        >
          {task.title}
        </span>
      )}

      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => setIsEditing(true)}
          className="p-1 text-gray-500 hover:text-blue-500 transition-colors"
        >
          <Edit2 size={18} />
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="p-1 text-gray-500 hover:text-red-500 transition-colors"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;