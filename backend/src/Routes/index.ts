
import categoryRoutes  from "./category.routes"
import productRoutes  from "./product.routes"
import userRoutes  from "./user.routes"
import express from "express"
const router= express.Router()

router.use("/category", categoryRoutes)
router.use("/products", productRoutes)
router.use("/user", userRoutes)

export default router

