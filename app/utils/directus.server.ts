import { Directus } from "@directus/sdk";
import type { ID } from "@directus/sdk";
import { CMS_URL } from "./env.server";

export type Collection = {
  id: ID;
  input: string;
};

type Collections = {
  collection: Collection;
};

export const directus = new Directus<Collections>(
  (process.env.NODE_ENV === "development" ? "http://" : "https://") + CMS_URL
)!;
