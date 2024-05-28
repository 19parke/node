// "/user?name="홍길동"" 일 경우 홍길동님 환영합니다.
// "product?p1=축구공&p2=농구공&p3=배구공"일 경우 "축구공, 농구공, 배구공은 판매중입니다!"를 응답
// 위 경로 외에 다른 경로는 모두 "페이지를 찾을 수 없습니다."
import {createServer} from 'http'
import { parse } from 'url';


const server = createServer((req, res)=>{
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.statusCode = 200;

    const path = parse(req.url, true).pathname //URL에서 URL=pathname 분리
    if(path in pathMap){
        pathMap[path](req,res)
    }else{
        notFound(req,res)
    }
})

server.listen("8000", ()=>{
    console.log("Task server Start!")
})

const user = (req, res) => {
    // 홍길동

    // const {name} = 
    const query = parse(req.url, true).query; //URI 쿼리스트링 분리
    res.end(
        `<h1 style="text-align:center">${query}님 환영합니다</h1>`
        // <>${name}님 환영합니다<>
    )
}

const product = (req, res) =>{
    // const {p1, p2, p3}
    const query = parse(req.url, true).query; //URI 쿼리스트링 분리
    res.end(
        `
            <h1 style="text-align:center;">${query.product1}, ${query.product2},${query.product3}은 판매중입니다!</h1>
        `
            // res.end(`<h1>${p1}${p2}${p3}</h1>`)
    )
}

const notFound = (req, res) =>{
    //페이지를 찾을 수 없습니다.
    res.statusCode = 404;
    res.end("<h1 style='text-align:center'>페이지를 찾을 수 없습니다.😵‍💫</h1>")
}

const pathMap = {
    "/user" : user, 
    "product" : product,
}