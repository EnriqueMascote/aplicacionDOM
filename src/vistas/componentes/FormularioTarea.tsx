import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

interface PropiedadesFormularioTarea {
  alAgregarTarea: (titulo: string) => void;
}

const FormularioTarea: React.FC<PropiedadesFormularioTarea> = ({ alAgregarTarea }) => {
  const [titulo, setTitulo] = useState('');

  const manejarEnvio = (e: React.FormEvent) => {
    e.preventDefault();
    if (titulo.trim()) {
      alAgregarTarea(titulo);
      setTitulo('');
    }
  };

  const manejarTeclaPresionada = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      manejarEnvio(e);
    }
  };

  return (
    <form 
      onSubmit={manejarEnvio}
      className="mb-6 p-4 bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
    >
      <div className="flex gap-2">
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          onKeyPress={manejarTeclaPresionada}
          placeholder="Nueva tarea..."
          className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-200"
        />
        <button
          type="submit"
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-200 transform hover:scale-105"
        >
          <PlusCircle size={20} />
          Agregar
        </button>
      </div>
    </form>
  );
};

export default FormularioTarea;