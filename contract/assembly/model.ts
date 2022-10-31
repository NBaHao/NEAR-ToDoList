import { PersistentUnorderedMap, math } from "near-sdk-as";

export const todos = new PersistentUnorderedMap<u32, Todo>("todos");

@nearBindgen
export class PartialTodo {
  task: string;
  done: bool;
}

@nearBindgen
export class Todo {
  id: u32;
  owner: string;
  task: string;
  done: bool;

  constructor(task: string) {
    this.id = math.hash32<string>(task);
    this.owner = context.sender;
    this.task = task;
    this.done = false;
  }

  //add a new todo into todos
  static insert(task: string): Todo {
    const todo = new Todo(task);
    todos.set(todo.id, todo);
    return todo;
  }

  //get a todo by Id
  static findById(id: u32): Todo {
    return todos.getSome(id);
  }

  //get todo from offset to (offset+limit) in todos
  static find(offset: u32, limit: u32): Todo[] {
    return todos.values(offset, offset + limit);
  }

  //use Id to Update todo
  static findByIdAndUpdate(id: u32, partial: PartialTodo): Todo {
    const todo = this.findById(id);
    assert(todo.owner == context.sender, "You are not this task's owner");
    todo.task = partial.task;
    todo.done = partial.done;
    todos.set(id, todo);

    return todo;
  }

  //use Id to delete todo
  static findByIdAndDelete(id: u32): void {
    const todo = this.findById(id);
    assert(todo.owner == context.sender, "You are not this task's owner");
    todos.delete(id);
  }

}
