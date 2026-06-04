import { createQueueConsumer } from "../../../../shared/createQueueConsumer.js";
import { getPipelineState, updatePipelineState } from "../../../../shared/redis.js";

const LISTEN_QUEUE = "reservation_notified";

export async function initReservationNotifiedConsumer() {
    await createQueueConsumer(LISTEN_QUEUE, async (message, ack) => {
        const { jobId } = message;

        if (!jobId) {
            console.warn("Malformed message on reservation.notfied. Skipping...");
            return ack();
        }

        const state = await getPipelineState(jobId);

        if (!state) {
            console.warn(`No pipeline state found for jobId: ${jobId}. Skipping...`);
            return ask();
        }

        await updatePipelineState(jobId, { status: "completed" });

        console.log(`Reservation pipeline completed for jobid: ${jobId}`);

        ask();
    });
}