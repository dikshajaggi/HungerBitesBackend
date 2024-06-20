import express from "express"
import { addcategory, getAllCatgeories } from "../controllers/CategoryController";

const router = express.Router();

router.post("/add-category", addcategory)
router.get("/category", getAllCatgeories)

export default router
