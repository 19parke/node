// mongoDB의 id를 가져와서 이용
import { ObjectId } from "mongodb";
import { Schema, model } from "mongoose";

const postSchema = new Schema(
    {
        title : { type : String, required : true },
        content : { type : String, required : true },
        //User 객체에서 가져오기
        user : { type : ObjectId, ref : "User", required : true}
    }, 
    {timestamps : true}
)

export default model("Post", postSchema, "post")