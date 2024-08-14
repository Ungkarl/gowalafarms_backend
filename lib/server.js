// Server Module.

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import indexRouter from './routes/index.js';
import employeesRouter from './routes/employees/employees.js';
import employeeRouter from './routes/employees/employee.js';
import authRouter from './routes/auth/auth.js';
import authTokenRouter from './routes/auth/token.js';
import usersRouter from './routes/users/users.js';
import userRouter from './routes/users/user.js';

const server = {};
const expressServer = express();

//Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
expressServer.use(bodyParser.json());
expressServer.use(bodyParser.urlencoded({ extended: true }));

// Cross Origin Resource Sharing
expressServer.use(cors());

// Serve static files from the public and www directories.
expressServer.use(express.static('public'));
expressServer.use(express.static('www'));

// Add routes to the server.
expressServer.use(indexRouter);
expressServer.use(employeeRouter);
expressServer.use(employeesRouter);
expressServer.use(authRouter);
expressServer.use(authTokenRouter);
expressServer.use(usersRouter);
expressServer.use(userRouter);

// Run the server.
server.run = () => {

    console.log('\n\n---------------------');
    console.log('Starter REACT DEV Server', process.env.NODE_ENV, process.env.SERVER_HOST);
    console.log('\n\n---------------------');

    expressServer.listen(process.env.SERVER_PORT, () =>
      console.log(`Serveren lytter på port ${process.env.SERVER_PORT}`)
    );

};

// Export the server.
export default server;


