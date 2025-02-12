/**
 * Simulación de una API para demostrar conceptos de async/await y manejo de promesas
 */

import { Task } from '../types';

// Simulamos un delay para demostrar estados de carga
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Almacenamiento local
let tasks: Task[] = [];

export const api = {
  // Obtener todas las tareas
  async getTasks(): Promise<Task[]> {
    await delay(1000); // Simulamos latencia de red
    return [...tasks];
  },

  // Crear una nueva tarea
  async createTask(title: string): Promise<Task> {
    await delay(500);
    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      completed: false,
      createdAt: new Date()
    };
    tasks = [...tasks, newTask];
    return newTask;
  },

  // Actualizar una tarea
  async updateTask(id: string, updates: Partial<Task>): Promise<Task> {
    await delay(500);
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex === -1) throw new Error('Tarea no encontrada');
    
    const updatedTask = { ...tasks[taskIndex], ...updates };
    tasks = tasks.map(t => t.id === id ? updatedTask : t);
    return updatedTask;
  },

  // Eliminar una tarea
  async deleteTask(id: string): Promise<void> {
    await delay(500);
    tasks = tasks.filter(t => t.id !== id);
  }
};