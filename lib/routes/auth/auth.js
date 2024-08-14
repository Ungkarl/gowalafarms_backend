import express from 'express';
import { signInUser } from '../../handlers/auth.handler.js';
const authRouter = express.Router();

// Get
authRouter.post("/auth/signin", async (req, res) => {
  
    const result = await signInUser(req.body);
  
    if(result.status === 'ok') {

        return res.status(200).send(
            { message: result.message, data: result.data }
        );

    } else {

        return res.status(200).send(
            { 
                message: result.message, 
                data: [] 
            }
        );

    }
 

});


export default authRouter;