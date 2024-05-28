// "/user"에 접속하면 "홍길동님 환영합니다!" 응답
// "/product"에 접속하면 "상품1, 상품2, 상품3은 판매중입니다!"
// 위에 경로 외에 다른 경로는 "모두 찾을 수 없습니다."를 응답!

import {createServer} from "http"
import {parse} from "url";

const server = createServer((req, res)=>{
    const path = parse(req.url, true).pathname;
    res.setHeader("Content-Type", "text/html; charset=utf-8")
    res.statusCode = 200;

    // if(path === "/user"){
    //     res.end("<h1 style='text-align:center'>홍길동님🤠 환영합니다! </h1>")
    // }else if(path === "/product"){
    //     res.end("<h1 style='text-align:center'>상품1, 상품2, 상품3은 판매중입니다! 👌</h1>")
    // }else{
    //     res.statusCode = 404;
    //     res.end(
    //         "<h1 style='text-align:center'>✖️모두 찾을 수 없습니다.✖️</h1>"
    //     )
    // }

    // 외부 분리 연습 = path map
    if(path in patMap){
        //빠른 for문
        patMap[path](req, res);
    }else{
        notFound(req, res)
    }
})

const user = (req, res)=>{
    res.end("<h1>홍길동님 환영합니다.</h1>")
}

const product = (req, res)=>{
    res.end("<h1>상품1, 상품2, 상품3은 판매중입니다!</h1>")
}

const notFound = (req, res)=>{
    res.end("<h1>찾을 수 없습니다")
}

const patMap = {
    "/user" : user,
    "/product" : product
}

server.listen("8000", ()=>console.log('Router Test Server Start!'))