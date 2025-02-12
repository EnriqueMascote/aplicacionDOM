import React from 'react';

interface PropiedadesExplicacion {
  titulo: string;
  descripcion: string;
  ejemplo?: string;
}

/**
 * Componente para mostrar explicaciones
 * Muestra información sobre las características y conceptos implementados
 */
const ExplicacionCaracteristica: React.FC<PropiedadesExplicacion> = ({
  titulo,
  descripcion,
  ejemplo
}) => {
  return (
    <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200 transition-all duration-300 hover:shadow-md">
      <h3 className="text-lg font-semibold text-blue-800 mb-2">{titulo}</h3>
      <p className="text-blue-600 mb-2">{descripcion}</p>
      {ejemplo && (
        <pre className="bg-white p-2 rounded text-sm text-gray-700 overflow-x-auto">
          {ejemplo}
        </pre>
      )}
    </div>
  );
};

export default ExplicacionCaracteristica;