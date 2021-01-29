import { Document, model, Model, Schema } from 'mongoose';

interface IPost extends Document {
 
}

const PostSchema = new Schema({

})

export const Post: Model<IPost> = model<IPost>('Post', PostSchema);
