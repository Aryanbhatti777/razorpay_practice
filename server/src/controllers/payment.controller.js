import paymentModel from "../models/payment.model.js";
import productModel from "../models/product.model.js";
import paymentInstance from "../config/razorpay.config.js";


export const createOrder = async (req, res) => {
    
    const { productId } = req.params;

    const product = await productModel.findById(productId);

    if (!product) {
        return res.status(404).json({
            message: "Product not found."
        })
    }

    const order = await paymentInstance.orders.create({
        amount: product.price.amount * 100,
        currency: product.price.currency,
        receipt: `rcpt_${Date.now()}`,
        notes: {
            productId: String(product._id)
        }
    })

    const payment = await paymentModel.create({
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        product: product._id,
        status: "pending"
    })

    return res.status(201).json({
        message: "Order created",
        payment
    })
}