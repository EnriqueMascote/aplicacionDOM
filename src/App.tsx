import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import FormularioTarea from './vistas/componentes/FormularioTarea';
import ElementoTarea from './vistas/componentes/ElementoTarea';
import ExplicacionCaracteristica from './vistas/componentes/ExplicacionCaracteristica';
import { TareaControlador } from './controladores/TareaControlador';
import { Tarea, EstadoCarga } from './modelos/TareaModelo';

function App() {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [estadoCarga, setEstadoCarga] = useState<EstadoCarga>('inactivo');
  const [error, setError] = useState<string | null>(null);

  const controlador = new TareaControlador();

  useEffect(() => {
    const cargarTareas = async () => {
      setEstadoCarga('cargando');
      const { tareas, estado } = await controlador.cargarTareas();
      setTareas(tareas);
      setEstadoCarga(estado);
    };

    cargarTareas();
  }, []);

  const manejarAgregarTarea = async (titulo: string) => {
    const nuevaTarea = await controlador.agregarTarea(titulo);
    if (nuevaTarea) {
      setTareas(prev => [...prev, nuevaTarea]);
    } else {
      setError('Error al crear la tarea');
    }
  };

  const manejarAlternarTarea = async (id: string) => {
    const tarea = tareas.find(t => t.id === id);
    if (!tarea) return;
    
    const tareaActualizada = await controlador.alternarTarea(id, !tarea.completada);
    if (tareaActualizada) {
      setTareas(prev => prev.map(t => t.id === id ? tareaActualizada : t));
    } else {
      setError('Error al actualizar la tarea');
    }
  };

  const manejarEditarTarea = async (id: string, nuevoTitulo: string) => {
    const tareaActualizada = await controlador.editarTarea(id, nuevoTitulo);
    if (tareaActualizada) {
      setTareas(prev => prev.map(t => t.id === id ? tareaActualizada : t));
    } else {
      setError('Error al editar la tarea');
    }
  };

  const manejarEliminarTarea = async (id: string) => {
    const exito = await controlador.eliminarTarea(id);
    if (exito) {
      setTareas(prev => prev.filter(t => t.id !== id));
    } else {
      setError('Error al eliminar la tarea');
    }
  };

  const explicaciones = [
    {
      titulo: "Patrón MVC",
      descripcion: "Esta aplicación implementa el patrón Modelo-Vista-Controlador (MVC):",
      ejemplo: `
Modelo (TareaModelo.ts): Maneja la lógica de negocio
Controlador (TareaControlador.ts): Coordina el modelo y la vista
Vista (componentes): Maneja la interfaz de usuario`
    },
    {
      titulo: "Estados y Efectos en React",
      descripcion: "Uso de hooks useState y useEffect para manejar el estado y efectos secundarios:",
      ejemplo: `
const [tareas, setTareas] = useState<Tarea[]>([]);
useEffect(() => { /* Cargar tareas */ }, []);`
    },
    {
      titulo: "Operaciones Asíncronas",
      descripcion: "Demostración de async/await y manejo de promesas:",
      ejemplo: `
async function cargarTareas() {
  const resultado = await controlador.cargarTareas();
  // Procesar resultado
}`
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Unidad 2: Demostración de manejo de DOM y características del desarrollo web
          </h1>
          <p className="text-gray-600">
            Ejemplo de React + Vite con patrón MVC haciendo una lista de tareas
          </p>
        </header>

        <div className="mb-8">
          {explicaciones.map((exp, index) => (
            <ExplicacionCaracteristica
              key={index}
              titulo={exp.titulo}
              descripcion={exp.descripcion}
              ejemplo={exp.ejemplo}
            />
          ))}
        </div>

        <FormularioTarea alAgregarTarea={manejarAgregarTarea} />

        {estadoCarga === 'cargando' && (
          <div className="flex justify-center p-8">
            <Loader2 className="animate-spin text-blue-500" size={32} />
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="space-y-3">
          {tareas.map(tarea => (
            <ElementoTarea
              key={tarea.id}
              tarea={tarea}
              alAlternar={manejarAlternarTarea}
              alEliminar={manejarEliminarTarea}
              alEditar={manejarEditarTarea}
            />
          ))}
        </div>

        {estadoCarga === 'exito' && tareas.length === 0 && (
          <p className="text-center text-gray-500 mt-8 animate-pulse">
            No hay tareas pendientes. ¡Añade una!
          </p>
        )}
      </div>
    </div>
  );
}

export default App;