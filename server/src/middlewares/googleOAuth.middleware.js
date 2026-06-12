import passport from 'passport';
import jwt from 'jsonwebtoken';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';


export default function googleOAuthMiddleware(app) {
    app.use(passport.initialize());

    // Configure Passport to use Google OAuth 2.0 strategy
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: '/auth/google/callback',
            },
            (accessToken, refreshToken, profile, done) => {
                // Here, you would typically find or create a user in your database
                // For this example, we'll just return the profile
                return done(null, profile);
            }
        )
    );
}