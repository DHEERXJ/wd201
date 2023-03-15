const h_server = require("http");
const f_server = require("fs");

let minimist = require('minimist')

let args = minimist(process.argv.slice(2));
console.log(args);

let homes_contents = "";
let pro_contents = "";
let reg_contents = "";

f_server.readFile("home.html", (errors, home) => {
  if (errors) {
    throw errors;
  }
  else{
    homes_contents = home;
  }
  
});

f_server.readFile("project.html", (errors, project) => {
  if (errors) {
    throw errors;
  }
  pro_contents = project;
});

f_server.readFile("registration.html", (errors, registration) => {
  if (errors) {
    throw errors;
  }
  reg_contents = registration;
});

h_server
  .createServer((request, response) => {
    let url = request.url;
    response.writeHeader(200, { "Content-Type": "text/html" });
    switch (url) {
      case "/project":
        response.write(pro_contents);
        response.end();
        break;
      case "/registration":
        response.write(reg_contents);
        response.end();
        break;
      case "/home":
        response.write(homes_contents);
        response.end();
        break;
      default:
        response.write(homes_contents);
        response.end();
        break;
    }
  }).listen(args.port, () => {
    console.log(`http://localhost:${args.port}/`)});
