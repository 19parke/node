import {createServer} from 'http'
import { parse } from 'url'

const server = createServer((req, res)=>{
    const path = parse(req.url, true).pathname;
    res.setHeader("Content-Type", "application/json; charset=utf-8");

    // CORS 등록해주기, 데이터를 주고 받기 위해 우회하는 경로? 라고 이해하면 될듯..
    // 나이거 접근 할 수 있는 origin경로 전체 다 해줄게, 실질적으로 서비스하고 있는 경로가 *에 들어간다.
    res.setHeader("Access-Control-Allow-origin", "*")
    // 데이터를 주고 받을 수 있게끔 해주는 것
    res.setHeader("Access-Control-Allow-Credentials", true)
    
    if(path==='/api/user/1'){
        res.end(JSON.stringify({
            number: 1,
            name: "박은혜",
            address: "경기도 안양시"
        }))
    }
})

server.listen(8000, ()=>{
    console.log('REST Server Start!')
})