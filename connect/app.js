// 2. connection을 app에서 사용할 것이므로 app작업
//  app 에서 서버 응답
import {createServer} from 'http';
import connect from './connect.js';
import { parse } from 'url';
import path from 'path';
import User from './user_schema.js';

import fs from 'node:fs';
import qs from 'node:querystring';
// 폴더와 파일의 경로를 지정해주는 모듈로 join(), resolve()를 통해서 위치한 경로를 절대경로로 알려준다.
// join('/a', '/b')은 전달한 경로로 a,b를 무조건 a/b/ 붙여주어야 하지만, 
// resolve('/a', '/b')는 전달한 경로 중 절대 경로(/부터 시작)가 있다면 앞의 경로를 무시한다. 
// resolve의 결과 : '/b'

// 내가 VSCode에서 open folder로 연 경로가 절대 경로가 된다.
// ex) workspace 경로 : workspace/connect/
const __dirname = path.resolve();

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

// 서버를 실행, 8000번에서 기다리고 있을게, event를 듣고 있음.
server.listen(8000, ()=>console.log("Router Server Start"))

const main = (req, res) => {
    res.statusCode =  200;
    res.end("<h1 style='text-align:center'>환영합니다. Node With MongoDB 최종 실습입니다.</h1>")
}

// 각 페이지 작업, 요청도 하고 응답도 해야 하므로 req, res
// 각각의 라우트 컨트롤러 구성


const join = async (req, res) => {
    // GET 요청
    if(req.method === "GET"){

        // workspace 경로 , 나지금 connect에 있는데 join.html파일이 있어 이걸 열어서 뒤에 있는 함수가 실행되게
        // 파일을 정상적으로 읽어 왔을 때 아닐 때 구분 하는 매개변수 err, result
        // 파일 정보 가져오고 읽기, 절대경로로 workspace 가져오기
        fs.readFile(__dirname + "/join.html", (err, result) => {
            
            // 파일 정보 가져오는 것 

            if(err){
                // 에러일 때 서버 응답
                console.log('read error, ' + err.message);
                res.writeHead(404, {"Content-Type" : "text/html"})
                ("<h1 style='text-align:center;'>페이지를 찾을 수 없습니다. ㅜㅡㅜ </h1>")
            }else{
                // 정상적일 때 서버응답
                res.writeHead(200, {"Content-Type" : "text/html"});
                res.end(result)
            }
        })

    // POST 요청, 사용자의 정보를 날렸을 것임
    // post요청은 db접근해서 화면서 뿌려주는 로직
    }else if(req.method === "POST"){
        let body = "";
        // data가 들어왔을 때
        req.on("data", function(data){
            // body에 해당 내용을 문자열로 담는다.
            body += data;
        })

        // end 이벤트 발생 시 사용자에게 받은 데이터를 보내주는 것
        // 서버 쪽 응답을 위해 데이터를 가져와서
        req.on("end", async function () {
            // qs(queryString)객체의 parse()를 통해서 객체로 변환해준다.
            let data = qs.parse(body);
            // body가 id, pw등의 정보들

            // mongoose 문법을 사용해서 전달받은 정보를 collection에 추가한다.
            // 쿼리를 넣은것, 화면에 받은 정보를 DB에 넣은것
            // 검증된 id, pw -> 쿼리 날려주기
            const userCreated = await User.create(data);
            console.log(userCreated)

            
            
            // 쿼리가 잘 실행 되었는지 화면에 보여줄 로직
            fs.readFile(
                __dirname + "/login.html",
                function(err, result){
                    if(err){
                        console.log("file read fail...ㅜ"+err.message);
                        res.writeHead(404, {"Content-Type" : "text/html"});
                        ("<h1 style='text-align:center;'>페이지를 찾을 수 없습니다.</h1>")
                    }else{
                        // 정상적 코드
                        res.writeHead(200, {"Content-Type" : "text/html"});
                        res.end(result);
                    }
                }
            )

        })

    }else{
        // 404
    }

}

const login = async (req, res) => {

    // 기본 default 는 get요청, /login했을 때 
    if(req.method === 'GET'){
        fs.readFile(__dirname + "/login.html", function(err, result){
            if(err){
                console.log("file read fail... : "+err.message);
                res.writeHead(404, {"Content-Type" : "text/html"})
                ("<h1 style='text-align:center;'>페이지를 찾을 수 없습니다.</h1>")
            }else{
                res.writeHead(200, {"Content-Type" : "text/html"});
                res.end(result);
            }
        })
    }else if(req.method === 'POST'){
        let body = "";
        req.on("data", function(data){
            body+=data;
        })
        req.on("end", async function (){
            let data = qs.parse(body);
            let path = __dirname+"/login.html";
            const user = await User.findOne({id : data.id});
            if(user){
                // 아이디가 있으면
                if(user.password === data.password){
                    // 비밀번호 검사해서 일치한다면, 해당 문서 경로로 path에 저장
                    path = __dirname + "/login_ok.html";
                }
            }

            //일괄처리 , path에 담긴 경로를 파일을 읽은 후에 경로를 응답해준다.
            fs.readFile(path, function(err, result){
                if(err){
                    console.log("file read fail... : "+err.message);
                    res.writeHead(404, {"Content-type" : "text/html"})
                    ("<h1 style='text-align:center;'>페이지를 찾을 수 없습니다.</h1>")
                }else{
                    res.writeHead(200, {"Content-type" : "text/html"})
                    res.end(result)
                }
            })
        })
    }    


}

const notFound = (req, res) => {
    res.statusCode =  404;
    res.end("<h1 style='text-align:center'>페이지를 찾을 수 없습니다.</h1>")
}

// 라우팅 처리(구성)
const pathMap = {
    "/" : main,
    // 회원가입 요청 페이지 보여줘
    "/join" : join,
    // 로그인 페이지 보여줘
    "/login" : login,
}

/*
PS C:\full_1900_peh\node\workspace\connect> node app.js
Router Server Start
Connected to MongoDB!
*/

// node안의 app.js가 mongoDB에 연결함으로써 front 단의 로그인에서 Node의 app에 연결 후 node가 mongoDB에서 찾아주는 형태