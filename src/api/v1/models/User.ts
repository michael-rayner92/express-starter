import { Document, Schema, SchemaOptions } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const schemaOptions: SchemaOptions = {
  timestamps: true,
  toObject: { getters: true },
  optimisticConcurrency: true
};

export const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      trim: true,
      required: [true, "Please add an email address"],
      lowercase: true,
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email"
      ]
    },
    password: {
      type: String,
      minlength: [6, "Password must be between 6 and 32 characters"],
      maxlength: [32, "Password must be between 6 and 32 characters"],
      required: [true, "Please add a valid email"],
      select: false
    }
  },
  schemaOptions
);

// export default model<IUser>("User", UserSchema);
