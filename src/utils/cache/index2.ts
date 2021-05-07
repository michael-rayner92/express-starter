// import { promisify } from "util";
// import mongoose from "mongoose";
// import redis from "redis";

// const redisUrl = "redis://127.0.0.1:6379";
// const client = redis.createClient(redisUrl);
// const GET_ASYNC = promisify(client.get).bind(client);
// const GET_ASYNC_HASH = promisify(client.hget).bind(client);
// const SET_ASYNC = promisify(client.set).bind(client);
// const SET_ASYNC_HASH = promisify(client.hset).bind(client);

// const exec = mongoose.Query.prototype.exec;

// mongoose.Query.prototype.cache = function(options = {}) {
//   this.useCache = true;
//   this.hashKey = JSON.stringify(options.key ?? "");

//   return this;
// }

// mongoose.Query.prototype.exec = async function (): Promise<void> {
//   if (!this.useCache) return exec.apply(this, arguments);

//   const key = JSON.stringify(Object.assign({}, this.getQuery(), {
//     collection: this.mongooseCollection.name;
//   }));

//   // See if we have a value for 'key' in redis
//   // const cacheValue = await client.hget(this.hashKey, key);
//   const cacheValue = await GET_ASYNC_HASH(this.hashKey, key);

//   // If we do, return that
//   if (cacheValue) {
//     const doc = JSON.parse(cacheValue);

//     return Array.isArray(doc)
//     ? doc.map(d => new this.model(d))
//     : new this.model(doc);
//   }

//   // Otherwise, issue the query and store the result in redis
//   const result = await exec.apply(this, arguments);

//   client.hset(this.hashKey, key, JSON.stringify(result), "EX", 10);
//   // await SET_ASYNC(key, JSON.stringify(result), "EX", 10);
// };

// export const clearHash = (hashKey: any) => {
//   client.del(JSON.stringify(hashKey));
// }
