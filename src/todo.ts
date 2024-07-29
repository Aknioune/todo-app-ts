import { Task } from './types';

class Todo {
  private tasks: Task[] = [];
  private nextId: number = 1;

  addTask(description: string): Task {
    const task: Task = {
      id: this.nextId++,
      description,
      completed: false
    };
    this.tasks.push(task);
    return task;
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  markTaskComplete(id: number): boolean {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = true;
      return true;
    }
    return false;
  }

  removeTask(id: number): boolean {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      return true;
    }
    return false;
  }
}

export default Todo;
