import express,{json} from "express";
import cors from "cors";
import morgan from "morgan";
import swaggerUi from 'swagger-ui-express';
import { SETTINGS } from "./config/settings.config.mjs";
import { swaggerSpec } from "./config/swagger.config.mjs"; 
import { registerRoutes } from "./src/core/utils/function.util.mjs";
import { ListRoutes } from "./src/api/routes/api.routes.mjs";
import { activityNotifierMiddleware } from "./src/api/middlewares/email.middleware.mjs";



// Se inicializan el servidor express
const app = express();

app.use(cors({
    origin: '*', // Esto permite que tu URL de Vercel se conecte sin problemas
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(json());
app.use(morgan("dev"));
app.use(activityNotifierMiddleware);

app.use('/uploads', express.static('uploads'));
app.use('/uploads/resources', express.static('uploads/resources'));
app.use('/uploads/submissions', express.static('uploads/submissions'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Registro de rutas
registerRoutes(app, ListRoutes);

// Servidor escuchando en el puerto configurado
app.listen(SETTINGS.PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${SETTINGS.PORT}`);
    console.log(`Documentación disponible en http://localhost:${SETTINGS.PORT}/api-docs`);
});

