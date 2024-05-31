// 2. connection을 app에서 사용할 것이므로 app작업
//  app 에서 서버 응답
import {createServer} from 'http';
import connect from './connect.js';

// 몽고 디비에서 connect를 사용해야하므로 , MongoDB연결
connect();

// 서버를 구성
const server = createServer((req, res)=>{
    // uri 분리
    const path = parse(req.url, true).pathname;
    res.setHeader("Content-Type", "text/html; charset=utf-8")
    res.statusCode = 200;

    // 라우팅 사용
    if(path in pathMap){
        pathMap[path](req, res);
    }else{
        notFound(req,res)
    }
})

// 서버를 실행
server.listen(8000, ()=>console.log("Router Server Start"))

const main = (req, res) => {
    res.statusCode =  200;
    res.end("<h1 style='text-align:center'>환영합니다. Node With MongoDB 최종 실습입니다.</h1>")
}

// 각 페이지 작업, 요청도 하고 응답도 해야 하므로 req, res
// 각각의 라우트 컨트롤러 구성
const login = async (req, res) => {}
const join = async (req, res) => {}
const notFound = (req, res) => {
    res.statusCode =  404;
    res.end("<h1 style='text-align:center'>페이지를 찾을 수 없습니다.</h1>")
}

// 라우팅 처리(구성)
const pathMap = {
    "/" : main,
    "/join" : join,
    "/login" : login,
}

/*
PS C:\full_1900_peh\node\workspace\connect> node app.js
Router Server Start
Connected to MongoDB!
*/

// node안의 app.js가 mongoDB에 연결함으로써 front 단의 로그인에서 Node의 app에 연결 후 node가 mongoDB에서 찾아주는 형태