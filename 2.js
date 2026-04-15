import React, { useState } from 'react';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const addTask = () => {
    if (input.trim()) {
      const newTask = { id: Date.now(), text: input };
      setTasks([...tasks, newTask]);
      setInput('');
    }
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>Task List</h3>
      <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter task" />
      <button onClick={addTask}>Add Task</button>

      {tasks.length === 0 ? (
        <p>No tasks available. Add some!</p>
      ) : (
        <ul>
          {tasks.map((item) => (
            <li key={item.id}>
              {item.text} 
              <button onClick={() => removeTask(item.id)} style={{ marginLeft: '10px' }}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskManager;