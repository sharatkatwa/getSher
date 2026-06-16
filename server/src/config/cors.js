const WILDCARD = "*";

const escapeRegex = (value) => value.replace(/[.+?^${}()|[\]\\]/g, "\\$&");

export const normalizeOrigin = (origin = "") => {
  const trimmedOrigin = origin
    .trim()
    .replace(/^['"]|['"]$/g, "")
    .replace(/\/+$/, "");

  if (!trimmedOrigin) return "";
  if (trimmedOrigin === WILDCARD || trimmedOrigin.includes(WILDCARD)) {
    return trimmedOrigin.toLowerCase();
  }

  try {
    return new URL(trimmedOrigin).origin.toLowerCase();
  } catch {
    return trimmedOrigin.toLowerCase();
  }
};

export const parseCorsOrigins = (corsOrigin = "") =>
  corsOrigin
    .split(",")
    .map(normalizeOrigin)
    .filter(Boolean);

const wildcardMatches = (origin, allowedOrigin) => {
  if (!allowedOrigin.includes(WILDCARD)) return false;

  const pattern = allowedOrigin
    .split(WILDCARD)
    .map(escapeRegex)
    .join(".*");

  return new RegExp(`^${pattern}$`).test(origin);
};

export const isOriginAllowed = (origin, allowedOrigins) => {
  if (!origin) return true;

  const normalizedOrigin = normalizeOrigin(origin);

  return allowedOrigins.some(
    (allowedOrigin) =>
      allowedOrigin === WILDCARD ||
      allowedOrigin === normalizedOrigin ||
      wildcardMatches(normalizedOrigin, allowedOrigin),
  );
};

export const buildCorsOptions = (corsOrigin) => {
  const allowedOrigins = parseCorsOrigins(corsOrigin);

  return {
    origin(origin, callback) {
      callback(null, isOriginAllowed(origin, allowedOrigins));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 204,
  };
};
