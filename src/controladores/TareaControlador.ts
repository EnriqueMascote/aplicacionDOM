/**
 * Controlador de Tareas
 * Maneja la lógica de negocio y la comunicación entre el modelo y la vista
 */
import { TareaModelo, Tarea, EstadoCarga } from '../modelos/TareaModelo';
import { ApiServicio } from '../servicios/ApiServicio';

export class TareaControlador {
  private modelo: TareaModelo;
  private api: ApiServicio;

  constructor() {
    this.modelo = new TareaModelo();
    this.api = new ApiServicio();
  }

  async cargarTareas(): Promise<{ tareas: Tarea[], estado: EstadoCarga }> {
    try {
      const tareas = await this.api.obtenerTareas();
      return { tareas, estado: 'exito' };
    } catch (error) {
      return { tareas: [], estado: 'error' };
    }
  }

  async agregarTarea(titulo: string): Promise<Tarea | null> {
    try {
      return await this.api.crearTarea(titulo);
    } catch (error) {
      return null;
    }
  }

  async alternarTarea(id: string, completada: boolean): Promise<Tarea | null> {
    try {
      return await this.api.actualizarTarea(id, { completada });
    } catch (error) {
      return null;
    }
  }

  async editarTarea(id: string, titulo: string): Promise<Tarea | null> {
    try {
      return await this.api.actualizarTarea(id, { titulo });
    } catch (error) {
      return null;
    }
  }

  async eliminarTarea(id: string): Promise<boolean> {
    try {
      await this.api.eliminarTarea(id);
      return true;
    } catch (error) {
      return false;
    }
  }
}