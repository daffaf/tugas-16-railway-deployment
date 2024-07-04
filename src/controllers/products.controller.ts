import { Request, Response } from "express";
import ProductsModel from "@/models/products.model";
import categoryModel from "@/models/category.model";
import * as Yup from 'yup';

const createValidationSchema = Yup.object().shape({
  name : Yup.string().required(),
  price : Yup.string().required(),
  description : Yup.string().required(),
  category : Yup.string().required(),
  images : Yup.array().of(Yup.string()).required().min(1),
  qty : Yup.string().required().min(1),
})
export default {
  async create(req: Request, res: Response) {
    try {
      const {name,description,images,price,qty,categoryName} = req.body;
      // mencari dan cek nama kategori terlebih dulu berdasarkan request 
      const category = await categoryModel.findOne({name : categoryName});
      if(!category){
        return res.status(400).json({
          message: "category not found"
        })
      }
      await createValidationSchema.validate({
          name,
          description,
          images,
          price,
          qty,
          category : category._id,
      });
      const result = await ProductsModel.create(
        {
          name,
          description,
          images,
          price,
          qty,
          category : category._id, // mengambil id dari var category 
        }
      );
      res.status(201).json({
        data: result,
        message: "Success create product",
      });
    } catch (error) {
      if(error instanceof Yup.ValidationError){
        res.status(400).json({
          data: error.errors,
          message: "Failed create product",
        });
        return;
      }
      const err = error as Error;
      res.status(500).json({
        data: err.message,
        message: "Failed create product",
      });
    }
  },
  async findAll(req: Request, res: Response) {
    interface IPaginationQuery {
      page : number,
      limit : number,
      search? : string
    }
    try {
      const {
        limit = 10,
        page = 1,
        search = "",
      } = req.query as unknown as IPaginationQuery;

      const query = {};
      if(search){
        Object.assign(query,{
          name : {$regex : search, $option : "i"},
        });
      }
      const result = await ProductsModel.find(query)
      .limit(limit)
      .skip((page - 1)  * limit)
      .sort({createdAt : -1})
      .populate('category');
      const total = await ProductsModel.countDocuments(query);
      // const result = await ProductsModel.find().populate('category','name createdAt');
      res.status(200).json({
        data: result,
        message: "Success get all products",
        page : +page,
        limit : +limit,
        total,
        totalPages : Math.ceil(total / limit),
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        data: err.message,
        message: "Failed get all products",
      });
    }
  },
  async findOne(req: Request, res: Response) {
    try {
      const result = await ProductsModel.findOne({
        _id: req.params.id,
      });
      res.status(200).json({
        data: result,
        message: "Success get one product",
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        data: err.message,
        message: "Failed get one product",
      });
    }
  },
  async update(req: Request, res: Response) {
    try {
      const result = await ProductsModel.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        {
          new: true,
        }
      );

      res.status(200).json({
        data: result,
        message: "Success update product",
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        data: err.message,
        message: "Failed update product",
      });
    }
  },
  async delete(req: Request, res: Response) {
    try {
      const result = await ProductsModel.findOneAndDelete({
        _id: req.params.id,
      });

      res.status(200).json({
        data: result,
        message: "Success delete product",
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        data: err.message,
        message: "Failed delete product",
      });
    }
  },
};
