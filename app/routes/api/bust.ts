import { cache } from "~/utils/lru.server";

export const loader = async () => {
  cache.clear();
  console.log("Cache cleared");
  return null;
};
