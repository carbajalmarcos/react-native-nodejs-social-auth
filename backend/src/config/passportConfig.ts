export const facebook = {
  clientID: process.env.FACEBOOK_APP_ID ?? "",
  clientSecret: process.env.FACEBOOK_APP_SECRET ?? "",
  //todo: based on env, change url to localhost, dev or prod
  callbackURL: "http://localhost:5000/user/login/facebook/callback",
  enableProof: true, //to enable secret proof
  profileFields: ["id", "emails", "name"], //scope of fields
};

export const google = {
  clientID: process.env.GOOGLE_CLIENT_ID ?? "",
  clientSecret: process.env.GOOGLE_CLIENT_SECRET_ID ?? "",
  //todo: based on env, change url to localhost, dev or prod
  callbackURL: "http://localhost:4000/user/login/google/callback",
};
