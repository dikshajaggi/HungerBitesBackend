import { Request, Response } from "express";
import FavouriteRest from "../models/favRest";

export const addFavRest = async (req: Request, res: Response) => {
    try {
        const {userId, restId} = req.body;
        const favRest = new FavouriteRest({userId, restId})
        await favRest.save()
        res.status(200).json({success: true, message:"Fav rest added successfully"})
    } catch (error: any) {
        res.status(500).json({success: false, message: "Internal server error"})
    }
}

export const removeFavRest = async (req: Request, res: Response) => {
    try {
        const {userId, restId} = req.body;
        const favorite = await FavouriteRest.findOneAndDelete({ userId, restId })
        if (!favorite) {
            return res.status(404).json({ message: 'Favorite not found' });
          }
        res.status(200).json({success: true, message:"Fav rest removed successfully"})
    } catch (error: any) {
        res.status(500).json({success: false, message: "Internal server error"})
    }
}

export const showFavRests = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const data = await FavouriteRest.find({userId})
        if (!data || data?.length === 0) {
            return res.status(404).json({ success: false, message: "No restaurants marked as favourite" })
        }
        res.status(200).json({success: true, message: "Fetched all fav restaurants successfully", items: data})

    } catch (error: any) {
        res.status(500).json({success: false, message: "Internal server error"})
    }
}