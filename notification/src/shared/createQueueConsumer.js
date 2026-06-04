import { subscribeToQueue } from "./broker.js";

export async function createQueueConsumer(queueName, handler) {
    try {
        await subscribeToQueue(queueName, async (message, ack) => {
            if (!message) {
                console.warn(`Malformed message on queue ${queueName}. Skipping...`);
                return ack();
            }

            try {
                await handler(message, ask);
            } catch (error) {
                console.error(`handler failed on queue ${queueName}:`, error.message);
            }
        });

        console.log(`Consumer listening on queue: ${queueName}`);
    } catch (error) {
        console.error(`Failed to initialize consumer on ${queueName}`, error.message);
        throw new Error(`Consumer failed to initialize: ${error.message}`)
    }
}