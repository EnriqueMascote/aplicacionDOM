import React, { useState } from 'react';
import { Check, Trash2, Edit2 } from 'lucide-react';
import { Tarea } from '../../modelos/TareaModelo';

interface PropiedadesElementoTarea {
  tarea: Tarea;
  alAlternar: (id: string) => void;
  alEliminar: (id: string) => void;
  alEditar: (id: string, nuevoTitulo: string) => void;
}

/**
 * Componente para mostrar una tarea individual
 * 
 * Características demostradas:
 * - Manejo de props y estado local
 * - Eventos del mouse (hover, click)
 * - Animaciones y transiciones CSS
 * - Edición inline con formulario
 * - Iconos interactivos
 * - Estados visuales (completado, hover)
 */
const ElementoTarea: React.FC<PropiedadesElementoTarea> = ({ 
  tarea, 
  alAlternar, 
  alEliminar, 
  alEditar 
}) => {
  const [editando, setEditando] = useState(false);
  const [valorEdicion, setValorEdicion] = useState(tarea.titulo);

  const manejarEnvio = (e: React.FormEvent) => {
    e.preventDefault();
    if (valorEdicion.trim()) {
      alEditar(tarea.id, valorEdicion);
      setEditando(false);
    }
  };

  return (
    <div 
      className={`group flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm 
        transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md
        ${tarea.completada ? 'opacity-75' : ''}`}
    >
      <button
        onClick={() => alAlternar(tarea.id)}
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
          transition-all duration-300 transform hover:scale-110
          ${tarea.completada 
            ? 'bg-green-500 border-green-500' 
            : 'border-gray-300 hover:border-green-500'}`}
      >
        {tarea.completada && <Check size={14} className="text-white" />}
      </button>

      {editando ? (
        <form onSubmit={manejarEnvio} className="flex-1">
          <input
            type="text"
            value={valorEdicion}
            onChange={(e) => setValorEdicion(e.target.value)}
            className="w-full p-1 border rounded transition-all duration-200 focus:ring-2 focus:ring-blue-400"
            autoFocus
            onBlur={() => setEditando(false)}
          />
        </form>
      ) : (
        <span 
          className={`flex-1 transition-all duration-300
            ${tarea.completada ? 'line-through text-gray-500' : ''}`}
        >
          {tarea.titulo}
        </span>
      )}

      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
        <button
          onClick={() => setEditando(true)}
          className="p-1 text-gray-500 hover:text-blue-500 transition-colors duration-200 transform hover:scale-110"
        >
          <Edit2 size={18} />
        </button>
        <button
          onClick={() => alEliminar(tarea.id)}
          className="p-1 text-gray-500 hover:text-red-500 transition-colors duration-200 transform hover:scale-110"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default ElementoTarea;