"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Todo {
    constructor() {
        this.tasks = [];
        this.nextId = 1;
    }
    addTask(description) {
        const task = {
            id: this.nextId++,
            description,
            completed: false
        };
        this.tasks.push(task);
        return task;
    }
    getTasks() {
        return this.tasks;
    }
    markTaskComplete(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = true;
            return true;
        }
        return false;
    }
    removeTask(id) {
        const index = this.tasks.findIndex(t => t.id === id);
        if (index !== -1) {
            this.tasks.splice(index, 1);
            return true;
        }
        return false;
    }
}
exports.default = Todo;
