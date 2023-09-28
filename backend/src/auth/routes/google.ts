import { Router } from "express";
import passport from "passport";
import { ReqUser } from "src/types";

const router: Router = Router();

router.get(
  "/login/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "login",
  })
);

router.get(
  "/login/google/callback",
  passport.authenticate("google", { failureRedirect: "auth/login/google" }),
  // Redirect user back to the mobile app using deep linking
  (req, res) => {
    const user = req?.user as ReqUser;
    res.redirect(
      `${process.env.REDIRECT_URL_MOBILE}?token=${user.accessToken}`
    );
  }
);

export default router;
