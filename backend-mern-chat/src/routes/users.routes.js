import { Router } from "express";
import {getAllUsers} from '../controllers/users.controller.js'
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route('/').get(verifyJwt, getAllUsers);


export default router;