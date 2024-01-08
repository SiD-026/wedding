import feedbackController from "../controller/FeedbackController.js";
import { Router } from "express";

const router = Router()

router.route("/")
    .post(feedbackController.add)
    .get(feedbackController.list)

    router.route("/:id")
    .delete(feedbackController.deleteById);
export default router;