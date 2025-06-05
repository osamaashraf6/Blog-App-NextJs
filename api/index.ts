import dotenv from "dotenv";
dotenv.config();

import { app } from "./config";
import mountRoutes from "./routes";

mountRoutes(app);

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
  });
}
export default app;
