/*create or import javascript related content(imoport the header.ejs content in index.ejs)*/
//{%> for loop end   this is in index.ejs file
const express = require("express");
const app = express();
const { Todo } = require("./models");
const bodyParser = require("body-parser");
const { response } = require("express");
const path =require("path");
app.use(bodyParser.json());

app.set("view engine","ejs");     //for rendaring ejs page 

app.get("/", async(request,response) =>{
  const allTodos =await Todo.getTodos();
  if( request.accepts("html")){         //accept req browser then show index.ejs file  and pass all todos value 
    response.render('index', {
      allTodos
    });
  } else{
    response.json({
      allTodos
    })
  }
   //fatch the alltodo 
  // response.render('index');       //fatch the data and point first index.ejs file
});

app.use(express.static(path.join(__dirname,'public')));   //serve or provide a static file like css and js

app.get("/todos", async function (_request, response) {
  console.log("Processing list of all Todos ...");
  // try {
  //   const todolist = await Todo.findAll({order:[["id","ASC"]]});
  //   return  response.json(todolist)
  // } catch (error) {
  //   return response.status(400).json(error)
  // }
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
  const deleteItem = await Todo.destroy({where:{id:request.params.id}})
  response.send(deleteItem?true:false)
});

module.exports = app;
