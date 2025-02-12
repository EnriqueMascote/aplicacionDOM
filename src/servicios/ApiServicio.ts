/**
 * Servicio de API
 * Simula una capa de servicios para interactuar con un backend
 */
import { Tarea } from '../modelos/TareaModelo';

// Simulamos un retraso para demostrar estados de carga
const simularRetraso = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class ApiServicio {
  private tareas: Tarea[] = [];

  async obtenerTareas(): Promise<Tarea[]> {
    await simularRetraso(1000);
    return [...this.tareas];
  }

  async crearTarea(titulo: string): Promise<Tarea> {
    await simularRetraso(500);
    const nuevaTarea: Tarea = {
      id: Math.random().toString(36).substr(2, 9),
      titulo,
      completada: false,
      fechaCreacion: new Date()
    };
    this.tareas.push(nuevaTarea);
    return nuevaTarea;
  }

  async actualizarTarea(id: string, actualizaciones: Partial<Tarea>): Promise<Tarea> {
    await simularRetraso(500);
    const indice = this.tareas.findIndex(t => t.id === id);
    if (indice === -1) throw new Error('Tarea no encontrada');
    
    const tareaActualizada = { ...this.tareas[indice], ...actualizaciones };
    this.tareas[indice] = tareaActualizada;
    return tareaActualizada;
  }

  async eliminarTarea(id: string): Promise<void> {
    await simularRetraso(500);
    this.tareas = this.tareas.filter(t => t.id !== id);
  }
}