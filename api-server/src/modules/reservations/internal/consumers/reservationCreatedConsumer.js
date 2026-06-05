import { createQueueConsumer } from "../../../../shared/createQueueConsumer.js";
import { publishToQueue } from "../../../../shared/broker.js";
import { getPipelineState, updatePipelineState } from "../../../../shared/redis.js"
import { ReservationModuleApi } from "../../publicApi.js";

const LISTEN_QUEUE = "reservation_created";
const NEXT_QUEUE = "reservation_confirmed";

export async function initReservationCreatedConsumer() {
    await createQueueConsumer(LISTEN_QUEUE, async (message, ack) => {
        const { jobId } = message;

        if (!jobId) {
            console.warn("Malformed message on reservation.created. Skipping...");
            return ack();
        }
         
        // read full state from Redis
        const state = await getPipelineState(jobId);

        if (!state) {
            console.warn(`No pipeline state found for jobId: ${jobId}. Skipping...`);
            return ack()
        }
        
        // update reservation status in DB
        await ReservationModuleApi.updateStatus(state.reservationId, "confirmed");
        
        // update Redis state
        await updatePipelineState(jobId, { status: "confirmed" });

        // publish to next queue
        await publishToQueue(NEXT_QUEUE, { jobId })
        ack();
    })
}