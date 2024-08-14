import employeeModel from "../models/employee.model.mjs";
import userModel from "../models/user.model.mjs";


/*

    Create new User

*/
export const seedUser = async (user) => {

    try {
        
        let newUser = await userModel.create(user);

        console.log('User created:', newUser)

        return newUser

    } catch (error) {

        throw(error)

    }

}

/*

    Create new Employee

*/
export const seedDefaultEmployee = async (employee) => {

    try {
        
        let newEmployee = await employeeModel.create(employee);

        console.log('Employee created:', newEmployee)

        return newEmployee
    } catch (error) {
        throw(error)
    }

}