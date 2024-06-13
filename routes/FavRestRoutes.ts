import express from 'express';
import { addFavRest, showFavRests, removeFavRest } from '../controllers/FavRestController';
const router = express.Router()

router.post("/add-favrest", addFavRest)
router.get("/favrest/:id", showFavRests)
router.delete("/remove-favrest", removeFavRest)


export default router