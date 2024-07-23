import dotenv from "dotenv"; // Load environment variables from .env file
dotenv.config();
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import { Strategy as MicrosoftStrategy } from "passport-microsoft";
import User from "../models/user.model.js";

// console.log("Config/Setup.js -> ", process.env.GOOGLE_CLIENT_ID);
const isHasSpace = str => /\s/.test(str);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      let user = await User.findOne({
        googleId: profile.id,
      });
      // console.log("Google Profile ",profile)

      if (!user) {
        user = new User({
          googleId: profile.id,
          username: profile?.emails[0]?.value.split('@')[0],
          email: profile?.emails[0]?.value,
        });
        await user.save();
      }
      done(null, user);
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/api/auth/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      let user = await User.findOne({
        githubId: profile.id,
        username: profile?.username,
      });
      // console.log("Github Profile ", profile);
      if (!user) {
        user = new User({
          githubId: profile.id,
          username: profile?.username,
          email: profile?.email,
        });
        await user.save();
      }
      done(null, user);
    }
  )
);

passport.use(
  new MicrosoftStrategy(
    {
      clientID: process.env.MICROSOFT_CLIENT_ID,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
      callbackURL: "/api/auth/microsoft/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      let user = await User.findOne({ microsoftId: profile.id }); 
      // console.log("Microsoft Profile ", profile);

      if (!user) {
        user = new User({
          microsoftId: profile.id,
          username: profile?.mail.split("@")[0],
          email: profile?.mail,
        });
        await user.save();
      }
      done(null, user);
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) =>
  User.findById(id, (err, user) => done(err, user))
);

export default passport;