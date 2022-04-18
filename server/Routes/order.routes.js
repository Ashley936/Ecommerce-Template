import express from "express";
const router = express.Router();
import { addOrderItems, getOrderById } from "../Controllers/orderController.js";
import protect from "../Middleware/auth.middleware.js";

router.route("/").post(protect, addOrderItems);
router.route("/:id").get(protect, getOrderById);

export { router };
