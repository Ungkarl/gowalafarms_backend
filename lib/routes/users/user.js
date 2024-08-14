import express from 'express';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import { getNewUID } from '../../misc/helpers.js';
import * as mime from 'mime-types'

import { createUser, deleteUser, getUserById, updateUser } from '../../handlers/users.handler.js';
import auth from '../../middleware/auth.middleware.js';

const userRouter = express.Router();

// Multer Setup for storage.
const userStorage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, 'public/users')
    },
    filename: function (req, file, cb) {
        
        let newFileName = getNewUID() + '.' + mime.extension(file.mimetype)
        let ext = mime.extension(file.mimetype)

        cb(null, newFileName);
    }
});

const upload = multer({ storage: userStorage });

// POST
userRouter.post('/user', auth, upload.single('file'), async (req, res) => {
    
    const {name, email, role, password} = req.body;

    const newUser = {
        name: name,
        email: email,
        picture: "/users/fallback.jpg",
        role: role,
    }

    console.log("Req.Body", req.body)

    if(req.file) {
        newUser.picture = '/users/' + req.file.filename
    }
 
 
    newUser.hashedPassword = await bcrypt.hash(password, 10)

 

    const result = await createUser(newUser);
    
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


// PUT
userRouter.put('/user', auth, upload.single('file'), async (req, res) => {

    const updatedUser = {
        ...req.body
    }

    if(req.file) {
        updatedUser.picture = '/users/' + req.file.filename
    }
    
    let result = await updateUser(updatedUser);

    if(result.status === 'ok') {

        return res.status(200).send({ message: result.message, data: result.data })

    } else {

        return res.status(200).send({ message: result.message, data: {} })

    }

});

// DELETE
userRouter.delete('/user', auth, async (req, res) => {

    if(!req.query.id) {
        return res.status(200).send({ message: 'No ID provided', data: {}})
    }
    
    let result = await deleteUser(req.query.id);

    if(result.status === 'ok') {

        return res.status(200).send({ message: result.message, data: [] })

    } else {

        return res.status(200).send({ message: result.message, data: {} })

    }

})

// GET By ID
userRouter.get('/user', async (req, res) => {

    if(!req.query.id) {
        return res.status(200).send({ message: 'No ID provided', data: {}})
    }

    let result = await getUserById(req.query.id);

    if(result.status === 'ok') {

        return res.status(200).send({ message: result.message, data: result.data})

    } else {

        return res.status(200).send({ message: result.message, data: {} })

    }
    
})

export default userRouter;