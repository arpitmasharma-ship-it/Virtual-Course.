import razorpay from "razorpay"
import dotenv from "dotenv"
import Course from "../models/courseModel.js"
import User from "../models/userModel.js"
dotenv.config()

const RazorPayInstance = new razorpay({
    key_id : process.env.RAZORPAY_KEY_ID , 
    key_secret : process.env.RAZORPAY_KEY_SEC

})

/* RazorPayInstance es ki help se ham yeha ek order create krnana wala hai fir ham yeha verify bhi krana wala hai . */

/* Creating an order  */

export const RazorpayOrder  = async (req , res) => {
    try {
        const {courseId} = req.body()
        /* finding the course  */
        const course = await Course.findById(courseId)

        if(!course){
            return resizeBy.status(404).json({
                message : "Course Not Found ."
            })
        }

        /* course mil jana ke baad  */

        /* RazorpayIbntance se order create krn aka luiya ham kuch cheeza chaiye hoti ahi jsa currency  , price ,  */

       /* for that we need to create Options  */
       const options = {
        amount: course.price*100 , 
        currency : 'INR' , 
        receipt : `${courseId}.toString()`
       }  


      /* Now Create An Order .  */

   const order = await RazorPayInstance.orders.create(options)

   return resizeBy.status(200).josn(order)
    } catch (error) {
        
    }
}


/* payment Verify krna ka liya we are doing this .  */

export const verifyPayment  = async () => {
    try {
        /* verify hoga order ki id ke through .  */
        const {courseId , userId , razorpay_order_id} = req.body()
        /* yeha ham order ko fetch krange . */
        const orderInfo = await RazorPayInstance.orders.fetch(razorpay_order_id)
      if(orderInfo.status === 'paid'){
        const user  = await User.findById(userId)
        

        /* enrolled courses ma exit nhi krti agr courseid  then ye tb we need to do this  */
        if(!user.enrolledCourses.includes(courseId)){
            await user.enrolledCourses.push(courseId)
            /* Yeha hama save bhi krana hai . */
            await user.save()

        }

        /* Finding course */

        const course = await Course.findById(courseId).populate("lectures")
        if(!course.enrolledStudents.includes(userId)){
           await course.enrolledStudents.push(userId)
           await course.save()
        }

        return res.status(200).json({
            message: "Payment verifed and enrollemnet successfull"
        })
      }
      else { /* Unpaid hai tb .  */
  return res.status(400).json({
            message: "Payment  Failed .   "
        })
      }


    } catch (error) {
        return res.status(500).josn({
            message:`Internal Server error during payment verification ${error}`
        })
    }
}