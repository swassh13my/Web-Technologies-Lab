import React, { useState } from 'react';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const addTask = () => {
    if (input.trim() === '') return;
    const newTask = { id: Date.now(), text: input };
    setTasks([...tasks, newTask]);
    setInput('');
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Task List</h2>
      <input 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        placeholder="Add a new task..." 
      />
      <button onClick={addTask}>Add</button>

      {tasks.length === 0 ? (
        <p>No tasks added yet.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              {task.text} 
              <button onClick={() => removeTask(task.id)} style={{ marginLeft: '10px' }}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskManager;