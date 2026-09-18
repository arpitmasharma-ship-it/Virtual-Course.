import jwt from "jsonwebtoken"  /* token ko verify krnba hai isliye */

const isAuth = async (req, res, next) => {
    try {
        /* jb yeha pa ye next wala function call hoga tb hi ham route ma aage badh payange. */


        /* yeha  token ko leke aata hai .. */
        let { token } = req.cookies  /* cookie ma jo token store ho raha tha vaha se le lega token ko  */


console.log("TOKEN FROM COOKIE:", token);
        if (!token) {
            return res.status(400).json({
                message: "User Not Have Any Token ."
            })
        }

        /* And ager token hai tho ham token ko verify krwa lega  */
        let verifyToken = await jwt.verify(token, process.env.JWT_SECRET)

        if (!verifyToken) {
            return res.status(400).json({
                message: "User Not Have Any Valid Token ."
            })
        }

        /* ager token valid hai  tho  */
        req.userId = verifyToken.userId
        next()  /*  mtlb jasa hi user id mil jayegi fir vo aga badh jayega  */

        /* Example 
        {
        Maan lo token ke andar data tha:
       { 
        userId: "12345",
        email: "arpit@gmail.com"
        }
    
        verifyToken.userId ==>"12345"
    } */



    } catch (error) {
        return res.status(500).json({
            message: `isAuth Error ${error}`
        })
    }



}

/* isAuth ke help se ham user ki id ko get kr payega   */
/* jo bhi current user hoga jiska token ccookie ma store hoga usse hame pata chal jayega   */

export default isAuth