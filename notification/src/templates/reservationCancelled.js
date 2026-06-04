export function reservationCancelledTemplate({ reservationId }) {
    return {
        subject: "Your Reservation has been Cancelled",
        html: `
            <h1>Reservation Cancelled</h1>
            <p>Your reservation <strong>${reservationId}</strong> has been cancelled.</p>
            <p>We hope to see you again soon buddy.</p>
        `
    };
}