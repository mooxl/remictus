import * as dotenv from "dotenv";

export const { CMS_URL } = dotenv.config({
  path: ".env.development",
}).parsed!;
