// * 필요한 라이브러리 가져오기
import http from 'http'; // 프로토콜 관련
import fs from 'fs'; // 파일 관련
import dotenv from 'dotenv'; // 환경변수 env 관련
dotenv.config(); // env 사용하기 위해 선언

// * 서버 만들기
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
    if(req.url.endsWith(".js")) {
      const inputJs = fs.readFileSync(`./${req.url}`, 'utf-8');
      res.writeHead(200, { 'Content-Type': 'application/javascript'});
      res.write(inputJs);
      res.end();
    }
  }
  if(req.method === "POST") {

  }
});

const PORT = process.env.PORT; // env에 설정된 port 값 가져오기
// * 서버 오픈
server.listen(PORT, function() {
  console.log("현재 http://localhost:" + PORT + "/ 서버가 가동되고 있습니다.");
});