import dbConnect from "../db/dbConnect.js";
import userModel from "../db/models/user.model.mjs";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signInUser = async (credentials) => {

    let result = {status: 'error', message: "An Error Occurred", data: []};

    try {
        
        await dbConnect();

        let user = await userModel.findOne({email: credentials.email});

        if(!user) {

            result = {status: 'error', message: "An Error Occurred", data: []};
    
        } else {
            
            let validPass = await bcryptjs.compare(credentials.password, user.hashedPassword);
          
         
            if (!validPass) {
                result = { status: 'error', message: "Wrong Password. Try Again", data: [] };
                return result;
            }

            const token = jwt.sign(
                {
                  _id : user._id,
                  email : user.email,
                  name: user.name,
                  picture: user.picture,
                  role: user.role
                },
                process.env.JWT_SECRET, {
                  expiresIn : process.env.JWT_EXPIRES_IN
                }
              )
    
            result = {status: 'ok', message: "User signin successfullysssssss", data: {token : token}}
        }

      
    } catch (error) {   

   
        result = {status: 'ok', message: "Token Expired", data: {}}
    }

    return result
};


export const signInWithToken = async (token) => {


    await dbConnect();

    let result = {status: 'ok', message: "Token Expired", data: {}}

    try {

        console.log('Token ', token, process.env.JWT_SECRET)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

     

        if(decoded) {
            let user = await userModel.findOne({email: decoded.email});

            result = {status: 'ok', message: "Token Auth Success", data: user}
        }

    } catch (error) {
        result = {status: 'ok', message: "Token Expired", data: {}}
        // console.log(error)
    }
  
    return result;
   
};
