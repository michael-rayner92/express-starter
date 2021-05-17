import { Document, Model } from "mongoose";
import { ID } from "@interfaces/@types/mongoose";
// import { IUserDoc } from "./IUser";

export interface IProfile {
  firstName: string;
  // user: ID | IUserDoc;
}

// Add all methods here
export interface IProfileDoc extends IProfile, Document {
  // id?: string;
  // createdAt: Date;
  // updatedAt: Date;
}

// Interface with static methods
// export type IProfileModel = Model<IProfileDoc>;
// export type IProfileModel = Model<IProfileDoc, IUserModel>;
export interface IProfileModel extends Model<IProfileDoc> {
  id: ID;
  createdAt: Date;
  updatedAt: Date;
}
