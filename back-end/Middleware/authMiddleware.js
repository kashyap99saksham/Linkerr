import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const secret = process.env.JWT_KEY;
const authMiddlware = async (req, res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        console.log(token)
        if(token)   {
            const decoded = jwt.verify(token,secret);
            console.log(token)
            req.body._id=decoded?.id;
        }
        next();
    } catch(err)  {
        console.log(err)
    }
}
export default authMiddlware;