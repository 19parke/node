import { Schema, model } from "mongoose";

const userSchema = new Schema({
    id : {type: String, unique: true, required: true }, 
    password : {type : String, required : true},
    name : String,
})

// 데이베이스에 데이터를 넣을 때 하나의 document단위로 들어가므로 
// 무작위로 들어감, 규칙이 없이
// 일관성 있는 데이터를 넣기 위해 유저의 스키마 "user" 구성
export default model("User", userSchema, "user");