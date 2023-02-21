import LRUCache from "lru-cache";

let cache: LRUCache<unknown, any>;

declare global {
  var __cache: LRUCache<unknown, any> | undefined;
}

const options = {
  max: 500,
  maxSize: 5000,
  ttl: 1000 * 60 * 60 * 24 * 30,
  allowStale: true,
  sizeCalculation: (value: any) => Buffer.byteLength(JSON.stringify(value)),
};
if (process.env.NODE_ENV === "production") {
  cache = new LRUCache(options);
} else {
  if (!global.__cache) {
    global.__cache = new LRUCache(options);
  }
  cache = global.__cache;
}

export { cache };
