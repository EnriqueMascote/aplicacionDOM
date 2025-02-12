import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

interface TaskFormProps {
  onTaskAdd: (title: string) => void;
}

/**
 * Componente de formulario para agregar nuevas tareas
 * Demuestra:
 * - Manejo de formularios
 * - Eventos del teclado
 * - Estado local con useState
 * - Eventos del mouse
 */
const TaskForm: React.FC<TaskFormProps> = ({ onTaskAdd }) => {
  const [title, setTitle] = useState('');

  // Manejador del evento submit del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onTaskAdd(title);
      setTitle('');
    }
  };

  // Manejador para la tecla Enter
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="mb-6 p-4 bg-white rounded-lg shadow-md transition-all hover:shadow-lg"
    >
      <div className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Nueva tarea..."
          className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <button
          type="submit"
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          <PlusCircle size={20} />
          Agregar
        </button>
      </div>
    </form>
  );
};

export default TaskForm;