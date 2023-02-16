/// <reference path="../typings/node/node.d.ts" />

import { Task } from './task';
import { splitFirstSpace } from './helper';
import { show, deadline, today, add, check, uncheck, help, deleteTask, view, error } from './task_operations';
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
        var commandRest = splitFirstSpace(commandLine);
        var command = commandRest[0];
        switch (command) {
            case "show":
                show(this.readline, this.tasks);
                break;
            case "today":
                today(this.readline, this.tasks);
                break;
            case "add":
                add(commandRest[1], this.readline, this.tasks);
                break;
            case "check":
                check(commandRest[1], this.readline, this.tasks);
                break;
            case "uncheck":
                uncheck(commandRest[1], this.readline, this.tasks);
                break;
            case "help":
                help(this.readline);
                break;
            case "deadline":
                deadline(commandRest[1], this.readline, this.tasks);
                break;
            case "view":
                view(commandRest[1], this.readline, this.tasks);
                break;
            case "delete":
                deleteTask(commandRest[1], this.readline, this.tasks);
                break;
            default:
                error(command, this.readline);
                break;
        }
    }


}

if(require.main == module) {
    new TaskList(process.stdin, process.stdout).run()
}
