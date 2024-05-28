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
await collection.insertOne({name : "박은혜"})

// nodemon이 아니라 node mongo.js
//서버가 실행 할 때 쿼리문을 날리는 것