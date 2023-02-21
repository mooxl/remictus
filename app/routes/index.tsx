import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { directus } from "~/utils/directus.server";
import type { Collection } from "~/utils/directus.server";
import { cache } from "~/utils/lru.server";

export const loader = async () => {
  let payload: Collection[] = [];
  try {
    if (cache.has("index")) {
      payload = (await cache.get("index")) as Collection[];
    } else {
      payload = (await directus.items("collection").readByQuery()).data!;
      cache.set("index", payload);
    }
  } catch (error) {
    console.log(error);
  }
  return json({ payload });
};

export default () => {
  const { payload } = useLoaderData<typeof loader>();
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-gray-300">
      <h1 className="text-5xl font-semibold">Remictus</h1>
      <h2>{payload[0]?.input}</h2>
    </main>
  );
};
