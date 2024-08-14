import dbConnect from '../db/dbConnect.js';
import userModel from '../db/models/user.model.mjs';

export const getUsers = async () => {
    // Database Connection
    await dbConnect();

    let result = {status: 'error', message: "An Error Occurred", data: []};

    try {

        let data = await userModel.find({}).select('-__v');
        result = {status: 'ok', message: "Users fetched successfully", data: data}

    } catch (error) {   

        console.log(error)
       
    }

    return result
}

export const createUser = async (newUser) => {
  
    let result = {status: 'error', message: "An Error Occurred", data: []};

    await dbConnect();

    try {
        let data = await userModel.create(newUser);
        result = {status: 'ok', message: "User created successfully", data: data}

    } catch (error) {   

        console.log(error)
    }

    return result

}

export const updateUser = async (user) => {
    let result = {status: 'error', message: "An Error Occurred", data: []};

    await dbConnect();

    try {
        let data = await userModel.findByIdAndUpdate(user.id, user, {new: true});
        result = {status: 'ok', message: "User updated successfully", data: data}

    } catch (error) {   

        console.log(error)
    }

    return result
}

export const deleteUser = async (id) => {

    let result = {status: 'error', message: "An Error Occurred", data: []};

    await dbConnect();

    try {
        let data = await userModel.findByIdAndDelete(id);
        result = {status: 'ok', message: "User deleted successfully", data: data}

    } catch (error) {   

        console.log(error)
    }
    
    return result
}

export const getUserById = async (id) => {
    let result = {status: 'error', message: "An Error Occurred", data: []};

 
    await dbConnect();

    try {
        let data = await userModel.findById(id);
        result = {status: 'ok', message: "User fetched successfully", data: data}

    } catch (error) {   

        console.log(error)
    }

    return result
}