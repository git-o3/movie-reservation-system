import { publishToQueue } from "../../../../shared/broker.js";
import { createQueueConsumer } from "../../../../shared/createQueueConsumer.js";
import { getPipelineState, updatePipelineState } from "../../../../shared/redis.js";

const LISTEN_QUEUE = "reservation_cancelled";
const NOTIFICATION_QUEUE = "notification_send";

export async function initReservationCancelledConsumer() {
    await createQueueConsumer(LISTEN_QUEUE, async (message, ack) => {
        const { jobId } = message;

        if (!jobId) {
            console.warn("Malformed message on reservation.cancelled. Skipping...");
            return ack();
        }

        const state = await getPipelineState(jobId);

        if (!state) {
            console.warn(`No pipeline state found for jobId: ${jobId}. Skipping...`)
            return ack();
        }

        await publishToQueue(NOTIFICATION_QUEUE, {
            userId: state.userId,
            type: "reservation_cancelled",
            payload: { reservationId: state.reservationId }
        })

        await updatePipelineState(jobId, { status: "completed" });

        console.log(`Cancellation pipeline completed for jobId: ${jobId}`);

        ack();
    });
}