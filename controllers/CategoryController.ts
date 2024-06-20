import { Request, Response } from "express";
import Category from "../models/category"

export const addcategory = async (req: Request, res: Response) => {
    try {
        const newRestaurant = new Category(req.body);
        await newRestaurant.save();
        res.status(201).json(newRestaurant);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
      }
} 

export const getAllCatgeories = async (req: Request, res: Response) => {
    try {
        const category = await Category.find()
        res.status(200).json(category)
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
}