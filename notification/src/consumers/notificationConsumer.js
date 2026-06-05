import { createQueueConsumer } from "../shared/createQueueConsumer.js";
import { sendEmail } from "../services/emailService.js";
import { reservationConfirmedTemplate } from "../templates/reservationConfirmed.js";
import { reservationCancelledTemplate } from "../templates/reservationCancelled.js";

const LISTEN_QUEUE = "notification_send";

const templates = {
    reservation_confirmed: reservationConfirmedTemplate,
    reservation_cancelled: reservationCancelledTemplate,
};

export async function initNotificationConsumer() {
    await createQueueConsumer(LISTEN_QUEUE, async (message, ack) => {
        const { userId, type, payload, email } = message;
        console.log("Received message:", message);

        if (!userId || !type || !email) {
            console.warn("Malformed message on notification_send. Skipping...");
            return ack();
        }

        const template = templates[type];

        if (!template) {
            console.warn(`No template found for type: ${type}. Skipping...`);
            return ack();
        }

        const { subject, html } = template(payload);

        await sendEmail({ to: email, subject, html });

        ack();
    })
}