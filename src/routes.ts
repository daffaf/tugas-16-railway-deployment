import express from "express";

import uploadMiddleware from "./middlewares/upload.middleware";
import uploadController from "./controllers/upload.controller";
import productsController from "./controllers/products.controller";
import categoryController from "./controllers/category.controller";

import authMiddleware from "./middlewares/auth.middleware";
import authController from "./controllers/auth.controller";
import aclMiddleware from "./middlewares/acl.middleware";
const router = express.Router();

router.get("/products", productsController.findAll);
router.post("/products", productsController.create);
router.get("/products/:id", productsController.findOne);
router.put("/products/:id", productsController.update);
router.delete("/products/:id", productsController.delete);

router.get("/categories",categoryController.findAll);
router.post("/categories",categoryController.create);

router.post("/auth/login", authController.login);
router.post("/auth/register", authController.register);
router.get(
    "/auth/me",
    [authMiddleware,aclMiddleware(["admin"])],
    authController.me
);
router.put("/auth/profile", authMiddleware, authController.profile);

router.post("/upload", uploadMiddleware.single, uploadController.single);
router.post("/uploads", uploadMiddleware.multiple, uploadController.multiple);


export default router;
