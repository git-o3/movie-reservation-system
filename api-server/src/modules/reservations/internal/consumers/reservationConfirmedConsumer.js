import { createQueueConsumer } from "../../../../shared/createQueueConsumer.js";
import { publishToQueue } from "../../../../shared/broker.js";
import { getPipelineState, updatePipelineState } from "../../../../shared/redis.js";

const LISTEN_QUEUE = "reservation_confirmed";
const NEXT_QUEUE = "reservation_notified";
const NOTIFICATION_QUEUE = "notification_send";

export async function initReservationConfirmedConsumer() {
    await createQueueConsumer(LISTEN_QUEUE, async(message, ack) => {
        const { jobId } = message;

        if (!jobId) {
            console.warn("Malformed message on reservation.confirmed. skipping...");
            return ack();
        }

        const state = await getPipelineState(jobId);

        if (!state) {
            console.warn(`No pipeline state found for jobId: ${jobId}. Skipping...`);
            return ack()
        }
        
        // notify via queue
        await publishToQueue(NOTIFICATION_QUEUE, {
            userId: state.userId,
            type: "reservation_confirmed",
            payload: { reservationId: state.reservationId }
        });

        await updatePipelineState(jobId, { status: "notified" })

        await publishToQueue(NEXT_QUEUE, { jobId });

        ack();
    });
}