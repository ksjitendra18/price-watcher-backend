import { Router } from "express";
import loginUser from "../controllers/auth/login";
import signupUser from "../controllers/auth/signup";
import authStatus from "../controllers/auth/status";

const router = Router();

router.post("/login", loginUser);
router.post("/signup", signupUser);
router.post("/status", authStatus);

export default router;
