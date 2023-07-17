import express from "express";
import ProductController from "../Controllers/productController"
import upload from "../utilities/Storage.Util";
import * as fileValidationMiddleware from "../middlewares/file.middleware";

const router = express.Router()

router.post("/create",
    upload.single("image"),
    fileValidationMiddleware.validateSingleFile("image", true, ['image/jpg', 'image/jpeg', 'image/png']),
    ProductController.create
);

router.delete("/delete", ProductController.remove);

router.post("/get", ProductController.getProduct)

router.put("/update",
    upload.none(),
    ProductController.update
);


router.get("/byId", ProductController.getById);

export default router