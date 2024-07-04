import { Request, Response , NextFunction } from "express";
import { IReqUser } from "@/utils/interface";

export default (roles : string [])=>
    (req : Request, res : Response, next : NextFunction) =>{
        const userRoles = (req as IReqUser).user.role;

        if(!userRoles || !userRoles.some((userRole)=> roles.includes(userRole))){
            return res.status(403).json({
                message : "Forbidden",
            })
        }
        next();
    }

