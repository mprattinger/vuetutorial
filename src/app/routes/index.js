import { TutorialRoutes } from "./tutorial";

/**
 * 
 * @param {Express.Application} expressApp 
 */
export function AppRoutes(expressApp) {
    expressApp.get("/", (req, resp) => resp.json({ message: "Welcome to flint soft application." }));
    expressApp.get("/ping", (req, resp) => resp.send( "pong" ));

    expressApp.use("/api/v1/tutorials", TutorialRoutes());
}