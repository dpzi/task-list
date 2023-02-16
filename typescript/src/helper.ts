import { TaskProps, Task } from './task';

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