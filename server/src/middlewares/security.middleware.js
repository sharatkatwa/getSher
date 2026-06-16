import express from 'express'
import env from "../config/env.js";
import helmet from "helmet";
import hpp from "hpp";
import compression from "compression";
import cors from "cors";
import rateLimit from 'express-rate-limit'
import cookieParser from 'cookie-parser'
import { buildCorsOptions } from "../config/cors.js";

export default function securityMiddleware(app) {

// for allowing cross origin requests.
  app.use(
    cors(buildCorsOptions(env.CORS_ORIGIN)),
  );
  
  // to get cookies in request
  app.use(cookieParser())
  
  // to limit the no of request from client.
  app.use(rateLimit({
    windowMs: env.RATELIMIT_WINDOWMS,
    limit:env.RATELIMIT,
    legacyHeaders: true,
    message: 'To many request please try after some time!'
  }))
  // protect your api from multiple attacks like xss, csp etc...
  app.use(helmet());
  app.use(hpp());
  app.use(compression());
  
   // Parse JSON requests
  app.use(express.json({ limit: "5mb" }));

  // Parse form-data requests
  app.use(express.urlencoded({ extended: true, limit: "5mb" }));
}
