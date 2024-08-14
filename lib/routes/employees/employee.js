import express from 'express';
import { createEmployee, deleteEmployee, getEmployeeById, updateEmployee } from '../../handlers/employees.handler.js';
import multer from 'multer';
import { getNewUID } from '../../misc/helpers.js';
import * as mime from 'mime-types'
import auth from '../../middleware/auth.middleware.js';

const employeeRouter = express.Router();

// Multer Setup for storage.
const employeeStorage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, 'public/employees')
    },
    filename: function (req, file, cb) {
        console.log('FILE', file, req.body)
        
        let newFileName = getNewUID() + '.' + mime.extension(file.mimetype)
        let ext = mime.extension(file.mimetype)
        console.log('Ext', ext, newFileName)
        cb(null, newFileName);
    }
});

const upload = multer({ storage: employeeStorage });

// GET By ID
employeeRouter.get('/employee', async (req, res) => {

    if(!req.query.id) {
        return res.status(200).send({ message: 'No ID provided', data: {}})
    }

    let result = await getEmployeeById(req.query.id);

    if(result.status === 'ok') {

        return res.status(200).send({ message: result.message, data: result.data})

    } else {

        return res.status(200).send({ message: result.message, data: {} })

    }
    
})

// DELETE
employeeRouter.delete('/employee', auth, async (req, res) => {

    if(!req.query.id) {
        return res.status(200).send({ message: 'No ID provided', data: {}})
    }
    
    let result = await deleteEmployee(req.query.id);

    if(result.status === 'ok') {

        return res.status(200).send({ message: result.message, data: [] })

    } else {

        return res.status(200).send({ message: result.message, data: {} })

    }

})

// PUT
employeeRouter.put('/employee', auth, upload.single('file'), async (req, res) => {

    const updatedEmployee = {
        ...req.body
    }

    if(req.file) {
        updatedEmployee.imagePath = '/employees/' + req.file.filename
    }
    
    let result = await updateEmployee(updatedEmployee);

    if(result.status === 'ok') {

        return res.status(200).send({ message: result.message, data: result.data })

    } else {

        return res.status(200).send({ message: result.message, data: {} })

    }

});

// POST
employeeRouter.post('/employee', auth, upload.single('file'), async (req, res) => {
    
    const {name, position, description} = req.body;

    const newEmployee = {
        name: name,
        position: position,
        description: description,
        imagePath: '/employees/no-employee.jpg'
    }

    if(req.file) {
        newEmployee.imagePath = '/employees/' + req.file.filename
    }

    const result = await createEmployee(newEmployee);
    
    if(result.status === 'ok') {

        return res.status(200).send(
            { message: result.message, 
                data: result.data 
            }
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

export default employeeRouter;