// 어떤 요쳥에도 " Good-Bye"를 응답(response) 하는 서버 제작하기
// 제작 후 K6를 통해 100명이 10초동안 동시에 요청하는 성능 테스트를 진행한다.

import {http, createServer} from 'http';

let logger = "server log";

const server = http.createServer((req, res)=>{
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end('<h1>Good-Bye</h1>');
    // timeout을 해주지 않으면 
    setTimeout(()=>{
    },3000)
})

server.listen("8000", ()=>console.log("Server Start!"));