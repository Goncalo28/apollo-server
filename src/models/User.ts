import { Document, model, Model, Schema } from 'mongoose';

interface IUser extends Document {
 
}

const UserSchema = new Schema({

})

export const User: Model<IUser> = model<IUser>('User', UserSchema);
