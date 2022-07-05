import * as mongoose from "mongoose";
import * as bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

UserSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            return next()
        }
        this['password'] = await bcrypt.hash(this['password'], 10)
    } catch (err) {
        return next(err)
    }
})