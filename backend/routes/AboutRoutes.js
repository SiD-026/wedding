import { Router } from "express";

import multer from "multer";
import aboutController from "../controller/AboutController.js";

const upload = multer({ dest: "./public/about/" });

const router = Router();

router.route("/").get(aboutController.list);

router.route("/").post(upload.single("image"), aboutController.add);

router
  .route("/:id")
  .get(aboutController.getById)
  .patch(upload.single("image"),aboutController.update)
  .delete(aboutController.deleteById);

export default router;
