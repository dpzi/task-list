import { TaskProps, Task } from './task';
import { TaskOperations } from './task_operations';

export const splitFirstSpace = (s: string) => {
    var pos = s.indexOf(' ');
    if(pos === -1) {
        return [s];
    }
    return [s.substr(0, pos), s.substr(pos+1)]
}

export const forEachProject = (func: (key: string, value: Task[]) => any, tasks : TaskProps) => {
    for(var key in tasks) {
        if(tasks.hasOwnProperty(key))
            func(key, tasks[key])
    }
}

export const execute = (commandLine: string, taskOperation: TaskOperations, readline : any, tasks : TaskProps) => {

    var commandRest = splitFirstSpace(commandLine);
    var command = commandRest[0];
    switch (command) {
        case "show":
            taskOperation.show(readline, tasks);
            break;
        case "today":
            taskOperation.today(readline, tasks);
            break;
        case "add":
            taskOperation.add(commandRest[1], readline, tasks);
            break;
        case "check":
            taskOperation.check(commandRest[1], readline, tasks);
            break;
        case "uncheck":
            taskOperation.uncheck(commandRest[1], readline, tasks);
            break;
        case "help":
            taskOperation.help(readline);
            break;
        case "deadline":
            taskOperation.deadline(commandRest[1], readline, tasks);
            break;
        case "view":
            taskOperation.view(commandRest[1], readline, tasks);
            break;
        case "delete":
            taskOperation.deleteTask(commandRest[1], readline, tasks);
            break;
        default:
            taskOperation.error(command, readline);
            break;
    }
}