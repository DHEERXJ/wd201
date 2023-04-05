const express = require("express");
const app = express();
const { Todo } = require("./models");
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.get("/", async (request, response) => {
  const overdue = await Todo.overdueTodos();
  const today = await Todo.todayTodos();
  const later = await Todo.laterTodos();
  if (request.accepts("html")) {
    response.render("index", {
      todayCount: today.length,
      overdueTodos: overdue,
      laterTodos: later,
      todayTodos: today,

      laterCount: later.length,
      overdueCount: overdue.length,
    });
  } else {
    response.json({
      allTodos,
    });
  }
});
const path = require(path);

app.use(express.static(path.join__dirname, "public"));

app.get("/todos", async function (_request, response) {
  console.log("Processing list of all Todos ...");
  // FILL IN YOUR CODE HERE

  // First, we have to query our PostgerSQL database using Sequelize to get list of all Todos.
  // Then, we have to respond with all Todos, like:
  // response.send(todos)
  const alltodo = await Todo.findAll();
  response.json(alltodo);
});

app.get("/todos/:id", async function (request, response) {
  try {
    const todo = await Todo.findByPk(request.params.id);
    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.post("/todos", async function (request, response) {
  try {
    const todo = await Todo.addTodo(request.body);
    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.put("/todos/:id/markAsCompleted", async function (request, response) {
  const todo = await Todo.findByPk(request.params.id);
  try {
    const updatedTodo = await todo.markAsCompleted();
    return response.json(updatedTodo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.delete("/todos/:id", async function (request, response) {
  console.log("We have to delete a Todo with ID: ", request.params.id);
  // FILL IN YOUR CODE HERE

  // First, we have to query our database to delete a Todo by ID.
  // Then, we have to respond back with true/false based on whether the Todo was deleted or not.
  // response.send(true)
  const delete_todo = await Todo.findByPk(request.params.id);
  if (delete_todo == null) {
    response.send("false");
  } else {
    await delete_todo.destroy();
    response.send("true");
  }
});

module.exports = app;
