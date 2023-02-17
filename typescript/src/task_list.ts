/// <reference path="../typings/node/node.d.ts" />

import { Task } from './task';
import { execute } from './helper';
import { TaskOperations } from './task_operations';
import { createReadlineInterface, readLineOnClose } from './readlinehelper';


export class TaskList
{
    private static QUIT = 'quit';
    private readline : any;
    private tasks: {[index: string]: Task[]} = {};
    private taskOperation: TaskOperations;
    
    constructor(reader: NodeJS.ReadableStream, writer: NodeJS.WritableStream) {

        this.readline = createReadlineInterface(reader, writer);
        this.taskOperation = new TaskOperations();
        this.readline.setPrompt("> ");
        this.readline.on('line', (cmd) => {
            if(cmd == TaskList.QUIT) {
                this.readline.close();
                return;
            }
            execute(cmd, this.taskOperation, this.readline, this.tasks);
            this.readline.prompt();
        });

        
        readLineOnClose(writer, this.readline);
    }

    run() {
        this.readline.prompt();
    }


}

if(require.main == module) {
    new TaskList(process.stdin, process.stdout).run()
}
