import dbConnect from '../db/dbConnect.js';
import employeeModel from '../db/models/employee.model.mjs';

export const getEmployees = async () => {
    // Database Connection
    await dbConnect();

    let result = {status: 'error', message: "An Error Occurred", data: []};

    try {

        let data = await employeeModel.find({});
        result = {status: 'ok', message: "Employees fetched successfully", data: data}

    } catch (error) {   

        console.log(error)
       
    }

    return result
}

export const createEmployee = async (newEmployee) => {
  
    let result = {status: 'error', message: "An Error Occurred", data: []};

    await dbConnect();

    try {
        let data = await employeeModel.create(newEmployee);
        result = {status: 'ok', message: "Employee created successfully", data: data}

    } catch (error) {   

        console.log(error)
    }

    return result

}

export const updateEmployee = async (employee) => {
    let result = {status: 'error', message: "An Error Occurred", data: []};

    console.log(employee)

    await dbConnect();

    try {
        let data = await employeeModel.findByIdAndUpdate(employee.id, employee, {new: true});
        result = {status: 'ok', message: "Employee updated successfully", data: data}

    } catch (error) {   

        console.log(error)
    }

    return result
}

export const deleteEmployee = async (id) => {

    let result = {status: 'error', message: "An Error Occurred", data: []};

    await dbConnect();

    try {
        let data = await employeeModel.findByIdAndDelete(id);
        result = {status: 'ok', message: "Employee deleted successfully", data: data}

    } catch (error) {   

        console.log(error)
    }
    
    return result
}

export const getEmployeeById = async (id) => {
    let result = {status: 'error', message: "An Error Occurred", data: []};

    console.log('getEmployeeById', id)
    await dbConnect();

    try {
        let data = await employeeModel.findById(id);
        result = {status: 'ok', message: "Employee fetched successfully", data: data}

    } catch (error) {   

        console.log(error)
    }

    return result
}