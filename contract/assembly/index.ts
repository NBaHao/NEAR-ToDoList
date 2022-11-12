import { Todo, PartialTodo } from "./model";

// allow users to create a task
export function create(task: string): Todo {
  assert(task.length > 0, "Empty task");
  return Todo.insert(task);
}
// allow users to get a task
export function getById(id: u32): Todo {
  return Todo.findById(id);
}
// allow users to tasks starting from an offset up to the added limit
export function get(offset: u32, limit: u32 = 10): Todo[] {
  return Todo.find(offset, limit);
}

// allow users to update their tasks as done
export function update(id: u32, updates: PartialTodo): Todo {
  return Todo.findByIdAndUpdate(id, updates);
}

// allow users to delete their tasks
export function del(id: u32): void {
  Todo.findByIdAndDelete(id);
}
