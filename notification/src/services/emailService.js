import { BrevoClient } from "@getbrevo/brevo";
import config from "../config/index.js"

const client = new BrevoClient({
    apiKey: config.BREVO_API_KEY
});

export async function sendEmail({ to, subject, html }) {
    try {
        await client.transactionalEmails.sendTransacEmail({
            sender: {
                name: config.BREVO_SENDER_NAME,
                email: config.BREVO_SENDER_EMAIL
            },
            to: [{ email: to }],
            subject,
            htmlContent: html
        });
        console.log(`Email sent successfully to ${to}`);
    } catch (error) {
        console.error(`Failed to send email to ${to}`, error.message);
        throw error;
    }
}