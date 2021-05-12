import { Schema } from "mongoose";
import { IProfile, IProfileDoc, IProfileModel } from "./IProfile";

const fields: Record<keyof IProfile, unknown> = {
  // user: {
  //   type: Schema.Types.ObjectId,
  //   required: true,
  //   ref: "User"
  // }
  firstName: { type: String }
};

const options = {
  timestamps: true,
  toObject: { getters: true }
};

const ProfileSchema = new Schema<IProfileDoc, IProfileModel>(fields, options);

export default ProfileSchema;
