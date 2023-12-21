import { Request, Response } from "express";
import { OfferModel } from "../model/OfferModel";
import { UserModel } from "../model/UserModel";
import { ProductModel } from "../model/ProductModel";











// Get all offers sent
export const get_user_offers_sent = async (req: Request, res: Response) => {
    try {
        const sent_offers = await OfferModel.find().sort({ createdAt: -1 });
        // const user = await UserModel.findOne({_id:sent_offers.})
        return res.status(200).json(sent_offers);
    } catch (error) {
        res.status(500).json(error.message)

    }
}
// Create new offer
export const create_cash_offer = async (req: Request, res: Response) => {
    try {
        const {
            product_id,
            price_offered,

        } = req.body
        const { customer_id } = req.params
        const customer = await UserModel.findOne({ _id: customer_id })
        const product = await ProductModel.findOne({ _id: product_id })
        const sent_offer = new OfferModel({
            product,
            price_offered,
            customer,
            type: 'cash',
            offered: 'sent',

        })
        await sent_offer.save()
        return res.status(200).json({sent_offer, success:true});
    } catch (error) {
        res.status(500).json(error.message)

    }
}
// Create trade offer
export const create_trade_offer = async (req: Request, res: Response) => {
    try {
        const {
            product_name,
            product_value,
            product_category,
            product_condition,
            product_desc,
            product_id,
            images
        } = req.body
        const { customer_id } = req.params
        const customer = await UserModel.findOne({ _id: customer_id })
        const product = await ProductModel.findOne({ _id: product_id })
        const sent_offer = new OfferModel({
            product,
            customer,
            type: 'trade',
            product_name,
            product_value,
            product_category,
            product_condition,
            product_desc,
            images

        })
        await sent_offer.save()
        return res.status(200).json({sent_offer, success:true});
    } catch (error) {
        res.status(500).json(error.message)

    }
}
