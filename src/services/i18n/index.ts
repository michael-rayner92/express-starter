import { TOptions } from "i18next";
import { Request } from "express";

type GetTranslation = (
  req: Request,
  fb: string,
  key: string,
  options?: string | TOptions
) => string;

export const getTranslation: GetTranslation = (req, fallback, key, options) => {
  const translation = req.t(key, options);
  const hasTranslation = req.i18n.exists(key);

  return hasTranslation ? translation : fallback;
};
