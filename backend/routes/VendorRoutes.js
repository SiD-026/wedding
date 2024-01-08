import { Router } from "express";
import vendorContoller from "../controller/VendorContoller.js";

import checks from "../middleware/auth.js"

const router = Router()

router.post("/login", vendorContoller.login)

router.post("/", vendorContoller.create);

router.use(checks.tokenCheck)


router.route("/search")
    .get(vendorContoller.search);

router.route("/password/change")
    .post(vendorContoller.changePassword);

router.route("/:id")
    .get(vendorContoller.get)
    .patch(vendorContoller.update)
    .delete(vendorContoller.deleteById)


router.get("/", vendorContoller.list);


export default router;