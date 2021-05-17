import { Schema, SchemaOptions } from "mongoose";
import { ITenant, ITenantDoc, ITenantModel } from "./ITenant";

const fields: Record<keyof ITenant, unknown> = {
  name: { type: String },
  dbName: { type: String }
};

const options: SchemaOptions = {
  timestamps: true,
  toObject: { getters: true },
  optimisticConcurrency: true
};

const TenantSchema = new Schema<ITenantDoc, ITenantModel>(fields, options);

export default TenantSchema;
