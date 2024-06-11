import { Request, Response } from "express"

export const searchRestAndDishes = async (req: Request, res: Response) => {
    try {


    } catch (error: any) {
        res.status(500).json({success: false, message: "Internal server error"})
    }
}