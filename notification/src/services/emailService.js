import * as Brevo from "@getbrevo/brevo";
import config from "../config/index.js"

const client = new Brevo.TransactionalEmailsApi();
client.authentications["api-key"].apikey = config.BREVO_API_KEY;

export async function sendEmail({ to, subject, html }) {
    const email = new Brevo.SendSmtpEmail();

    email.sender = {
        name: config.BREVO_SENDER_NAME,
        email: config.BREVO_SENDER_EMAIL
    };

    email.to = [{ email: to }];
    email.subject = subject;
    email.htmlContent = html;

    try {
        await client.sendTransacEmail(email);
        console.log(`Email sent successfully to ${to}`);
    } catch (error) {
        console.error(`Failed to send email to ${to}:`, error.message);
        throw error;
    }
}