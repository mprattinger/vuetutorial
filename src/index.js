import { App } from "./App/app";
import { logger } from "./logger";

logger.info("Application starting...");

const port = process.env.PORT || 3457;
logger.info(`Starting http server on port ${port}...`);

const app = new App();
app.express.listen(port, () => logger.info(`server is listening on ${port}!`));