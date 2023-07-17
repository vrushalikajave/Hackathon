import express from "express";
import CategoryController from "../Controllers/categoryController"
import upload from "../utilities/Storage.Util";
import CategorySchema from "../Constants/CategorySchema";
import { celebrate } from "celebrate";

const router= express.Router()

router.post("/create",
     upload.none(),
    // fileValidationMiddleware.validateSingleFile("image", true, ['image/jpg', 'image/jpeg', 'image/png']),
    celebrate(CategorySchema.create),
    CategoryController.create
);

router.delete("/delete",  celebrate(CategorySchema.remove), CategoryController.remove);

router.get("/get",CategoryController.getCategory)

router.put("/update",
upload.none(),
CategoryController.update
);


router.get("/byId",  CategoryController.getById);

export default router