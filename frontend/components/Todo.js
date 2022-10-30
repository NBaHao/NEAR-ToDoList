import { useState } from "react";
<link href='https://css.gg/trash.css' rel='stylesheet'></link>
export function Todo({ contract, id, task, done }) {
  
  // Call update function in smart-contract
  const [checked, setChecked] = useState(done);
  
  const complete = async ({ target }) => {
    setChecked(target.checked);
    try {
        await contract.update({ id, updates: { task, done: target.checked } });
        alert("Task updated successfully")
    } catch (error) {
        alert("Failed to update Task")
    }
  };

  // Call del function in smart-contract
  const del = async () => {
    try {
        await contract.del({ id });
        alert("Task Deleted successfully")
    } catch (error) {
        alert("Failed to delete Task")
    }
  };

  return (
    <>
      <p style={{fontSize:"35px"}}>
        <input type="checkbox"
            checked={checked}
            onChange={complete}
            style={{
                backgroundColor:"#2196F3",
                border: "solid white",
                height: "20px",
                width: "20px",
                borderRadius: "0",
                marginRight: "16px"
                }}/>
        {task}
      <button onClick={del} 
              style={{
                backgroundColor:"rgb(247 81 81)",
                fontSize: "20px",
                padding: "1px 8px",
                float: "right",
                marginTop: "10px"
              }}>
        DEL
      </button>
      </p>
    </>
  );
}