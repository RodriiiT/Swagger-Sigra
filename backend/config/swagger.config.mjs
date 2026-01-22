/* --- ARCHIVO: config/swagger.config.mjs --- */
import swaggerJsdoc from 'swagger-jsdoc';

// Detectamos la URL del servidor: si existe la variable de entorno la usamos, 
// de lo contrario usamos localhost por defecto.
const serverUrl = process.env.SERVER_URL || 'http://localhost:3000';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SIGRA Academy API',
      version: '1.0.0',
      description: 'Documentación interactiva de la API de Gestión Académica',
    },
    servers: [
      { 
        url: serverUrl, 
        description: 'Servidor de la API' 
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }
      }
    }
  },
  // Importante: asegúrate de que la ruta a los módulos sea correcta
  apis: ['./src/modules/**/*.mjs'], 
};

export const swaggerSpec = swaggerJsdoc(options);