import { Request, Response } from "express";
import { ProductModel } from "../model/ProductModel";
import { product_schema } from "../milddleware/input_validation";
import * as z from 'zod'
import { UserModel } from "../model/UserModel";



// Get all products
export const get_all_product = async (req: Request, res: Response) => {
    try {
        const all_products = await ProductModel.find().sort({ createdAt: -1 });
        return res.status(200).json(all_products);
    } catch (error) {
        res.status(500).json(error.message)

    }
}




// Get product
export const get_product = async (req: Request, res: Response) => {
    try {
        const product_id  = req.params.product_id
        const owner_id  = req.params.owner_id
        const product = await ProductModel.findOne({ _id: product_id })
        const product_owner = await UserModel.findOne({ _id: owner_id })
        return res.status(200).json({product, product_owner});
    } catch (error) {
        res.status(500).json(error.message)

    }
}


// Get user product
export const get_user_products = async (req: Request, res: Response) => {
    try {
        console.log("test")
        const owner_id  = req.params.owner_id
        console.log("ownerId", owner_id)
        const product = await ProductModel.find({ owner_id })
        // // const user_products = await UserModel.findOne({ _id: owner_id })
        return res.status(200).json(product);
    } catch (error) {
        res.status(500).json(error.message)

    }
}


// Create new product
export const new_product = async (req: Request, response: Response) => {
    const result: any = product_schema.safeParse(req.body)
    if (!result.success) return response.status(401)
        .json(`${result.error.issues[0]['path'][0]},${result.error.issues[0]['message']}`)
    const {
        owner_id,
        product_name,
        product_price,
        product_category,
        product_condition,
        product_desc,
        deal_type,
        images
    } = req.body
    try {
        const new_product = new ProductModel({
            owner_id,
            product_name,
            product_price,
            product_category,
            product_condition,
            product_desc,
            deal_type,
            images
        });
        await new_product.save()
        return response.status(200).json({ product: new_product, success: true });
    } catch (error) {
        response.status(500).json(error.message)
    }
}


