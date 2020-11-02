import express from "express";
import bodyParser from "body-parser";
import { AppRoutes } from "./routes";
import cors from "cors";
import { GetDB } from "./models";
import { logger } from "../logger";

export class App {
    constructor() {
        this.express = express();
        this.setupApi();
        this.setupExpressLogging();
        AppRoutes(this.express);
        this.setupDb();
    }

    setupApi() {
        this.express.use(
            bodyParser.urlencoded({
                extended: true
            })
        );
        this.express.use(bodyParser.json());

        var corsOptions = {
            origin: "http://localhost:8080"
          };
        this.express.use(cors(corsOptions));
    }

    setupDb() {
        let db = GetDB();
        db.mongoose.connect(db.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => logger.info("Connected to database!"))
        .catch(err => {
            logger.error(err, "Error connecting to database");
            process.exit();
        });
    }

    setupExpressLogging() {
        if (process.env.NODE_ENV !== "development") return;
        this.express.use(
            expressWinston.logger({
                transports: [new winston.transports.Console()],
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.simple()
                ),
                meta: false, // optional: control whether you want to log the meta data about the request (default to true)
                msg:
                    "{{res.statusCode}} HTTP {{req.method}} {{req.url}} {{res.responseTime}}ms", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
                expressFormat: false, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
                colorize: true // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
            })
        );
    }
}