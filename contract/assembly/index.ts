import { Todo, PartialTodo } from "./model";
import { context, ContractPromiseBatch, u128 } from "near-sdk-as";


export function create(name: string, description:string): Todo {
  return Todo.insert(name, description);
}

export function getById(id: u32): Todo {
  return Todo.findById(id);
}

export function get(offset: u32, limit: u32 = 10): Todo[] {
  return Todo.find(offset, limit);
}

export function update(id: u32, updates: PartialTodo): Todo {
  assert(updates.creator.toString() == context.sender.toString(),"You don't have permission to edit sneaker");
  ContractPromiseBatch.create(updates.creator).transfer(context.attachedDeposit);
  return Todo.findByIdAndUpdate(id, updates);
}

export function del(id: u32): void {
  Todo.findByIdAndDelete(id);
}