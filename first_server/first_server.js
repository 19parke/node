import http from 'http';
let count = 0;

const log = (count) => {
    console.log((count+=1))
}

const server = http.createServer((req, res)=>{
    log(count);
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.write("hi 😘\n")
    setTimeout(()=>{
        res.end('Node.js 첫 서버')
    },3000)
    
})

// port : 49152~65535
// 0~1023, 1024~49152은 시스템에 기본으로 사용하느 포트가 있을 수 있어서, 
// 충돌을 피하기 위해 보통은 49152부터 사용한다.

server.listen(8000);