// 내가 만든 커넥트 불러오기, 가져왔는데 연결이 안되면 확장자 꼭 확인 및 추가해주기
import connect from "./connect.js";
// 주의사항, import되는대로 사용하면 안되고 객체명으로 사용
// import user_schema from "./user_schema.js";
import User from "./user_schema.js";
import Post from "./post_schema.js";

// 함수사용, 연결
connect()

// 연결이 됐기 때문에 쿼리 날릴 수 있다. 그러나 그 전에 하나의 양식, 즉 스키마를 만들고 하자 = user_schema.js

// 1개 추가 : collection.insert({})
// User라는 객체에 접근하여 사용
//const user_inserted  = await User.create({
//    email : "grace853@naver.com", 
//    name : "박은혜", 
//    age : 17,
//});
//console.log(user_inserted)

// 여러개 추가 : collection.insertMany([{},{},{},...])
// const user_inserted = await User.create(
//     {
//         email : "abc@naver.com", 
//         name : "홍짱구", 
//         age : 3,
//     },
//     {
//         email : "def@naver.com", 
//         name : "김바리세인", 
//         age : 30,
//     },
//     {
//         email : "ghi@naver.com", 
//         name : "바기든", 
//         age : 1,
//     },
// );

// console.log(user_inserted)

// 전체 조회, collection.find().toArray()
// const users = await User.find()
// [{},{},{}]
// 빠른 for문 돌리기
// for(let user of users){
//     // 하나의 유저 정보들 가져오는 것
//     console.log(user._doc)
// }
// console.log(users);

// 이메일에서 abc가 포함된 회원 조회
// const users = await User.find({email : { $regex : "abc"}});
// for(let user of users){
//     console.log(user._doc);
// }

// 1개 조회
// const user = await User.findOne({name : "바기든"});
// console.log(user)

// 1개 수정
// const user = await User.findOne({ email : "def@naver.com"});
// const userUpdated = await User.updateOne(user, {age : 20})
// console.log(userUpdated)

// 여러개 수정
// const usersUpdated = await User.updateMany(
    // 조건, 해당 조건을 통해 해당 유저들을 가져오기, 조건은 꼭 세밀하게! (웬만하면 Many로 하지X)
    // { email : { $regex : "naver"}},
    // set
//     { age : "10"}
// );
// console.log(usersUpdated)

// 1개 삭제
// const user = await User.findOne({email : "abc@naver.com"});
// const userDeleted = await User.deleteOne(user)
// console.log(userDeleted)

// 여러개 삭제
// const userDeleted = await User.deleteMany({ email : { $regex : "naver"}} );
// console.log(userDeleted);

// const user_insertOne = await User.create(
//     {
//         email : "grace853@naver.com",
//         name : "박은혜",
//         age : 25,
//     }
// );

// const user_inserted = await User.create(
//     {
//         email : "abc@naver.com", 
//         name : "홍짱구", 
//         age : 3,
//     },
//     {
//         email : "def@naver.com", 
//         name : "김바리세인", 
//         age : 30,
//     },
//     {
//         email : "ghi@naver.com", 
//         name : "바기든", 
//         age : 1,
//     },
// )

//  게시글 추가
// const user = await User.findOne({ email : "grace853@naver.com"})
// console.log(user)

// const postCreated = await Post.create(
//     {
//         title : "테스트 제목1", 
//         content : "테스트 내용1",
//         // user의 id 를 가져오는 것, 누가 작성했는지 연관관계를 가지는 부분
//         user : user,
//     }
// )
// console.log(postCreated)

// user 3명, 게시글 3개
// 2번 게시판 글 홍짱구
// 3번 게시판 글 김바리세인
// 4번 게시판 글 바기든

// const user2 = await User.findOne({ name : "홍짱구"})
// const user3 = await User.findOne({ name : "김바리세인"})
// const user4 = await User.findOne({ name : "바기든"})

// const newPost2 = await Post.create(
//     {
//         title : "나는 홍짱구예요",
//         content: "내용2",
//         user : user2,
//     },
//     {
//         title : "나는 김바리세인",
//         content: "내용3",
//         user : user3,
//     },
//     {
//         title : "나는 바기든이예요",
//         content: "내용4",
//         user : user4,
//     }
// )

// 게시글 전체 조회(연관관계 user)
// const post = await Post.find().populate("user")
// console.log(post)

// 해당 유저의 포스트 삭제하기 "박은혜"
// const user = await User.findOne({name : "박은혜"})
// const posts = await Post.find().populate("user")

// for (let post of posts){
//     if(post.user.id === user.id){
//         await Post.deleteOne(post)
//     }
// }

// 회원정보 수정 후 게시글 전체 조회(연관 관계 user)
// const userUpdated = await User.updateOne(
//     { name : "김바리세인"},
//     { name : "홍짱구" }
// )
// console.log(userUpdated)

// 실습 : 홍길동 이름을 프론트로 바꾸고 
// 전체조회
const user1 = await User.updateOne({name : "홍짱구"})
console.log(user1)

const userUpdated = await User.updateOne(
    user1,
    { name : "프론트"}
)
console.log(userUpdated)

const posts = await Post.find().populate("user")
for(let post of posts){
    console.log(post.title, post.content)
    console.log(post.user.name)
}