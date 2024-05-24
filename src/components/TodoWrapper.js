import React, {useState} from 'react'
import { TodoForm } from './TodoForm'
import {v4 as uuidv4} from 'uuid';
import { Todo } from './Todo';
import { EditTodo } from './EditTodo';

const TodoWrapper = () => {
    const [todos, setTodos] = useState([])
    const addTodo = todo => {
        let newTodo = {id: uuidv4(), task: todo, completed: false, isEditing: false}
        setTodos([...todos, newTodo])
        localStorage.setItem('list', JSON.stringify([...todos, newTodo]))
    }
    const toggleComplete = id => {
        const completed = todos.map(todo => todo.id === id ? {...todo,completed: !todo.completed} : todo)
        setTodos(completed)
        localStorage.setItem('list', JSON.stringify(completed));
    }
    const deleteTodo = id => {
        const deleted = todos.filter(todo => todo.id !==id)
        setTodos(deleted)
        localStorage.setItem('list', JSON.stringify(deleted));
    }
    const editTodo = id => {
        const updated = todos.map(todo => todo.id === id ? {...todo, isEditing: !todo.isEditing} : todo )
        setTodos(updated)
        localStorage.setItem('list', JSON.stringify(updated));
    }
    const editTask = (task,id) => {
        const updatedTask = todos.map(todo => todo.id === id ? {...todo, task, isEditing: !todo.isEditing} : todo)
        setTodos(updatedTask)
        localStorage.setItem('list', JSON.stringify(updatedTask));
    }

    React.useEffect(() => {
        const storedTodos = localStorage.getItem('list');
        if (storedTodos) {
          let temp = JSON.parse(storedTodos)
          setTodos(temp);
        }
      }, []);

  return (
    <div className='TodoWrapper' data-testid='todo-wrapper'>
    <h1>Get things done! </h1>
        <TodoForm addTodo={addTodo}/>
        {todos.map((todo, index) => (
                todo.isEditing ? (
                    <EditTodo editTodo={editTask} task={todo}/>
                ) : (
                    <Todo task={todo} key={index} toggleComplete={toggleComplete}
                    deleteTodo={deleteTodo} editTodo={editTodo}
                />
                )
            ))}
    </div>
  )
}

export default TodoWrapper;
