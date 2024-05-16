import {useEffect, useState} from 'react'
import axios from "axios"
import './App.css'

function App() {
    const [tasks, setTasks] = useState([])
    const [taskName, setTaskName] = useState('');
    const handleInputChange = (event) => {
        setTaskName(event.target.value);
    };

    const getAllTask =()=>{
         axios.get('http://localhost:3000/api/v1/task/').then(res => {
            setTasks(res.data)
        }).catch(err => {
            console.log(err, "Error while fetching")
        })
    }
    useEffect(() => {
       getAllTask()
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Make POST request to your backend server
            const response = await axios.post('http://localhost:3000/api/v1/task/create', {
                title: taskName,
                // Add other task properties here if needed
            });
            console.log(response)
            getAllTask()
            setTaskName('');
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

     const checkTask = async (id) => {

        try {
            // Make POST request to your backend server
            const response = await axios.patch(`http://localhost:3000/api/v1/task/${id}`, {
                status: 'Completed',
                // Add other task properties here if needed
            });
            console.log(response)
            getAllTask()
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    return (<>
        <h1>Todo App</h1>
        <table id="customers">
            <tr>
                <th>Task</th>
                <th>Created At</th>
                <th>Status</th>
            </tr>
            {tasks.map((task, i) => {
                return <tr key={i}>
                    <td>{task.title} | {task._id}</td>
                    <td>{task.createdAt} </td>
                    <td>
                        {task.status}
                    {/*    <input*/}
                    {/*    type="checkbox"*/}
                    {/*    checked={task.status === 'Completed'}*/}
                    {/*/>*/}
                        <button onClick={checkTask(task._id)}>Complete Task</button>
                    </td>
                </tr>
            })}
        </table>
        <h5>Add Task</h5>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter task name"
                value={taskName}
                onChange={handleInputChange}
            />
            <button type="submit">Add Task</button>
        </form>
        {
            taskName
        }
    </>)
}

export default App
