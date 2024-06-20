import express from "express"
import { searchRestAndDishes } from "../controllers/SearchController"

const router = express.Router()

router.get('/search/:name', searchRestAndDishes)

export default router