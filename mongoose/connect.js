import mongoose from "mongoose"

const connection_url = `mongodb+srv://app:1234@app.zqa4sgg.mongodb.net/`

const connect = () => {
    // 배포 환경이 아니라면
    if(process.env.NODE_ENV != "production"){
        // 디버그 true로 설정하여서 SQL문이 콘솔에 출력된다.
        mongoose.set("debug", true);
    }

    mongoose
        .connect(connection_url, {
            // 컬렉션을 관리하는 database 이름 설정
            // 팀원과 같은 이름을 사용해야 한다.
            dbName : "users"
            // dbName : "projectName"

        })
        .then(()=>{
            // 연결 성공 시
            console.log("Connected to MongoDB!")
        })
        .catch((err)=>{
            // 연결 실패 시
            console.error("Connected fail to MongoDB!")
            console.log(err)
        })
}

export default connect;