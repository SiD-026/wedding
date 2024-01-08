import { Router } from "express";

import * as billController from "../controller/BillController.js";

const router = Router();

router.route("/").get(billController.getBills).post(billController.createBill);

router.route("/search")
    .get(billController.search);

router
  .route("/:id")
  .get(billController.getBill)
  .put(billController.updateBill)
  .delete(billController.deleteBill);

export default router;
