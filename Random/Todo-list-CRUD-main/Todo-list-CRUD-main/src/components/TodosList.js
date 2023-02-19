import React from "react";
import axios  from "axios";

const TodosList = ({ todos, setTodos, setEditTodo }) => {
  const handleComplete = (todo) => {
    setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
          return { ...item, completed: !item.completed };
        }
        return item;
      })
    );
  };

  const handleDelete = ({ id }) => {
    axios
    .delete(
"http://localhost:3000/api/v1/notes/delete/" + id)
    .then((res) => {
      if (res.status === 200) {
        alert("Student successfully deleted");
        window.location.reload();
        setTodos(todos.filter((todo) => todo.id !== id));

      } else Promise.reject();
    })
    .catch((err) => alert("Something went wrong"));
  };

  const handleEdit = ({ id }) => {
    const findTodo = todos.find((todo) => todo.id === id);
    setEditTodo(findTodo);
  };

  return (
    <div>
      {todos.map((todo) => (
        <li className="todo-list" key={todo.id}>
          <input
            type="text"
            value={todo.name}
            className={`list ${todo.completed ? "complete" : ""} `}
            onChange={(event) => event.preventDefault()}
          />
          <div>
            <button
              className="button-complete task-button"
              onClick={() => handleComplete(todo)}
            >
              <i className="fa fa-check-circle"></i>
            </button>
            <button
              className="button-edit task-button"
              onClick={() => handleEdit(todo)}
            >
              <i className="fa fa-edit"></i>
            </button>
            <button
              className="button-delete task-button"
              onClick={() => handleDelete(todo)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </div>
        </li>
      ))}
    </div>
  );
};

export default TodosList;
