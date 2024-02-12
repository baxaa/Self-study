
export interface AuthToken {
    token: string
}

export interface Task {
    id: number,
    title: string,
    subject: string,
    description: string,
    date: string,
    user_id: number
}
export class ToDoTask {
    static currentId: number = 0;
    id: number;
    title: string;
    user_id : string
    isDone : boolean

    constructor(title: string, user_id : string) {
        this.id = ++ToDoTask.currentId;
        this.title = title;
        this.user_id = user_id
        this.isDone = false
    }
}