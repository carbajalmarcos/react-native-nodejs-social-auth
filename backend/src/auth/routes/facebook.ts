import { Request, Express, Response, Router } from "express";
import passport from "passport";
import { ReqUser } from "src/types";

const router: Router = Router();

router.get(
  "/login/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

router.get(
  "/login/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/auth/facebook" }),
  // Redirect user back to the mobile app using deep linking
  (req: Request, res: Response) => {
    const user = req?.user as ReqUser;
    res.redirect(
      `${process.env.REDIRECT_URL_MOBILE}?token=${user.accessToken}`
    );
  }
);

export default router;
