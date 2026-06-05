import app from "./app.js";
import config from "./config/index.js";
import { connectDB } from "./shared/db.js";
import { connectBroker } from "./shared/broker.js";
import { initReservationModule } from "./modules/reservations/index.js";


async function bootstrap() {
  try {
    console.log("🚀 Initializing Modular Monolith Infrastructure Lifecycle..");

    await connectDB();

    await connectBroker();
    await initReservationModule();
   

    app.listen(config.PORT, () => {
      console.log(
        `Server running on port ${config.PORT} in ${config.env} mode Chief 🫡`,
      );
    });
  } catch (error) {
    console.error(" Critical System Orchestration Failure:", error.message);
    process.exit(1);
  }
}


bootstrap();


