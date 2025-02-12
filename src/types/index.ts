// Definición de tipos para nuestras tareas
export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

// Tipo para el estado de carga
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';