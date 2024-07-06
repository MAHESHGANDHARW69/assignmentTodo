import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addFavCites=async(req,res)=>{
    try {
        const {user_id,city} = req.body;
        const cities = await prisma.favorites.findFirst({where:{user_id:user_id}});
        let result;        
        if(cities){
            for(let i=0;i<city.length;i++){
                if(!cities.fav_city.includes(city[i])){
                    city.forEach(val=>cities.fav_city.push(val))
                    const newArray =cities.fav_city
                    result = await prisma.favorites.update({where:{user_id:user_id},data:{fav_city:newArray}})
                }
                return res.json({status:200,data:cities,message: "city is already added"})                
            }                         
        }else{
            result = await prisma.favorites.create({
                data:{
                    user_id:user_id,
                    fav_city:city
                },
            });
        }
        // if(cities){
        //     if(!cities.fav_city.includes(city)){
        //         city.forEach(val=>cities.fav_city.push(val))
        //         const newArray =cities.fav_city
        //         result = await prisma.favorites.update({where:{user_id:user_id},data:{fav_city:newArray}})
        //     }else{
        //         return res.json({status:400,message: "city is already added"})
        //     }             
        // }else{
        //     result = await prisma.favorites.create({
        //         data:{
        //             user_id:user_id,
        //             fav_city:city
        //         },
        //     });
        // }
               
        
        return res.json({ status: 200,success:true, data: result, msg: "favorite city saved" });
        
    } catch (err) {
        res.send(err)
        console.log(err)        
    }
}

export const removeFavCites=async(req,res)=>{
    try {
        const {user_id,city} = req.body;
        const cities = await prisma.favorites.findFirst({where:{user_id:user_id}});
        let result;
        if(cities.fav_city.includes(city)){
            const newArray = cities.fav_city.filter(val=>val!== city)
            result = await prisma.favorites.update({where:{user_id:user_id},data:{fav_city:newArray}})
        }

        return res.json({ status: 200,success:true, data: result, msg: "favorite city removed" });

    } catch (error) {
        res.send(err)
        console.log(err)        
    }
}

export const fetchFavCites=async(req,res)=>{
    try {
        const {user_id} = req.body;
        const result = await prisma.favorites.findFirst({where:{user_id:user_id}});
        return res.json({ status: 201,success:true, data: result, msg: "fetched favorite city" });
        
    } catch (err) {
        res.send(err)
        console.log(err)        
    }
}