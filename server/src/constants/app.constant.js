export default {
  PORT: 3000,
  MONGO_URI: "mongodb://localhost:27017",
  LOGGER_LEVEL: "info",
  NODE_ENV: "development",
  RATELIMIT_WINDOWMS: 15 * 60 * 1000,
  RATELIMIT: 100
};


export const app_config = {
  jwt:{
    accessToken:{expiresIn:'1H'},
    refreshToken:{expiresIn:'30D'}
  },
  cookie: {
    accessToken: {
      ttpOnly: false,
      secure: false,
      maxAge: 60 * 60 * 1000
    },
    refreshToken: {
      ttpOnly: true,
      secure: false,
      maxAge: 60 * 60 * 1000
    }
  }
}