import { PrismaClient } from "@prisma/client";
import {compare, hash} from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const createUser=async(req,res)=>{
    try {
        const {name,email,password,city} = req.body;
        const findUser = await prisma.user.findUnique({where:{email:email}})
        if(findUser){
            return res.json({status:400,message: "Email Already Taken . please another email."})
        }
        const encryptedPassword = await hash(password, 8);
        const newUser = await prisma.user.create({
            data:{
                name:name,
                email:email,
                password:encryptedPassword,
                city:city
            },
        });
        let saveData = {
            id:newUser.id,
            email:newUser.email
        }
        const token = await jwt.sign(saveData, "mynameismaheshnodejsdevloper");
        return res.json({ status: 200,success:true, data: newUser,auth_token: token, msg: "User created." });
        
    } catch (err) {
        res.send(err)        
    }
}

export const loginUser=async(req,res)=>{
    try {
        const {email,password} = req.body;
        const existUser = await prisma.user.findUnique({where:{email:email}})
        const isMatch = await compare(password, existUser.password);
        let data = {
            id:existUser.id,
            email:existUser.email
        }
        const token = await jwt.sign(data, "mynameismaheshnodejsdevloper");
        if (isMatch) {
            return res.json({status:200, email: existUser.email, password: existUser.password, auth_token: token, msg: "User LoggedIn!" });
        } else {
            return res.json({status:404, error: 'Invalid password Details' });
        }
    } catch (err) {
        res.send(err)        
    }
}