import { Router } from "express";
import {
  registerUser,
  loginUser,
  logOutUser,
  getUser,
  refreshAccessToken,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(upload.single("avatar"), registerUser);

router.route("/login").post(loginUser);

// secured routes
router.route("/logout").post(verifyJwt, logOutUser);
router.route("/:id").get(verifyJwt, getUser);
router.route("/refreshToken").post(verifyJwt, refreshAccessToken);
export default router;
