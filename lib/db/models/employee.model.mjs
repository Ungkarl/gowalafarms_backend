import mongoose, { Schema } from 'mongoose';
mongoose.set('runValidators', true);

const employeeScheme = new Schema({
    
    name: { type: String,  required: true },
    position: { type: String,  required: true },
    description: { type: String,  required: true },
    imagePath: { type: String, default: '/employees/no-employee.jpg' },
    created: { type: Date, default : new Date() },

});

export default mongoose.models.employee || mongoose.model('employee', employeeScheme);