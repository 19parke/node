import http from 'http'

// 서버 접속 기록
let count = 0;

const log = (count) => {
    console.log((count+=1))
}

// 서버 만들기 : http 모듈 사용 (createServer), 요청 응답 모두 받기(내거에서 전부 보내고 받을 것이기에)
const server = http.createServer((req, res) => {
    //log 함수 사용
    log(count);

    // 응답 헤더 설정, 해주지 않으면 깨진다.
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    // 화면 응답 문구
    res.write("Hi 😊 This is My First Node.js Server!\n")
    // 3초 뒤 타임 아웃, 응답 종료
    setTimeout(()=>{
        // 응답 종료 메시지
        res.end('Node.js 첫 서버')
    }, 3000)
})

// port : 49152~65535
// 0~1023, 1024~49152은 시스템에 기본으로 사용하느 포트가 있을 수 있어서, 
// 충돌을 피하기 위해 보통은 49152부터 사용한다.

// server를 작동 시키는 결정적 문구라고 생각하면 된다. 
// server가 요청을 받기 위해 듣고 있어야 하므로 listen
// 내가 만든 서버가 8000번 포트에서 요청을 기다리고 있다.
server.listen(8000);