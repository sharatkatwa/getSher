import express from 'express'
import env from "../config/env.js";
import helmet from "helmet";
import hpp from "hpp";
import compression from "compression";
import cors from "cors";
import rateLimit from 'express-rate-limit'
import cookieParser from 'cookie-parser'

export default function securityMiddleware(app) {
  const allowedOrigins = env.CORS_ORIGIN.split(",").map((origin) => origin.trim());
  const allowedMethods = ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"];
  const allowedHeaders = ["Content-Type", "Authorization"];
  const corsOptions = {
    origin: allowedOrigins,
    credentials: true,
    methods: allowedMethods,
    allowedHeaders,
    optionsSuccessStatus: 204,
  };

// for allowing cross origin requests.
  app.use((req, res, next) => {
    const origin = req.get("Origin");

    if (origin && allowedOrigins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Vary", "Origin");
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader("Access-Control-Allow-Methods", allowedMethods.join(","));
      res.setHeader("Access-Control-Allow-Headers", allowedHeaders.join(","));
    }

    if (req.method === "OPTIONS") {
      return res.sendStatus(204);
    }

    next();
  });

  app.use(
    cors(corsOptions),
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
