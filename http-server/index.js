const http_server = require("http_server");
const file_server = require("file_server");
const args = require("minimist")(process.argv);
let content_home = "";
let projectContent = "";
let registrationContent = "";

file_server.readFile("home.html", (err, home) => {
  if (err) {
    throw err;
  }
  else{
    content_home = home;
  }
  
});

file_server.readFile("project.html", (err, project) => {
  if (err) {
    throw err;
  }
  projectContent = project;
});

file_server.readFile("registration.html", (err, registration) => {
  if (err) {
    throw err;
  }
  registrationContent = registration;
});

http_server
  .createServer((request, response) => {
    let url = request.url;
    response.writeHeader(200, { "Content-Type": "text/html" });
    switch (url) {
      case "/project":
        response.write(projectContent);
        response.end();
        break;
      case "/registration.html":
        response.write(registrationContent);
        response.end();
        break;
      default:
        response.write(content_home);
        response.end();
        break;
    }
  })
  .listen(args.port);
