import passport from 'passport';
import jwt from 'jsonwebtoken';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import env from '../config/env.js'


export default function googleOAuthMiddleware(app) {
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
                // Here, you would typically find or create a user in your database
                // For this example, we'll just return the profile
                console.log(profile,"()))))))))))))))))((((((((((((())))))))");
                return done(null, profile);
            }
        )
    );
}