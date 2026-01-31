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
    decimalNumbers: true
    // CONFIGURACIÓN DE SSL (Solo para Aiven - Comentado para MySQL local)
    // ssl: {
    //     rejectUnauthorized: false 
    // }
});

// Prueba de conexión inicial y auto-migraciones
try {
    const connection = await db.getConnection();
    console.log("✅ Conexión a la base de datos MySQL local exitosa");

    // Auto-migración: Verificar si existe la columna is_active en la tabla sections
    try {
        const [columns] = await connection.query('SHOW COLUMNS FROM sections LIKE "is_active"');
        if (columns.length === 0) {
            console.log("🛠️  Estructura desactualizada: Añadiendo columna 'is_active' a la tabla 'sections'...");
            await connection.query('ALTER TABLE sections ADD COLUMN is_active TINYINT DEFAULT 1');
            console.log("✅ Columna 'is_active' añadida exitosamente");
        }
    } catch (migError) {
        console.error("⚠️ Error durante la migración automática:", migError.message);
    }

    connection.release();
} catch (error) {
    console.error("❌ Error conectando a MySQL local:", error.message);
}
