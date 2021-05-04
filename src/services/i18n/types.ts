import { Request } from "express";
import { TOptions } from "i18next";

export type GetTranslation = (
  req: Request,
  fb: string,
  key: string,
  options?: string | TOptions
) => string;
