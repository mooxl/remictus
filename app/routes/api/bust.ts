import type { LoaderArgs } from "@remix-run/node";
import { cache } from "~/utils/lru.server";

export const loader = async ({ request }: LoaderArgs) => {
  cache.clear();
  console.log("Cache cleared");
  return null;
};
