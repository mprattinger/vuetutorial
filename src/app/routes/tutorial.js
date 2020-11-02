import { Router } from "express";
import { TutorialController } from "../controllers/tutorial.controller";

export function TutorialRoutes() {
    const tutorialController = new TutorialController();
    const routes = new Router();

    routes.post("/", tutorialController.create);
    
    routes.get("/", tutorialController.findAll);
    routes.get("/published", tutorialController.findAllPublished);
    routes.get("/:id", tutorialController.findOne);

    routes.put("/:id", tutorialController.update);

    routes.delete("/:id", tutorialController.delete);
    routes.delete("/", tutorialController.deleteAll);

    return routes;
}