import { Router } from "express";

import serviceController from "../controller/ServiceController.js";

import checks from "../middleware/auth.js";

import multer from "multer";

const upload = multer({ dest: "./public/services/" });

const router = Router();
router.get("/searchByVendors", serviceController.searchByVendors);

router.route("/").get(serviceController.list);

router.route("/:id").get(serviceController.get);

router.get("/search/all", serviceController.search);
router.get("/stateCity/state/city", serviceController.AllState);



router
  .route("/")
//   .get(serviceController.list)
  .post(upload.single("image"), serviceController.create);

router
  .route("/:id")
//   .get(serviceController.get)
  .patch(upload.single("image"), serviceController.update)
  .delete(serviceController.deleteById);

router.route("/like/:id").put(serviceController.Like)
router.route("/unlike/:id").put(serviceController.UnLike)

export default router;
