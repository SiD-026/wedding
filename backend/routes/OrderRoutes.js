import { Router } from "express";
import orderController from "../controller/OrderController.js";
import checks from "../middleware/auth.js"

const router = Router();

router.use(checks.tokenCheck)

router.route("/search")
    .get(orderController.search);


router.route("/:id")
    .get(orderController.get)
    .patch(orderController.update)
    .delete(orderController.deleteById)


router.route("/")
    .post(orderController.create)
    .get(orderController.list)


export default router;