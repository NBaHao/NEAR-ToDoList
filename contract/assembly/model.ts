import { PersistentUnorderedMap, math, context } from "near-sdk-as";

export const todos = new PersistentUnorderedMap<u32, Todo>("todos");

@nearBindgen
export class PartialTodo {
  name: string;
  description:string;
  creator:string;
  done: bool;
}

@nearBindgen
export class Todo {
  id: u32;
  name: string;
  description:string;
  creator:string;
  done: bool;

  constructor(name: string, description:string, creator:string) {
    this.id = math.hash32<string>(name);
    this.name = name;
    this.description = description;
    this.creator = creator
    this.done = false;
  }

  //add a new todo into todos
  static insert(name: string, description:string): Todo {
    const todo = new Todo(name, description, context.sender);
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
    
    todo.name = partial.name;
    todo.done = partial.done;
    todos.set(id, todo);

    return todo;
  }

  //use Id to delete todo
  static findByIdAndDelete(id: u32): void {
    todos.delete(id);
  }

}