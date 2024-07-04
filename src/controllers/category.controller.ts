import { Request, Response } from "express";
import categoryModel from "@/models/category.model";

export default{
    async create(req : Request , res:Response){
        try {
            const result = await categoryModel.create(req.body);
            res.status(201).json({
                data: result,
                message : "Success create category"
            });
        } catch (error) {
            const err = error as Error;
            res.status(500).json({
                data : err.message,
                message : "Failed create category"
            });
        }
    },
    async findAll(req: Request , res:Response){
        try {
            const result = await categoryModel.find();
            res.status(201).json({
                data : result,
                message : "Success get all category"
            })
        } catch (error) {
            const err = error as Error;
            res.status(500).json({
                data : err.message,
                message : "Failed get all category"
            });
        }
    },
    async findOne(req: Request, res: Response){
        try {
            const result = await categoryModel.findOne({
                _id: req.params.id,
            });
            res.status(201).json({
                data : result,
                message : "Success get one category"
            })
        } catch (error) {
            const err = error as Error;
            res.status(500).json({
                data : err.message,
                message : "Failed get one category"
            });
        }
    },
    async update(req: Request, res:Response){
        try {
            const result = await categoryModel.findOneAndUpdate(
                {_id : req.params.id},
                req.body,
                {
                    new: true,
                }
            );
            res.status(201).json({
                data : result,
                message : "Success update category"
            })
        } catch (error) {
            const err = error as Error;
            res.status(500).json({
                data : err.message,
                message : "Failed get one category"
            });
        }
    },
    async delete(req:Request,res:Response){
        try {
            const result = await categoryModel.findOneAndDelete(
                {_id: req.params.id},
            );
            res.status(201).json({
                data : result,
                message : "Success delete category"
            })
        } catch (error) {
            const err = error as Error;
            res.status(500).json({
                data : err.message,
                message : "Failed delete category"
            });
        }
    }
}