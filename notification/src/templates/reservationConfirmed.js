export function reservationConfirmedTemplate({ reservationId }) {
    return {
        subject: "Your Reservation is Confirmed!",
        htmL: `
             <h1>Reservation Confirmed</h1>
             <p> Your reservation <strong>${reservationId}</strong> has been confirmed.</p>
             <p>Enjoy your movie buddy!</p>
        `
    };
}