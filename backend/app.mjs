import express,{json} from "express";
import cors from "cors";
import morgan from "morgan";
import swaggerUi from 'swagger-ui-express';
import { SETTINGS } from "./config/settings.config.mjs";
import { swaggerSpec } from "./config/swagger.config.mjs"; 
import { registerRoutes } from "./src/core/utils/function.util.mjs";
import { ListRoutes } from "./src/api/routes/api.routes.mjs";
import { activityNotifierMiddleware } from "./src/api/middlewares/email.middleware.mjs";

const app = express();

app.use(cors({ origin: '*' })); // Permitir todo para pruebas
app.use(json());
app.use(morgan("dev"));
app.use(activityNotifierMiddleware);

app.use('/uploads', express.static('uploads'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

registerRoutes(app, ListRoutes);

app.listen(SETTINGS.PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${SETTINGS.PORT}`);
    console.log(`Documentación disponible en http://localhost:${SETTINGS.PORT}/api-docs`);
});