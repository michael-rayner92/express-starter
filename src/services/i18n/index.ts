import { GetTranslation } from "./types";

export const getTranslation: GetTranslation = (req, fallback, key, options) => {
  const translation = req.t(key, options);
  const hasTranslation = req.i18n.exists(key);

  return hasTranslation ? translation : fallback;
};
