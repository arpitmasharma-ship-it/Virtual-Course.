import jwt from"jsonwebtoken" /* bec ham jwt ki help se hi token create krange  */
 


const genToken = async (userId) => {
    try {
        /* jwt.sign({userId} , )   jwt.sign ek property hai token create krna ki , and ham token create kr raha hai userId ki help se and we need to pass JWT_SECRET . */
        const token = await jwt.sign({userId} ,process.env.JWT_SECRET , {expiresIn:"7d"} )
        /* {expiresIn:"7d"}   kitna din ma expie hoga ye  */
        console.log(token)
        return token
    } catch (error) {
        console.log(error)
    }
 }

 export default genToken