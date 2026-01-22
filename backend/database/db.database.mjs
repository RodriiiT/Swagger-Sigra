/* --- ARCHIVO: database/db.database.mjs --- */
import mysql from 'mysql2/promise'; // Cambiamos la forma de importar
import { SETTINGS } from '../config/settings.config.mjs';

// Usar createPool es obligatorio para bases de datos en la nube para evitar cierres de conexión
export const db = mysql.createPool({
    host: SETTINGS.DB_HOST,
    user: SETTINGS.DB_USER,
    password: SETTINGS.DB_PASSWORD,
    database: SETTINGS.DB_NAME,
    port: SETTINGS.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    decimalNumbers: true,
    // CONFIGURACIÓN DE SSL (Obligatorio para Aiven)
    ssl: {
        rejectUnauthorized: false 
    }
});

// Prueba de conexión inicial
try {
    const connection = await db.getConnection();
    console.log("✅ Conexión a la base de datos Aiven exitosa");
    connection.release();
} catch (error) {
    console.error("❌ Error conectando a Aiven:", error.message);
}