import { useState } from "react";
import axios from "axios";
import { useMutation } from "react-query";

import "./styles.css";

export default function App() {
  const [todo, setTodo] = useState("");

  const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  });

  const sendToDo = (payload) =>
    api
      .post("/todos", payload)
      .then((res) => res.data)
      .catch((err) => {
        return err;
      });

  const { mutate, isLoading, isPaused, isError, isSuccess } = useMutation(
    sendToDo,
    {
      retry: 5,
      onSuccess(data) {
        console.log("Success", { data });
      },
      onError(error) {
        console.log("Failed", error);
      }
    }
  );

  function addTodo(e) {
    e.preventDefault();
    mutate({
      userId: 1,
      title: todo,
      completed: false
    });
  }

  return (
    <div className="App">
      <h1>Offline mutation sample</h1>
      <h2>Create, update or delete data</h2>
      <h3>Add a new todo</h3>
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button>Add todo</button>
      </form>
      {isLoading && <p>Making request...</p>}
      {isSuccess && <p>Todo added!</p>}
      {isError && <p>There was an error!</p>}
      {isPaused && <p>You're offline!</p>}
    </div>
  );
}
