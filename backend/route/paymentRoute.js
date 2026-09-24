import express from "express"
import { RazorpayOrder, verifyPayment } from "../controller/orderController"



const paymentRouter = express.Router() 
paymentRouter.post("/razorpay_order" , RazorpayOrder)
paymentRouter.post("/verifypayment" , verifyPayment)

export default paymentRouter