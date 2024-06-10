export default {
  node_env: import.meta.env.NODE_ENV || "development",
  api_base_url: import.meta.env.VITE_BASE_API_URL,
  jwt_secret: import.meta.env.VITE_JWT_TOKEN_SECRET,
};
