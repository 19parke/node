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

// 상품 3개 추가
// 상품명(name), 가격(price), 재고(stock), 제조국가(made_in), 거래처(mou), 등록인(user)

// 상품 1개 정보 예시
// 상품 1개 정보 예시
// {
//     name : "사과",
//     price : 3000,
//     stock : 30,
//     made_in : ["korea", "America"],
//     mou : [
//         { name : "이마트", address : "역삼동" },
//         { name : "하이마트", address : "봉천동" },
//         { name : "롯데마트", address : "목동" },
//     ],
//     user : { name : "홍길동", position : "대리" },
// }

// 상품 등록하기
// await collection.deleteMany();
// await collection.insertMany([
//     {
//         name : "아이폰",
//         price : 600000,
//         stock : 500,
//         made_in : ["Korea", "America"],
//         mou : [
//             { name : "Frisbee", address : "역삼동" },
//             { name : "하이마트", address : "봉천동" },
//             { name : "Apple", address : "영등포" },
//         ],
//         user : { name : "박은혜", position : "대리" },
//     },
//     {
//         name : "맥북",
//         price : 20000000,
//         stock : 100,
//         made_in : ["Japan", "Canada"],
//         mou : [
//             { name : "Frisbee", address : "서현동" },
//             { name : "Apple", address : "성수동" },
//             { name : "이마트", address : "수내동" },
//         ],
//         user : { name : "김애플", position : "과장" },
//     },
//     {
//         name : "에어팟 맥스",
//         price : 700000,
//         stock : 50,
//         made_in : ["Vietnam", "China"],
//         mou : [
//             { name : "이마트", address : "비산동" },
//             { name : "올리브영", address : "봉천동" },
//             { name : "아트박스", address : "사당동" },
//         ],
//         user : { name : "조애플", position : "사원" },
//     },

// ])


// 전체 조회
// const goods = await collection.find().toArray()
// console.log(goods)

// "아이폰" 정보 조회
// const good = await collection.find({name : {$eq : "아이폰"}}).toArray()
// console.log(good)

// 재고가 100개 이상인 상품 조회
// const more100 = await collection.find({"stock" : { $gte : 100}}).toArray()
// await collection.find({stock : {$not : {$lt : 100}}}).toArray()
// console.log(more100)

// 제조 국가가 Korea인 상품 조회
// const fromKorea = await collection.find({"made_in" : { $eq : "Korea"}}).toArray()
// console.log(fromKorea);

// 등록자 중 "대리" 직급의 상품 조회
// const position = await collection.find({"user.position" : "대리"}).toArray()
// console.log(position);

// 거래처 주소에 역삼동이 있는 상품 조회
// const address = await collection.find({ mou : { $elemMatch : {address : "역삼동"}}}).toArray()
// console.log(address)

// 상품 중, 거래처 이름에 백화점이 포함된 상품 조회
// const department = await collection.find({mou : { $elemMatch : {name : "백화점"}}}).toArray()
// console.log(department)

// 상품 중, 등록자의 직급이 대리가 아닌 상품 모두 삭제
// const updatedGoods = await collection.deleteMany({"user.position" : {$not : {$eq : "대리"}}})
// console.log(updatedGoods)

// "아이폰" 1개 조회
// const findApple = await collection.findOne({name : "아이폰"})
// console.log(findApple);

// "아이폰" 재고 1개 추가
await collection.updateOne({_id : member._id}, {$set : {stock : 501}})
const updated_good = await collection.findOne({name : "아이폰"})
console.log(updated_good);

// 삭제
// await collection.deleteMany()