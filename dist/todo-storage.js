"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
class TodoStorage {
    constructor(filePath) {
        this.filePath = filePath;
    }
    saveTasks(todo) {
        const tasks = todo.getTasks();
        fs.writeFileSync(this.filePath, JSON.stringify(tasks, null, 2));
    }
    loadTasks(todo) {
        if (fs.existsSync(this.filePath)) {
            const data = fs.readFileSync(this.filePath, 'utf8');
            const tasks = JSON.parse(data);
            tasks.forEach(task => todo['tasks'].push(task));
            if (tasks.length > 0) {
                todo['nextId'] = Math.max(...tasks.map(t => t.id)) + 1;
            }
        }
    }
}
exports.default = TodoStorage;
