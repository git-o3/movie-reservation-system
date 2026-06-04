import { config } from "dotenv";

config();

const {
    PORT = 8080,
    NODE_ENV,
    MESSAGE_BROKER_URL,
    REDIS_HOST = "127.0.0.1",
    REDIS_PORT = 6379,
    BREVO_API_KEY,
    BREVO_SENDER_EMAIL,
    BREVO_SENDER_NAME
} = process.env;

const queue = { 
    notifications: "NOTIFICATIONS" 
};

export default {
    PORT: parseInt(PORT, 10),
    env: NODE_ENV,
    msgBrokerURL: MESSAGE_BROKER_URL,
    redis: {
        host: REDIS_HOST,
        port: parseInt(REDIS_PORT, 10)
    },
    BREVO_API_KEY,
    BREVO_SENDER_EMAIL,
    BREVO_SENDER_NAME,
    queue
};