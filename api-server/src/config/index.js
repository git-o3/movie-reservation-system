import { config } from "dotenv";

config();

const {
    MONGO_URI,
    PORT = 8081,
    JWT_SECRET,
    NODE_ENV,
    MESSAGE_BROKER_URL,
    REDIS_HOST = "127.0.0.1",
    REDIS_PORT = 6379
} = process.env;

const queue = { 
    notifications: "NOTIFICATIONS" 
};

export default {
    MONGO_URI,
    PORT: parseInt(PORT, 10),
    JWT_SECRET,
    env: NODE_ENV,
    msgBrokerURL: MESSAGE_BROKER_URL,
    redis: {
        host: REDIS_HOST,
        port: parseInt(REDIS_PORT, 10)
    },
    queue
};