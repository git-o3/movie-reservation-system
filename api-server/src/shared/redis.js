import Redis from "ioreis";
import config from "../config/index.js";

const redis = new Redis({
    host: config.redis.host,
    port: config.redis.port
});

redis.on("connect", () => console.log("Redis Client Connected Chief 🫡"))
redis.on("error", (err) => console.error("Redis Connection Failed Chief 🚫:", err));

export async function setPipelineState(jobId, stateObject) {
    return await redis.hset(jobId, stateObject)
}

export async function getPipelineState(jobId) {
    return await redis.hgetall(jobId);
}

export async function updatePipelineState(jobId, updates) {
    return await redis.hset(jobId, updates);
}

export default redis;