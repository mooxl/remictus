import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { directus } from "~/utils/directus.server";
import type { Collection } from "~/utils/directus.server";
import { cache } from "~/utils/lru.server";
import { Image } from "@unpic/react";

export const loader = async () => {
  try {
    let payload: Collection[];
    if (cache.has("index")) {
      payload = (await cache.get("index")) as Collection[];
    } else {
      payload = (await directus.items("collection").readByQuery({})).data!;
      cache.set("index", payload);
    }
    return json({ payload });
  } catch (error) {
    console.log(error);
    return redirect("/");
  }
};

export default () => {
  const { payload } = useLoaderData<typeof loader>();
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-gray-300">
      <h1 className="text-5xl font-semibold">{payload[0].input}</h1>
      <Image
        src="http://localhost:8055/assets/a31d2683-fb78-43e4-b637-79905a332393/experimental4_c6a5b96de6.jpg"
        layout="fullWidth"
        alt="A lovely bath"
      />
    </main>
  );
};
