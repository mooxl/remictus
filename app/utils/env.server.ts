import * as dotenv from "dotenv";

export const { CMS_URL } = dotenv.config({
  path:
    process.env.NODE_ENV === "development"
      ? ".env.development"
      : ".env.production",
}).parsed!;
