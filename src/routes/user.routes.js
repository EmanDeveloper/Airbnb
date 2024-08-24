import { Router } from "express";
import { Signup,RegisterUser,Login,checkLogin, Logout } from "../controllers/user.controller.js";
import passport from "passport";
import { isLogin,saveRedirectUrl } from "../middleware/login.middleware.js";

const router=Router();

router.route("/signup").get(Signup);
router.route("/create").post(RegisterUser);
router.route("/login").get(Login);

router.route("/login").post(saveRedirectUrl,
    passport.authenticate("local",
        {failureRedirect:"/user/login",failureFlash: true }),
    checkLogin);

router.route("/logout").get(isLogin,Logout);

export default router;