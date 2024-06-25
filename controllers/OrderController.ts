import { Request, Response } from "express"
import Orders from "../models/order";
import Cart from "../models/cart";


export const createOrder = async (req: Request, res: Response) => {
    try {
        const { user, orderItems } = req.body;
        console.log(user, orderItems, req.body, "placing order details");

        let order = await Orders.findOne({ user });

        if (order) {
            order.orderItems.push(...orderItems); // Spread the orderItems to correctly add them to the array
        } else {
            order = new Orders({ user, orderItems: [...orderItems] }); // Spread the orderItems
        }

        await order.save();

        res.status(201).json({ success: true, message: "Order placed successfully" });
    } catch (error: any) {
        console.log(error, "error placing order");
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// cartid => fetch cart details => fetch itemid => get details of the particular order

export const getSpecificOrder = async (req: Request, res: Response) => {
    // will run on view order/reorder
    try {
        const {user, cart} = req.body;
        const order = await Orders.findOne({user})
        if (order!) {
            res.status(404).json({success: false, message: "order not found"})
        }
        const cartData = await Cart.findOne({cart})
        res.status(200).json({success: true, items: cartData})
    } catch (error: any) {
        res.status(500).json({success: false, message: "Internal server error"})
    }
}

export const getAllOrders = async (req: Request, res: Response) => {
    // will run on show previous orders
    try {
        const user = req.params.id;
        const data = await Orders.findOne({user})
        console.log(user, data, "getting user orders", req.params)
        res.status(200).json({success: true, items: data})

    } catch (error: any) {
        res.status(500).json({success: false, message: "Internal server error"})
    }
}