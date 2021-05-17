import { Document, Model } from "mongoose";
import { ID } from "@interfaces/@types/mongoose";

export interface ITenant {
  name: string;
  dbName: string;
}

export interface ITenantDoc extends ITenant, Document {
  // STUFF GOES HERE
}

export interface ITenantModel extends Model<ITenantDoc> {
  id: ID;
  createdAt: Date;
  updatedAt: Date;
}
