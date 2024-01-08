import { Router } from "express";

import multer from "multer";
import ReviewsController from "../controller/ReviewsController.js";

const upload = multer({ dest: "./public/reviews/" });

const router = Router();

router.route("/").get(ReviewsController.list);

router.route("/").post(upload.single("image"), ReviewsController.add);

router
  .route("/:id")
  .get(ReviewsController.getReviewById)
  .patch(ReviewsController.update)
  .delete(ReviewsController.deleteById);

export default router;
