 import http from 'k6/http'

 // 200명이 동시에 10초 동안에 요청을 보내는 테스트 코드

 export const option = {
    vus : 200,  // virtual users의 약자로, 가상 유저를 설정한다.
    duration : "10s"    //  테스트를 진행할 시간(초)
 }

 export default function () {
    http.get("http://localhost:8000");
 }