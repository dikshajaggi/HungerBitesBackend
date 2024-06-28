import express from "express"
import { createOrder, getAllOrders, getSpecificOrder } from "../controllers/OrderController.js"

const router = express.Router()

router.post('/place-order', createOrder)
router.get('/all-orders/:id', getAllOrders)
router.get('/order/:id', getSpecificOrder)

export default router
