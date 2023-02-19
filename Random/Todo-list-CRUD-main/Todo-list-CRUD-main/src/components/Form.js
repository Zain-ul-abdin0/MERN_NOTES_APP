import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import axios  from "axios";

const Form = ({ input, setInput, todos, setTodos, editTodo, setEditTodo }) => {
  const updateTodo = (title, id, completed) => {
    axios
    .put(
"http://localhost:3000/api/v1/notes/update/" + id,{'name':title,'description':title})
    .then((res) => {
      if (res.status === 200) {
        alert("Student successfully deleted");
        window.location.reload();
        setTodos(todos.filter((todo) => todo.id !== id));

      } else Promise.reject();
    })
    .catch((err) => alert("Something went wrong"));
    const newTodo = todos.map((todo) =>
      todo.id === id ? { title, id, completed } : todo
    );
    setTodos(newTodo);
    setEditTodo("");
  };

  useEffect(() => {
    if (editTodo) {
      setInput(editTodo.title);
    } else {
      setInput("");
    }
  }, [setInput, editTodo]);

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const onFormSubmit = (event) => {
    event.preventDefault(); // to prevent page refresh
    if (!editTodo) {
      setTodos([...todos, { id: uuidv4(), title: input, completed: false }]);
      setInput("");
      axios.post(
        'http://localhost:3000/api/v1/notes', 
            {'name':input,'description':input})
              .then(res => {
                if (res.status === 200)
                  alert('Student successfully created')
                else
                  Promise.reject()
              })
              .catch(err => alert('Something went wrong'))
    } else {
      updateTodo(input, editTodo.id, editTodo.completed);
    }
  };

  return (
    <form onSubmit={onFormSubmit}>
      <input
        type="text"
        placeholder="Enter a Note..."
        className="task-input"
        value={input}
        required
        onChange={onInputChange}
      />
      <button className="button-add" type="submit">
        {editTodo ? "OK" : "Add"}
      </button>
    </form>
  );
};

export default Form;
