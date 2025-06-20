import { Worker, isMainThread, parentPort, workerData } from 'worker_threads';

/**
 * Worker Pool - Gestión eficiente de hilos
 * 
 * Ejemplo: Procesamiento paralelo de tareas intensivas
 */
class WorkerPool {
  private workers: Worker[] = [];
  private taskQueue: Array<{ task: any; resolve: Function; reject: Function }> = [];

  constructor(poolSize: number, workerScript: string) {
    for (let i = 0; i < poolSize; i++) {
      const worker = new Worker(workerScript);
      worker.on('message', (result) => {
        const { resolve } = this.taskQueue.shift()!;
        resolve(result);
        this.processNext();
      });
      
      worker.on('error', (err) => {
        const { reject } = this.taskQueue.shift()!;
        reject(err);
      });
      
      this.workers.push(worker);
    }
  }

  execute(task: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.taskQueue.push({ task, resolve, reject });
      if (this.workers.length > 0) this.processNext();
    });
  }

  private processNext() {
    if (this.taskQueue.length === 0) return;
    
    const worker = this.workers.pop()!;
    const { task } = this.taskQueue[0];
    worker.postMessage(task);
  }
}

// Ejemplo de uso (en main thread)
if (isMainThread) {
  const pool = new WorkerPool(4, __filename);
  
  const tasks = Array.from({ length: 10 }, (_, i) => i);
  const results = await Promise.all(
    tasks.map(task => pool.execute(task))
  );
  
  console.log('Resultados procesados:', results);
} else {
  // Código del worker
  parentPort!.on('message', (task) => {
    const result = task * 2; // Procesamiento intensivo simulado
    parentPort!.postMessage(result);
  });
}
