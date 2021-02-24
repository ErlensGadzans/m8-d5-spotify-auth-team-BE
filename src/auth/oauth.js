const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
UserSchema = require("../users/schema");
const { authenticate } = require("../auth/index");

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRECT,
      callbackURL: process.env.REDIRECT_URL,
    },
    async function (accessToken, refreshToken, profile, done) {
      // console.log(profile);

      try {
        const user = await UserSchema.findOne({ googleId: profile.id });

        if (!user) {
          const newUser = new UserSchema({
            googleId: profile.id,
            name: profile.name.givenName,
            img: profile.photos.value,
            email: profile.emails[0].value,
          });
          const savedUser = await newUser.save();
          const accessToken = await authenticate(savedUser);
          done(null, { newUser, accessToken }); //NULL NOT ERROR SITUATION
        } else {
          //IF GOOGLE USER EXISTS JUST GENERATE TOKENS FOR HIM
          const accessToken = await authenticate(user);
          done(null, { user, accessToken });
        }
      } catch (error) {
        console.log(error);
        // next(error);
      }
    }
  )
);
//GETTING AUTHOR FROM PROVIDER & CONVERTED INTO A JSON
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(user, null);
});
