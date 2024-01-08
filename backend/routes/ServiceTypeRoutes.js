import { Router } from "express";

import ServiceTypeController from "../controller/ServiceTypeController.js";

import checks from "../middleware/auth.js";

const router = Router();

router.route("/").get(ServiceTypeController.list);

router.route("/:id").get(ServiceTypeController.get);

router.use(checks.tokenCheck);

router.route("/").post(ServiceTypeController.create);

router
  .route("/:id")
  .patch(ServiceTypeController.update)
  .delete(ServiceTypeController.deleteById);

router.get("/search/all", ServiceTypeController.search);
export default router;
