import { Router } from "express";
import * as adminController from "../controller/AdminController.js";

const router = Router();

router.post("/login", adminController.login);

router.post("/password/change", adminController.changePassword);

export default router;