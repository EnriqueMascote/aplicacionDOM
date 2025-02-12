/**
 * Modelo de Tarea
 * Representa la estructura y lógica de negocio para las tareas
 */
export interface Tarea {
  id: string;
  titulo: string;
  completada: boolean;
  fechaCreacion: Date;
}

// Estados de carga para la aplicación
export type EstadoCarga = 'inactivo' | 'cargando' | 'exito' | 'error';

// Clase modelo para manejar la lógica de negocio de las tareas
export class TareaModelo {
  private tareas: Tarea[] = [];

  constructor() {}

  obtenerTareas(): Tarea[] {
    return [...this.tareas];
  }

  agregarTarea(titulo: string): Tarea {
    const nuevaTarea: Tarea = {
      id: Math.random().toString(36).substr(2, 9),
      titulo,
      completada: false,
      fechaCreacion: new Date()
    };
    this.tareas.push(nuevaTarea);
    return nuevaTarea;
  }

  actualizarTarea(id: string, actualizaciones: Partial<Tarea>): Tarea {
    const indice = this.tareas.findIndex(t => t.id === id);
    if (indice === -1) throw new Error('Tarea no encontrada');
    
    const tareaActualizada = { ...this.tareas[indice], ...actualizaciones };
    this.tareas[indice] = tareaActualizada;
    return tareaActualizada;
  }

  eliminarTarea(id: string): void {
    this.tareas = this.tareas.filter(t => t.id !== id);
  }
}