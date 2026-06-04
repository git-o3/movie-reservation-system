import app from "./app.js";
import config from "./config/index.js";
import { connectBroker } from "./shared/broker.js";
import { initNotificationConsumer } from "./consumers/notificationConsumer.js";

async function bootstrap() {
    try {
        console.log("🚀 Initializing Notification Service Infrastructure Lifecycle..");

        await connectBroker();
        await initNotificationConsumer();

        app.listen(config.PORT, () => {
            console.log(`Notification service running on port ${config.PORT} in ${config.env} mode Chief 🫡`);
        });
    } catch (error) {
        console.error("Critical Notification Service Failure:", error.message);
        process.exit(1);
    }
}

bootstrap();