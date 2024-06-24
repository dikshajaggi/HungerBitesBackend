import { Request, Response } from "express"
import Orders from "../models/order";

export const createOrder = async (req: Request, res: Response) => {
    // will run once the order is placed
    try {
        const {user, items} = req.body
        console.log(user, items, req.body, "placing order details")
        let order = await Orders.findOne({user});
        if (order) {
            const orderData = items;
            order.items.push(orderData); 
        } else {
            order = new Orders({ user, items: [] });
        }
        await order.save();
        res.status(201).json({ success: true, message: "Item added to cart successfully" });

    } catch (error: any) {
        console.log(error, "error placing order")
        res.status(500).json({success: false, message: "Internal server error"})
    }
}

// cartid => fetch cart details => fetch itemid => get details of the particular order

export const getSpecificOrder = async (req: Request, res: Response) => {
    // will run on view order/reorder
    try {
        const userId = req.params.userId;

    } catch (error: any) {
        res.status(500).json({success: false, message: "Internal server error"})
    }
}

export const getAllOrders = async (req: Request, res: Response) => {
    // will run on show previous orders
    try {
        const userId = req.params.userId;

    } catch (error: any) {
        res.status(500).json({success: false, message: "Internal server error"})
    }
}