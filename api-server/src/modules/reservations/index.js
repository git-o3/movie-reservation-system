import reservationRouter from "./routes.js";
import { initReservationCreatedConsumer } from "./internal/consumers/reservationCreatedConsumer.js";
import { initReservationConfirmedConsumer } from "./internal/consumers/reservationConfirmedConsumer.js";
import { initReservationNotifiedConsumer } from "./internal/consumers/reservationNotifiedConsumer.js";
import { initReservationCancelledConsumer } from "./internal/consumers/reservationCancelledConsumer.js";
import { connectBroker } from "../../shared/broker.js";
export { ReservationModuleApi } from "./publicApi.js";

export default {
    reservationRouter
}

export async function initReservationModule() {

    await initReservationCreatedConsumer();
    await initReservationConfirmedConsumer();
    await initReservationNotifiedConsumer();
    await initReservationCancelledConsumer();

    console.log("Reservation module consumers online.");
}