"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readline = require("readline");
const todo_1 = require("./todo");
const todo_storage_1 = require("./todo-storage");
const todo = new todo_1.default();
const storage = new todo_storage_1.default('./data.json');
storage.loadTasks(todo);
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const showMenu = () => {
    console.log(`
  1. Add Task
  2. View Tasks
  3. Mark Task as Complete
  4. Remove Task
  5. Exit
  `);
};
const handleUserInput = (input) => {
    switch (input.trim()) {
        case '1':
            rl.question('Enter task description: ', (desc) => {
                const newTask = todo.addTask(desc);
                console.log(`Task added: ${newTask.description}`);
                storage.saveTasks(todo);
                showMenu();
                rl.prompt();
            });
            break;
        case '2':
            const tasks = todo.getTasks();
            if (tasks.length === 0) {
                console.log('No tasks found.');
            }
            else {
                tasks.forEach(task => {
                    console.log(`${task.id}. ${task.description} [${task.completed ? 'x' : ' '}]`);
                });
            }
            showMenu();
            rl.prompt();
            break;
        case '3':
            rl.question('Enter task ID to mark as complete: ', (id) => {
                const success = todo.markTaskComplete(Number(id));
                if (success) {
                    console.log('Task marked as complete.');
                }
                else {
                    console.log('Task not found.');
                }
                storage.saveTasks(todo);
                showMenu();
                rl.prompt();
            });
            break;
        case '4':
            rl.question('Enter task ID to remove: ', (id) => {
                const success = todo.removeTask(Number(id));
                if (success) {
                    console.log('Task removed.');
                }
                else {
                    console.log('Task not found.');
                }
                storage.saveTasks(todo);
                showMenu();
                rl.prompt();
            });
            break;
        case '5':
            console.log('Goodbye!');
            rl.close();
            break;
        default:
            console.log('Invalid option. Please choose a number from 1 to 5.');
            showMenu();
            rl.prompt();
            break;
    }
};
showMenu();
rl.prompt();
rl.on('line', handleUserInput);
