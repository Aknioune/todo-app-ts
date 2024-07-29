import * as fs from 'fs';
import Todo from './todo';
import { Task } from './types';

class TodoStorage {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  saveTasks(todo: Todo) {
    const tasks = todo.getTasks();
    fs.writeFileSync(this.filePath, JSON.stringify(tasks, null, 2));
  }

  loadTasks(todo: Todo) {
    if (fs.existsSync(this.filePath)) {
      const data = fs.readFileSync(this.filePath, 'utf8');
      const tasks: Task[] = JSON.parse(data);
      tasks.forEach(task => todo['tasks'].push(task));
      if (tasks.length > 0) {
        todo['nextId'] = Math.max(...tasks.map(t => t.id)) + 1;
      }
    }
  }
}

export default TodoStorage;
