import passport from 'passport';
import jwt from 'jsonwebtoken';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import env from '../config/env.js'


export default function googleOAuthMiddleware(app) {
    console.log("ENV CALLBACK:", env.GOOGLE_CALLBACK_URL);
    app.use(passport.initialize());

    // Configure Passport to use Google OAuth 2.0 strategy
    passport.use(
        new GoogleStrategy(
            {
                clientID: env.GOOGLE_CLIENT_ID,
                clientSecret: env.GOOGLE_CLIENT_SECRET,
                callbackURL: env.GOOGLE_CALLBACK_URL,
            },
            (accessToken, refreshToken, profile, done) => {
                // console.log(profile)
                return done(null, profile);
            }
        )
    );
}
