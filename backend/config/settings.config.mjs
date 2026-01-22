/* --- ARCHIVO: config/settings.config.mjs --- */
import { config } from "dotenv";
config();

export const SETTINGS = {
    PORT: process.env.PORT || 3000,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    DB_PORT: parseInt(process.env.DB_PORT) || 3306, // Convertir a número
    BASE_PATH: "/api"
};