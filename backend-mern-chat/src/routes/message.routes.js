import { Router } from "express";
import { getMessages,postMessage } from "../controllers/message.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route('/:id').get(verifyJwt, getMessages);

router.route('/:id').post(verifyJwt, upload.single("audio"), postMessage);

export default router;