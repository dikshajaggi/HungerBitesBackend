import { Request, Response } from "express"

export const createOrder = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;

    } catch (error: any) {
        res.status(500).json({success: false, message: "Internal server error"})
    }
}

export const getSpecificOrder = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;

    } catch (error: any) {
        res.status(500).json({success: false, message: "Internal server error"})
    }
}

export const getAllOrders = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;

    } catch (error: any) {
        res.status(500).json({success: false, message: "Internal server error"})
    }
}