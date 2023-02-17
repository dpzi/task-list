/// <reference path="../typings/node/node.d.ts" />

import { Task } from './task';
import { splitFirstSpace } from './helper';
import { TaskOperations } from './task_operations';
import { createReadlineInterface, readLineOnClose } from './readlinehelper';


export class TaskList
{
    static QUIT = 'quit';
    private readline;
    private tasks: {[index: string]: Task[]} = {};
    
    constructor(reader: NodeJS.ReadableStream, writer: NodeJS.WritableStream) {

        this.readline = createReadlineInterface(reader, writer);

        this.readline.setPrompt("> ");
        this.readline.on('line', (cmd) => {
            if(cmd == TaskList.QUIT) {
                this.readline.close();
                return;
            }
            this.execute(cmd);
            this.readline.prompt();
        });

        readLineOnClose(writer, this.readline);
    }

    run() {
        this.readline.prompt();
    }

    execute(commandLine: string) {
        
        const TaskOperation = new TaskOperations();

        var commandRest = splitFirstSpace(commandLine);
        var command = commandRest[0];
        switch (command) {
            case "show":
                TaskOperation.show(this.readline, this.tasks);
                break;
            case "today":
                TaskOperation.today(this.readline, this.tasks);
                break;
            case "add":
                TaskOperation.add(commandRest[1], this.readline, this.tasks);
                break;
            case "check":
                TaskOperation.check(commandRest[1], this.readline, this.tasks);
                break;
            case "uncheck":
                TaskOperation.uncheck(commandRest[1], this.readline, this.tasks);
                break;
            case "help":
                TaskOperation.help(this.readline);
                break;
            case "deadline":
                TaskOperation.deadline(commandRest[1], this.readline, this.tasks);
                break;
            case "view":
                TaskOperation.view(commandRest[1], this.readline, this.tasks);
                break;
            case "delete":
                TaskOperation.deleteTask(commandRest[1], this.readline, this.tasks);
                break;
            default:
                TaskOperation.error(command, this.readline);
                break;
        }
    }


}

if(require.main == module) {
    new TaskList(process.stdin, process.stdout).run()
}
