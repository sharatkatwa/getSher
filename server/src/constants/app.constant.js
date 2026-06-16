import env from '../config/env.js'
export default {
  PORT: 3000,
  MONGO_URI: "mongodb://localhost:27017/cricbuzz",
  LOGGER_LEVEL: "info",
  NODE_ENV: "development",
  RATELIMIT_WINDOWMS: 15 * 60 * 1000,
  RATELIMIT: 100,
  GOOGLE_CALLBACK_URL: 'http://localhost:3000/api/auth/google/callback',
  REDIRECT_URL: 'http://localhost:5173'
};

export const app_config = {
  jwt:{
    accessToken:{expiresIn:'1H'},
    refreshToken:{expiresIn:'30D'}
  },
  cookie: {
    accessToken: {
      httpOnly: false,
      secure: false,
      maxAge:  60 * 60 * 1000 
    },
    refreshToken: {
      httpOnly: true,
      secure: false,
      maxAge: 30 * 24 * 60 * 60 * 1000
    }
  }
}