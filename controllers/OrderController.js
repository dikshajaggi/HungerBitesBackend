import Orders from "../models/order.js";
import Cart from "../models/cart.js";


export const createOrder = async (req, res) => {
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
    } catch (error) {
        console.log(error, "error placing order");
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// cartid => fetch cart details => fetch itemid => get details of the particular order

export const getSpecificOrder = async (req, res) => {
    // will run on view order/reorder
    try {
        const {user, cart} = req.body;
        const order = await Orders.findOne({user})
        if (!order) {
            res.status(404).json({success: false, message: "order not found"})
        }
        const cartData = await Cart.findOne({cart})
        res.status(200).json({success: true, items: cartData})
    } catch (error) {
        res.status(500).json({success: false, message: "Internal server error"})
    }
}

export const getAllOrders = async (req, res) => {
    // will run on show previous orders
    try {
        const user = req.params.id;
        const data = await Orders.findOne({user})
        console.log(user, data, "getting user orders", req.params)
        res.status(200).json({success: true, items: data})

    } catch (error) {
        res.status(500).json({success: false, message: "Internal server error"})
    }
}