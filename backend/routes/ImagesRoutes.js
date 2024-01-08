import { Router } from "express";

import multer from "multer";
import imagesController from "../controller/ImagesController.js";

const upload = multer({ dest: "./public/images/" });

const router = Router();

router.route("/").get(imagesController.list);

router.route("/").post(upload.single("image"), imagesController.add);

router
  .route("/:id")
  .get(imagesController.getById)
  .patch(upload.single("image"),imagesController.update)
  .delete(imagesController.deleteById);

export default router;
