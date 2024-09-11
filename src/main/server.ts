import { app } from "./config/app.js";
import { env } from "./config/env.js";

app
  .listen({
    host: "0.0.0.0",
    port: env.PORT,
  })
  .then(() => {
    console.log("🚀 HTTP Server Running!");
  });
