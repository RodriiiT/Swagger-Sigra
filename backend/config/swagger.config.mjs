/* --- ARCHIVO: config/swagger.config.mjs --- */
import swaggerJsdoc from 'swagger-jsdoc';

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
        // Agregamos una variable de entorno para la URL de producción
        url: process.env.SERVER_URL || 'http://localhost:3000', 
        description: 'Servidor Actual' 
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }
      }
    }
  },
  apis: ['./src/modules/**/*.mjs'], 
};

export const swaggerSpec = swaggerJsdoc(options);