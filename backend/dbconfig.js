import { MongoClient } from "mongodb"
import dotenv from "dotenv"

dotenv.config();

const dbName='node-project'
export const collectionName='task'
const url=process.env.MONGO_URI||'mongodb+srv://manisharma4844db_user:atlas1280@cluster0.dp1q7rc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const client =new MongoClient(url)

 export const connection=async ()=>{
    const connect =await client.connect();
    return await connect.db(dbName)
}