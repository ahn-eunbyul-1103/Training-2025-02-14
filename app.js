import http from 'http';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const server = http.createServer(function(req,res) {
  if(req.method === "GET") {
    if(req.url === "/") {
      const indexPage = fs.readFileSync('views/index.html', 'utf-8');
      res.writeHead(200, { 'Content-Type': 'utf-8; text/html'});
      res.write(indexPage);
      res.end();
    }
    if(req.url === "/public/css/common.css") {
      const commonCss = fs.readFileSync('public/css/common.css', 'utf-8');
      res.writeHead(200, { 'Content-Type': 'text/css'});
      res.write(commonCss);
      res.end();
    }
    if(req.url === "/src/utils/organisms.js") {
      const organismsJs = fs.readFileSync('src/utils/organisms.js', 'utf-8');
      res.writeHead(200, { 'Content-Type': 'application/javascript'});
      res.write(organismsJs);
      res.end();
    }
    if(req.url === "/src/utils/atoms.js") {
      const atomsJs = fs.readFileSync('src/utils/atoms.js', 'utf-8');
      res.writeHead(200, { 'Content-Type': 'application/javascript'});
      res.write(atomsJs);
      res.end();
    }
    if(req.url === "/src/utils/elements.js") {
      const elementsJs = fs.readFileSync('src/utils/elements.js', 'utf-8');
      res.writeHead(200, { 'Content-Type': 'application/javascript'});
      res.write(elementsJs);
      res.end();
    }
    if(req.url === "/src/utils/models.js") {
      const modelsJs = fs.readFileSync('src/utils/models.js', 'utf-8');
      res.writeHead(200, { 'Content-Type': 'application/javascript'});
      res.write(modelsJs);
      res.end();
    }
    if(req.url === "/src/utils/state.js") {
      const stateJs = fs.readFileSync('src/utils/state.js', 'utf-8');
      res.writeHead(200, { 'Content-Type': 'application/javascript'});
      res.write(stateJs);
      res.end();
    }
    if(req.url === "/src/utils/molecules.js") {
      const moleculesJs = fs.readFileSync('src/utils/molecules.js', 'utf-8');
      res.writeHead(200, { 'Content-Type': 'application/javascript'});
      res.write(moleculesJs);
      res.end();
    }
    if(req.url === "/src/controllers/mainController.js") {
      const controllerJs = fs.readFileSync('src/controllers/mainController.js', 'utf-8');
      res.writeHead(200, { 'Content-Type': 'application/javascript'});
      res.write(controllerJs);
      res.end();
    }
    if(req.url === "/src/constants/selectorConstants.js") {
      const selectorsJs = fs.readFileSync('src/constants/selectorConstants.js', 'utf-8');
      res.writeHead(200, { 'Content-Type': 'application/javascript'});
      res.write(selectorsJs);
      res.end();
    }
    if(req.url === "/src/storage/studentsData.js") {
      const studentDataJs = fs.readFileSync('src/storage/studentsData.js', 'utf-8');
      res.writeHead(200, { 'Content-Type': 'application/javascript'});
      res.write(studentDataJs);
      res.end();
    }
    if(req.url === "/src/utils/main.js") {
      const mainJs = fs.readFileSync('src/utils/main.js', 'utf-8');
      res.writeHead(200, { 'Content-Type': 'application/javascript'});
      res.write(mainJs);
      res.end();
    }
  }
  if(req.method === "POST") {

  }
});

const PORT = process.env.PORT;
server.listen(PORT, function() {
  console.log("현재 http://localhost:" + PORT + "/ 서버가 가동되고 있습니다.");
});