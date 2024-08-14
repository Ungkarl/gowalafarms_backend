import { exit } from 'process';
import bcrypt from 'bcryptjs';
import dbConnect from '../dbConnect.js';
import { seedDefaultEmployee, seedUser } from './seedHelper.js';


/*

    This is our default setup for a seeding file - it is low key and primitive until we have found
    the struture for our projects.

*/

console.log('----------------------')
console.log('Media College Viborg')
console.log('Seeding files')
console.log('----------------------\n')

// Database Connection
await dbConnect();

const user = await seedUser({
    "name" : "admin",
    "email" : "admin@mediacollege.dk",
    "role" : "admin",
    "hashedPassword" : await bcrypt.hash("admin", 10)
})

// const employee = await seedDefaultEmployee(
//     {
//         "name" : "Sahjahan Sagor",
//         "position" : "Founder",
//         "description" : `<p>Continually productize compelling quality for packed with  Elated Themes Setting up to website and it crating pages.</p>`,
//         "imagePath" : "/employees/01.jpg",
//     }
// );

console.log('\n----------------------');
console.log('Seeding files completed');
console.log('----------------------');

exit();