import { useEffect, useState } from "react";
import { Todo } from "./Todo";

const PER_PAGE_LIMIT = 3;

const TodoList = ({ contract }) => {
  const [todos, setTodos] = useState([]);
  const [page, setPage] = useState(1);

  //Call (viewMethod) get function in smart-contract to display tasks (todos)
  useEffect(() => {
    let offset; 
    if(page < 1) {
      setPage(1);
      offset = 0;
    } else {
      offset = (page - 1) * PER_PAGE_LIMIT;
    }

    const id = setInterval(() => {
      contract
        .get({ offset, limit: PER_PAGE_LIMIT })
        .then((todos) => setTodos(todos));
    }, 1000);

    return () => clearInterval(id);
  }, [page, contract]);

  return (
    <ul style={{maxWidth: "480px", margin: "auto", padding: "0"}}>
      
      <div style={{textAlign: "center"}}>
        <div className="flex" style={{marginTop: "36px"}}>
        Current Page: {page}
        </div>
        <button onClick={() => setPage((page) => page - 1)} style={{padding: "0 8px", margin: "5px 10px"}}>&lt;</button>
        {" "}
        <button onClick={() => setPage((page) => page + 1)} style={{padding: "0 8px", margin: "0 10px"}}>&gt;</button>
      </div>
      
      {todos.map((todo) => (
      
      <li key={todo.id}>
        <Todo contract={contract} {...todo} />
      </li>
      ))}
    </ul>
  );
}

export default TodoList;