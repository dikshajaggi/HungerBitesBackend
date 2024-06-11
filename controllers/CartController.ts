import { Request, Response } from "express"
import Cart from "../models/cart"


/**
 * @swagger
 * /api/add-to-cart:
 *   post:
 *     summary: Add an item to the cart
 *     tags: 
 *       - Cart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 description: The user ID
 *                 example: "60c72b2f5f1b2c001c8e4c8b"
 *               menu:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The ID of the menu item
 *                     example: "60c72b2f5f1b2c001c8e4c8c"
 *                   name:
 *                     type: string
 *                     description: The name of the menu item
 *                     example: "Pizza"
 *                   description:
 *                     type: string
 *                     description: The description of the menu item
 *                     example: "Delicious pizza with cheese and toppings"
 *                   price:
 *                     type: number
 *                     description: The price of the menu item
 *                     example: 10.99
 *                   category:
 *                     type: string
 *                     description: The category of the menu item
 *                     example: "Main Course"
 *                   imageId:
 *                     type: string
 *                     description: The ID of the image associated with the menu item
 *                     example: "60c72b2f5f1b2c001c8e4c8d"
 *                   inStock:
 *                     type: number
 *                     description: The quantity of the menu item in stock
 *                     example: 20
 *               quantity:
 *                 type: number
 *                 description: The quantity of the item being added to the cart
 *                 example: 2
 *     responses:
 *       201:
 *         description: Item added to cart successfully
 *       500:
 *         description: Internal server error
 */

export const addToCart = async (req: Request, res: Response) => {
    try {
        const { user, menu, quantity } = req.body;
        let cart = await Cart.findOne({ user });
        if (!cart) {
            cart = new Cart({ user, items: [] });
        }
        const itemExists = cart.items.some(item => item.menu.id === menu.id);

        if (itemExists) {
            return res.status(400).json({ success: false, message: 'Item already exists in the cart' });
        }
        const cartItem = { menu, quantity };
        cart.items.push(cartItem);
        await cart.save();
        res.status(201).json({ message: "Item added to cart successfully" });
    } catch (error) {
        console.error(error);
        if (error instanceof Error) {
            res.status(500).json({ success: false, message: error.message });
        } else {
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }
};

/**
 * @swagger
 * /api/get-cart-items/{userId}:
 *   get:
 *     summary: Get all items in the cart for a user
 *     description: Retrieve all items currently in the cart for a specific user.
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user whose cart items are to be retrieved.
 *     responses:
 *       '200':
 *         description: An array of cart items.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates whether the request was successful.
 *                 items:
 *                   type: array
 *                   description: List of items in the cart.
 *                   items:
 *                     $ref: 'models/cart' 
 *       '404':
 *         description: Cart not found for the specified user ID.
 *       '500':
 *         description: Internal server error.
 */

export const getAllCartItems = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }
        res.status(200).json({ success: true, items: cart });

    } catch (error: any) {
        console.log(error, "error cart items")
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}

/**
 * @swagger
 * /api/update-cart-qty/{userId}:
*   post:
 *     summary: Update the quantity of an item in the cart
 *     description: Update the quantity of a specific item in the cart for a user.
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user whose cart is being updated.
 *       - in: body
 *         name: cartUpdate
 *         description: Object containing the item ID and update type
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               description: The ID of the item to update.
 *             type:
 *               type: string
 *               enum: [inc, dec]
 *               description: The type of update (increase or decrease quantity).
 *     responses:
 *       '200':
 *         description: Cart updated successfully
 *       '404':
 *         description: Cart not found for the specified user ID.
 *       '500':
 *         description: Internal server error.
 */

export const updateCartQty = async (req: Request, res: Response) => {
    try {
        const { id, type } = req.body
        const userId = req.params.userId;
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }
        const item = cart.items.filter(item => item.menu.id === id)
        if (type === "inc") item[0].quantity = item[0].quantity + 1
        else if (type === "dec") {
            if (item[0].quantity > 1) {
                item[0].quantity -= 1;
            }
        }
        await cart.save()
        res.status(200).json({ success: true, items: cart, message: "Cart updated successfully" });
    } catch (error: any) {
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}

/**
 * @swagger
 * /api/clear-cart/{userId}:
 *   delete:
 *     summary: Remove all items from the cart
 *     description: Remove all items from the cart for a specific user.
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user whose cart items are to be removed.
 *     responses:
 *       '200':
 *         description: All cart items removed successfully
 *       '404':
 *         description: Cart not found for the specified user ID.
 *       '500':
 *         description: Internal server error.
 */

export const deleteAllItems = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }
        cart.items.splice(0, cart.items.length);
        await cart.save()
        res.status(200).json({ success: true, message: "All cart items removed successfully" })
    } catch (error: any) {
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}

/**
 * @swagger
 * /api/delete-specific/{userId}:
 *   delete:
 *     summary: Remove a specific item from the cart
 *     description: Remove a specific item from the cart for a specific user.
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user whose cart item is to be removed.
 *       - in: body
 *         name: itemData
 *         description: Object containing the ID of the item to remove
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               description: The ID of the item to remove.
 *     responses:
 *       '200':
 *         description: Item removed successfully
 *       '404':
 *         description: Cart not found for the specified user ID or item not found in cart.
 *       '500':
 *         description: Internal server error.
 */

export const deleteSpecificItem = async (req: Request, res: Response) => {
    try {
        const { id } = req.body
        const userId = req.params.userId;
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }
        const itemIndex = cart.items.findIndex(item => item.menu.id === id)
        if (itemIndex === -1) {
            return res.status(404).json({ success: false, message: 'Item not found in cart' });
        }
        cart.items.splice(itemIndex, 1)
        await cart.save()
        res.status(200).json({ success: true, message: "item removed successfully" })
    } catch (error: any) {
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}