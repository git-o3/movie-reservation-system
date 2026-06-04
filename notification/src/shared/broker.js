import amqp from "amqplib"
import config from "../config/index.js";

let connection = null;
let channel = null;
let isConnecting = false;

export async function connectBroker() {
    if (connection && channel) return { connection, channel };
    if (isConnecting) {
        await new Promise(resolve => setTimeout(resolve, 1000))
        return connectBroker()
    }

    isConnecting = true;
    console.log("🔌 Connecting to RabbitMQ broker...");

    try {
        connection = await amqp.connect(config.msgBrokerURL);
        channel = await connection.createChannel();

        channel.on("error", (err) => console.error("Channel error:", err.message));
        channel.on("close", () => { channel = null; });

        await channel.prefetch(1);

        isConnecting = false;
        console.log("🚀 Successfully connected to RabbitMQ infrastructure Chief 🫡");
        console.log("😎 keep it Up Comrade await for new command")

        connection.on("error", (err) => {
            console.error("RabbitMQ connection error:", err.message);
            handleReconnect()
        });

        return { connection, channel };
    } catch (error) {
        isConnecting = false;
        console.error(`Failed to connect to RabbitMQ: ${error.message}`);
        handleReconnect()
    }
}

function handleReconnect() {
    connection = null;
    channel = null;
    console.log("🔁 Scheduling RabbitMQ reconnection in 5 seconds Chief 🫡")
    setTimeout(connectBroker, 5000);
}

export async function publishToQueue(queueName, payload) {
    try {
        if (!channel) {
            await connectBroker();
        }

        await channel.assertQueue(queueName, { durable: true })

        const messageBuffer = Buffer.from(JSON.stringify(payload));
        channel.sendToQueue(queueName, messageBuffer, { persistent: true });

        console.log(`Message successfully published to queue [${queueName}]`);
    } catch (error) {
        console.error(`Failed to publish message to queue [${queueName}]:`, error.message);
        throw error;
    }
}

export async function subscribeToQueue(queueName, onMessageAck) {
    try {
        if (!channel) {
            await connectBroker();
        }

        await channel.assertQueue(queueName, { durable: true });

        console.log(`Subscribed and listening to queue [${queueName}]`);

        await channel.consume(queueName, (msg) => {
            if (msg !== null ) {
                try {
                    const content = JSON.parse(msg.content.toString());
                    onMessageAck(content, () => channel.ack(msg));
                } catch (parseError) {
                    console.error("Error parsing incoming queue message:", parseError.message);
                    channel.nack(msg, false, false);
                }
            }
        });
    } catch (error) {
        console.error(`Failed to initialize subscriber on queue [${queueName}]:`, error.message);
        throw error;
    }
}