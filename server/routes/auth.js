import express from 'express';
import { register, login, getType} from '../controllers/auth.js';
const router = express.Router();





router.route("/register").post(register);

router.route("/login").post(login);

router.route("/login").get(getType);

export default router;