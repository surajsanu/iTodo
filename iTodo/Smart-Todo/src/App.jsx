import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const handleEdit = (e, id) => {
    let t = todos.filter((item) => item.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };
  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };
  const handleAdd = (e) => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    saveToLS();
  };
  const handleChange = (e) => {
    setTodo(e.target.value);
  };
  const handleCheckbox = (e) => {
    let id = e.target.name;

    let index = todos.findIndex((item) => {
      return item.id == id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  };

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  return (
    <div className="md:w-full md:h-screen">
      <Navbar />
      <div className="md:mx-auto rounded-lg p-5 bg-violet-200 bg-opacity-45 min-h-[70vh]">
        <div>
          <div className="addTodo my-5">
            <h2 className="text-xl font-bold">Add A Todo</h2>
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              className="w-1/3"
            />
            <button
              onClick={handleAdd}
              disabled={todo.length < 3}
              className="bg-violet-800 disabled:bg-violet-800 hover:bg-violet-950 p-3 py-1 m-5 font-bold text-white rounded-md "
            >
              Add
            </button>
          </div>
          <div>
            <h1 className="text-xl font-bold">Your Tasks</h1>
            <div className="todos">
              {todos.length === 0 && (
                <div className="m-5 font-serif font-semibold">
                  Nothing To do, Be workholic
                </div>
              )}
              {todos.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="todo flex md:w-1/3 my-3 justify-between"
                  >
                    <input
                      className="mx-5"
                      type="checkbox"
                      onChange={handleCheckbox}
                      value={item.isCompleted}
                      name={item.id}
                    />
                    <div className={item.isCompleted ? "line-through" : ""}>
                      {item.todo}{" "}
                    </div>
                    <div className="buttons flex h-full">
                      <button
                        onClick={(e) => handleEdit(e, item.id)}
                        className="bg-violet-800 hover:bg-violet-950 p-3 py-1 mx-1 font-bold text-white rounded-md "
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => handleDelete(e, item.id)}
                        className="bg-violet-800 hover:bg-violet-950 p-3 py-1 mx-1 font-bold text-white rounded-md "
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
