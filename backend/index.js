import express from 'express'
import { collectionName, connection } from './dbconfig.js';
import cors from 'cors'
import { CommandSucceededEvent, ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

const port=process.env.PORT ||3200
dotenv.config();
const app=express();
app.use(express.json())
app.use(cors({
    origin:'https://tasks-frontend-hfbl.onrender.com',
    credentials:true
}))
app.use(cookieParser())


// SIGN UP ROUTE

app.post('/signup',async(req,res)=>{
    const userData=req.body
    //console.log(userData);
    if(userData.email && userData.password){
        const db =await connection()
        const collection= await db.collection('users')
        const result =await collection.insertOne(userData)
        if(result){
            jwt.sign(userData,'Google',{expiresIn:'5d'},(error,token)=>{
                res.send({
                    success:true,
                    msg:'sign up done',
                    token
                })
         })

        }else{
            res.send({
                success:false,
                    msg:'sign up not done',
                    
            }) 
        }

    }
})

// LOGIN ROUTE

app.post('/login',async(req,res)=>{
    const userData=req.body
    //console.log(userData);
    if(userData.email && userData.password){
        const db =await connection()
        const collection= await db.collection('users')
        const result =await collection.findOne({email:userData.email,password:userData.password})
        if(result){
            jwt.sign(userData,'Google',{expiresIn:'5d'},(error,token)=>{
                res.send({
                    success:true,
                    msg:'user Logged In done',
                    token
                })
         })
        }else{
            res.send({
                success:false,
                    msg:'user not found',  
            }) 
        }
     }else{
            res.send({
                success:flase,
                 msg:'user credentials mismatch ',  
                  }) 
         }
})





app.post('/add-task',verfiyJWTToken,async(req,res)=>{
    const db = await connection();
    const collection= await db.collection(collectionName)
    const result =await collection.insertOne(req.body)
    if(result){
        res.send({message:"new task added",success:"true",result})
    }else{
        res.send({message:"new task added",success:"true",result})
    }
})
app.get('/tasks', verfiyJWTToken,async (req,res)=>{
    
    
    const db = await connection();
    const collection=await db.collection(collectionName)
    const result =await collection.find().toArray()
    if(result){
        res.send({message:"task list fetched",success:true,result})
    }
    else{
        res.send({message:"Try after some time",success:false})
    }
})





// Data Populate through update api 

app.get('/task/:id', async (req,res)=>{
    const id =req.params.id
    const db = await connection();
    const collection=await db.collection(collectionName)
    const result =await collection.findOne({_id:new ObjectId(id)})
    if(result){
        res.send({message:"task fetched",success:true,result})
    }
    else{
        res.send({message:"Try after some time",success:false})
    }
})


app.delete('/delete/:id',verfiyJWTToken, async (req,res)=>{
    const id =req.params.id
    const db = await connection();
    const collection=await db.collection(collectionName)
    const result =await collection.deleteOne({_id:new ObjectId(id)})
    if(result){
        res.send({message:"task delted",success:true,result})
    }
    else{
        res.send({message:"Try after some time",success:false})
    }
})

// for deleting multipe 
app.delete('/delete-multiple',verfiyJWTToken, async (req,res)=>{
    const ids =req.body
    const deleteTaskids=ids.map((item)=>new ObjectId(item))

    const db = await connection();
    const collection=await db.collection(collectionName)
    const result =await collection.deleteMany({_id:{$in:deleteTaskids}})
    if(result){
        res.send({message:"task delted",success:true})
    }
    else{
        res.send({message:"Try after some time",success:false})
    }
})

//for Updating task
app.put('/update-task',verfiyJWTToken, async(req,res)=>{
    const db =await connection();
    const collection = await db.collection(collectionName)
    const {_id,...fields}=req.body
    const update={$set: fields}
    const result = await collection.updateOne({_id:new ObjectId(_id)},update)
    if(result){
        res.send({message:"task data updated",success:true})
    }
    else{
        res.send({message:"Try after some time",success:false})
    }
    
})


app.get('/',verfiyJWTToken,(req,res)=>{
    res.send({
        message:'chl rha h',
        success:true
    })
})
app.listen(port ||3200,() => console.log(`Server is Running on ${port}`)
)

// create a middleware for checking jwt cookie
function verfiyJWTToken(req,res,next){
    //console.log("verify JWT ",req.cookies['token']);
    const token=req.cookies['token']
    jwt.verify(token,'Google',(err,decoded)=>{
        if(err){
           return  res.send({
                success:false,
                msg:"invalid token"
            })
        }
        //console.log(decoded);

        
         next();
    })
   
}