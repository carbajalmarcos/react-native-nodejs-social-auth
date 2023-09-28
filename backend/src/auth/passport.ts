import passport from "passport";
import cookieSession from "cookie-session";

import { Strategy as FacebookStrategy } from "passport-facebook";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Express } from "express";
import { formatEntityData, getAccessToken } from "./utils";

export const initPassport = (app: Express) => {
  if (process.env.ENABLES_AUTH_FEATURES?.includes("facebook"))
    passport.use(
      new FacebookStrategy(
        {
          clientID: process.env.FACEBOOK_APP_ID ?? "",
          clientSecret: process.env.FACEBOOK_APP_SECRET ?? "",
          //todo: based on env, change url to localhost, dev or prod
          callbackURL: "http://localhost:4000/user/login/facebook/callback",
          enableProof: true, //to enable secret proof
          profileFields: ["id", "emails", "name"], //scope of fields
        },
        async (accessToken: any, refreshToken: any, profile: any, done: any) => {
          //done(err, user) will return the user we got from fb
          done(null, getAccessToken(profile._json));
        }
      )
    );
  if (process.env.ENABLES_AUTH_FEATURES?.includes("google"))
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID ?? "",
          clientSecret: process.env.GOOGLE_CLIENT_SECRET_ID ?? "",
          //todo: based on env, change url to localhost, dev or prod
          callbackURL: "http://localhost:4000/auth/login/google/callback",
        },
        (request: any, accessToken: any, refreshToken: any, profile: any, done: any) => {
          //done(err, user) will return the user we got from fb
          // done(null, formatEntityData(profile));
          return done(null, getAccessToken(profile._json));
        }
      )
    );

  // Serialize user into the sessions
  passport.serializeUser((user: any, done) => {
    done(null, user)
  });

  // Deserialize user from the sessions
  passport.deserializeUser((user: any, done) => {
    done(null, user)
  });
  //init's the app session
  //cookie midleware
  app.use(cookieSession({
    name: "session",
    maxAge: 30 * 24 * 60 * 60 * 1000, // how long this cookie could exist in browser
    keys: ["test"],
  }));
  //init passport
  app.use(passport.initialize());
  app.use(passport.session());
};


