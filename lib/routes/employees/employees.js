import express from 'express';
import { getEmployees } from '../../handlers/employees.handler.js';
import test from '../../middleware/test.middleware.js';

const employeesRouter = express.Router();


// Get
employeesRouter.get("/employees/", async (req, res) => {

    const data = await getEmployees();

    if(data.status === 'ok') {

        return res.status(200).send({ message: data.message, data: data.data });

    } else {

        return res.status(200).send({ message: data.message, data: [] });

    }

});

export default employeesRouter;