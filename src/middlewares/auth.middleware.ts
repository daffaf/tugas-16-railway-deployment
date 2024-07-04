import { NextFunction, Request , Response } from "express";
import jwt from "jsonwebtoken";
import { SECRET } from "@/utils/env";
import { IReqUser } from "@/utils/interface";

export default (req: Request, res:Response, next : NextFunction) =>{
    const token = req.headers.authorization;
    
    if(!token){
        return res.status(401).json({
            messsage : "Unauthorized 2",
        })
    }
    const [prefix, accessToken] = token.split(" ");
    
    if(prefix !== "Bearer" || !accessToken ){
        res.status(401).json({
            messsage : "Unauthorized 1",
        })
    }
    const user = jwt.verify(accessToken,SECRET) as {id : string, role : string[]}
    console.log("🚀 ~ user:", user)
    
    if(!user){
        return res.status(401).json({
            messsage : "Unauthorized",
        })
    }
    (req as IReqUser).user = {
        id : user.id,
        role : user.role
    }
    next();
}