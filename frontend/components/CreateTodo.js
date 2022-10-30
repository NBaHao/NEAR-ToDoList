import { useState } from "react";

const CreateTodo = ({ contract }) => {
  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(false);

  //Call create function in smart-contract to add a new task
  const handleSubmit = async (event) => {
    
    event.preventDefault();

    try {
        setLoading(true);
        const todo = await contract.create({ task });
        alert("Task Created successfully");
    } catch (error) {
        console.log({ error });
        alert("Failed to create Task");
    } finally {
        setTask("");
        setLoading(false);
    }

  };
  return (
    <form onSubmit={handleSubmit} style={{textAlign:"center", marginTop: "55px"}}>
      <input
        type="text"
        placeholder="Crate a Task"
        value={task}
        onChange={({ target }) => setTask(target.value)}
      />
      <button disabled={loading} style={{marginLeft:"20px"}}>Create Task</button>
    </form>
  );
}

export default CreateTodo;