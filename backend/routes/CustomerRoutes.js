import { Router } from "express";
import customerController from "../controller/CustomerController.js";

import checks from "../middleware/auth.js"

const router = Router();

router.post("/login", customerController.login)

router.post("/", customerController.create)

router.use(checks.tokenCheck)

router.route("/search")
    .get(customerController.search);

router.route("/password/change")
    .post(customerController.changePassword);

    
router.route("/:id")
    .get(customerController.get)
    .patch(customerController.update)
    .delete(customerController.deleteById)


router.route("/")
    .get(customerController.list)


export default router;