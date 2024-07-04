import mongoose, { Schema, model, models, Document } from "mongoose";


interface UserTypes extends Document {
    username: string,
    email: string,
    password: string
}

const userSchema = new Schema<UserTypes>(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },

        username: {
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
            required: true
        }

    }, { timestamps: true }
)

const User = models.User as mongoose.Model<UserTypes> || model("User", userSchema)

export default User;