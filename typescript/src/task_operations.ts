import * as util from 'util';
import * as moment from 'moment';
import { forEachProject, splitFirstSpace } from "./helper";
import { println } from "./readlinehelper";
import { Task, TaskProps } from './task';


export class TaskOperations {

    show = (readline : any,tasks : TaskProps) => {

        forEachProject((project, taskList) => {
            println(project, readline);
            taskList.forEach((task) => {
                println(util.format("    [%s] %s: %s %s", (task.done ? 'x' : ' '), task.id, task.description, task.deadline), readline);
            });
            println('',readline);
        }, tasks);

    }

    today = (readline : any,tasks : TaskProps) => {
        forEachProject((project, taskList) => {
            println(project, readline);
            taskList.forEach((task) => {
                if(moment(moment(task.deadline).format('YYYY-MM-DD')).isSame(moment().format('YYYY-MM-DD')))
                    println(util.format("    [%s] %s: %s %s", (task.done ? 'x' : ' '), task.id, task.description, task.deadline), readline);
            });
            println('', readline);
        }, tasks);
    }

    deadline = (commandLine: string, readline: any, tasks: TaskProps) => {

        var subcommandRest = splitFirstSpace(commandLine);
        var idString = subcommandRest[0];
        var date = new Date(subcommandRest[1]);
        var found = false;
        forEachProject((project, taskList) => {
            taskList.forEach((task) => {
                if (task.id == idString) {
                    task.deadline = date;
                    found = true
                }
            });
        }, tasks);
    
        if(!found)
            println(util.format("Could not find a task with an ID of %s.", idString), readline);
    }

    add = (commandLine: string, readline: any , tasks : TaskProps) => {
        var subcommandRest = splitFirstSpace(commandLine);
        var subcommand = subcommandRest[0];
        if (subcommand === "project") {
            this.addProject(subcommandRest[1], tasks);
        } else if (subcommand === "task") {
            var projectTask = splitFirstSpace(subcommandRest[1]);
            let idString = splitFirstSpace(projectTask[1])
            this.addTask(projectTask[0], idString[0], idString[1], tasks, readline);
        }
    }

    addTask = (project: string, description: string, idString: string, tasks : TaskProps, readline: any) => {
        var projectTasks = tasks[project];
        
        if (projectTasks == null) {
            println(util.format("Could not find a project with the name \"%s\".", project), readline);
            return;
        }
        let regString =  new RegExp(/[A-z0-9]*/);
        if(regString.test(idString) == true){
            projectTasks.push(new Task(idString , description, false, null));
        }
        else{
            println(util.format("please make sure you are using number and letters without space and special char \"%s\".", idString), readline);
            return;
        }
           
    }

    addProject = (name: string, tasks: TaskProps) => {
        tasks[name] = [];
    }

    view = (commandLine: string,  readline: any, tasks: TaskProps) => {
        var subcommandRest = splitFirstSpace(commandLine);
        var subCommand = subcommandRest[0];
        if(subCommand == 'deadline'){
            forEachProject((project, taskList) => {
                println(project, readline);
                taskList.sort(function(a: any, b: any ){return a._deadline - b._deadline}).forEach((task) => {
                    println(util.format("    [%s] %s: %s %s", (task.done ? 'x' : ' '), task.id, task.description, task.deadline), readline);
                });
                println('', readline);
            },tasks);
        }
        
    }

    deleteTask = (idString: string, readline: any, tasks: TaskProps) => {

        let found = false
        forEachProject((project, taskList) => {
            let newTasklist = taskList.splice(taskList.findIndex(a => a.id === idString) , 1)
            if(newTasklist.length > 0){
                found = true
            }
        }, tasks);
    
        if(!found)
            println(util.format("Could not find a task with an ID of %s.", idString), readline);
    }

    check = (idString: string, readline : any, tasks: TaskProps) => {
        this.setDone(idString, true, readline, tasks);
    }
    

    uncheck = (idString: string, readline : any, tasks: TaskProps) => {
        this.setDone(idString, false, readline, tasks);
    }
    
    setDone = (idString: string, done: boolean, readline: any, tasks: TaskProps) => {
        var found = false;
        forEachProject((project, taskList) => {
            taskList.forEach((task) => {
                if (task.id == idString) {
                    task.done = done;
                    found = true;
                }
            });
        }, tasks);
        if(!found)
            println(util.format("Could not find a task with an ID of %d.", idString), readline);
    }

    help = (readline) => {
        println("Commands:", readline);
        println("  show", readline);
        println("  today", readline);
        println("  add project <project name>", readline);
        println("  add task <project name> <task description> <task ID>", readline);
        println("  check <task ID>", readline);
        println("  uncheck <task ID>", readline);
        println("  deadline <task ID>", readline);
        println("  delete <task ID>", readline);
        println("  view deadline", readline);
        println("", readline);
    }
    
    error = (command: string, readline) => {
        println('I don\'t know what the command "' + command + '" is.', readline);
    }
    
}




















