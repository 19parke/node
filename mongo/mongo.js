import { MongoClient } from "mongodb"

// 접근하기 위한 mongourl 주소
const connection_url = `mongodb+srv://app:1234@app.zqa4sgg.mongodb.net/`

// 어디에 접근할래? id, pw 있기 때문에 url만 전달해주면 됨. connection, 연결하기
const client = await MongoClient.connect(connection_url)
// 지금부터 client에 접근하면db에 접근하는 것임

// Database 가져오기, 없으면 생성 후 가져온다.
const db = client.db("member");

// 컬랙션(테이블) 생성
await db.createCollection("member");

// 컬랙셕 가져오기
const collection = db.collection("member");

// 데이터 추가 CRUD, MongoDB에서 제공하는 문법, 단일 데이터 추가
// await collection.insertOne({name : "박은혜"})

// nodemon이 아니라 node mongo.js
//서버가 실행 할 때 쿼리문을 날리는 것

// 다중 데이터 추가
// await collection.insertMany([
//     { name : "kim"}, 
//     { name : "park"}, 
//     { name : "lee"}, 
// ])

// Read , 데이터 조회
// 총 멤버수
// const count = await collection.countDocuments;

// 모든 멤버의 데이터 조회
// const members = await collection.find().toArray();

// console.log(count)
// console.log(members)

// $eq : 일치하는 값 조회
// const member = await collection.find({name : { $eq : "park" }}).toArray();
// console.log(member)

// $ne : 일치하지 않는 값 모두 조회
// const members = await collection.find({name : { $ne : "park"}}).toArray()
// console.log(members)

// $in : 여러 값중 하나와 일치하는 값 조회
// const members = await collection.find({ name : { $in : ['park', 'lee']}}).toArray();
// console.log(members);

// $nin : 여러 값과 일치하지 않는 값 조회
// const members = await collection.find({ name : { $nin : ['park', 'lee']}}).toArray()
// console.log(members);

// $not : false를 true, true를 false 바꿔서 조회
// const members = await collection
//     .find({name : { $not : { $eq: "park" }}}).toArray()
// console.log(members)

// Delete 삭제
// 내용 전체 삭제, [!! 주의해서 사용하기 !!]
// await collection.deleteMany();

// name : kim, age : 20
// name : rora, age : 25
// name : lindy, age : 30

// const members = await collection.insertMany([
//     {name : "kim", age : 20},
//     {name : "rora", age : 25},
//     {name : "lindy", age : 30},
// ])

// console.log(members)

// $gt : 지정한 값보다 큰 값을 조회
// const members = await collection.find({"age" : {$gt : 25}}).toArray()
// console.log(members)

// $gte : 지정한 값보다 크거나 같은 값을 조회
// const members = await collection.find({"age" : {$gte : 25}}).toArray()
// console.log(members)

// $lt : 지정한 값보다 작은 값을 조회
// const members = await collection.find({"age" : {$lt : 25}}).toArray()
// console.log(members)

// $lte : 지정한 값보다 작거나 같은 값을 조회
// const members = await collection.find({"age" : {$lte : 25}}).toArray()
// console.log(members)

// $or : 하나라도 true면 true
// 조건 여러개이므로 배열[]
// const members = await collection.find({ $or : [{name: "rora"}, {name: "kim"}]}).toArray()
// console.log(members);

// $and : 모두 true라면 true
// const members = await collection.find({ $and : [{name: "rora"}, {age : 25}]}).toArray()
// console.log(members);

// $nor : 모두 false라면 true
// const members = await collection.find({$nor : [{name: "rora"}, {name: "kim"}]}).toArray()
// console.log(members);

// await collection.insertMany([
//     {
//         name: "kim", 
//         age : 17, 
//         address : [
//             {main: "서울", detail: "강남"},
//             {main: "경기", detail: "안양"}
//         ], 
//         hobby : ["eat", "sleep"], 
//         company : {name : "google", department: "개발"}
//     },
//     {
//         name: "rora", 
//         age : 25, 
//         address : [
//             {main: "강원", detail: "춘천"},
//             {main: "서울", detail: "용산"}
//         ], 
//         hobby : ["미술", "음악"], 
//         company : {name : "LG", department: "고객서비스"}
//     },
//     {
//         name: "lindy", 
//         age : 30, 
//         address : [
//             {main: "경북", detail: "대구"},
//             {main: "전북", detail: "전주"}
//         ], 
//         hobby : ["게임", "술"], 
//         company : {name : "naver", department: "클라우드"}
//     },
// ])

// value에 여러 정보(객체)가 있을 때
// 객체 안의 키값을 사용할 때 문자열로 감싸줘야 한다. (문법)
// const members = await collection.find({"company.name" : "google"}).toArray()
// console.log(members)

// list:value에 여러 값이 list형태로 있을 때
// $elemMatch
// const members = await collection.find({address : {$elemMatch : {main : "서울"}}}).toArray()
// console.log(members)

// 수정

// 내용 추가
// await collection.insertMany([
//     {name : "kim", age : 20},
//     {name : "rora", age : 25},
//     {name : "lindy", age : 40}
// ])

// 단일 조회
// const member = await collection.findOne({name:"kim"})
// console.log(member)

// 수정
// $set
// await collection.updateOne({_id : member._id}, {$set : {name : "은혜"}})
// const updated_member = await collection.findOne({name : "은혜"})
// console.log(update_member)

// 삭제 
// await collection.deleteOne({name : "은혜"});
// const members = await collection.find().toArray()
// console.log(members)

