import { Router } from "express";

import teamsController from "../controller/TeamController.js";

import multer from "multer";

const upload = multer({ dest: "./public/teams/" });

const router = Router();

router.route("/").get(teamsController.list);

router.route("/").post(upload.single("image"), teamsController.add);

router
  .route("/:id")
  .get(teamsController.getById)
  .patch(upload.single("image"), teamsController.update)
  .delete(teamsController.deleteById);

export default router;
