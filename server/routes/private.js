import express from "express";
import { getPrivateData } from "../controllers/private.js";
import protect from "../middleware/auth.js";




const router = express.Router();






router.route("/").get(getPrivateData);

export default router;