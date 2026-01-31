import dotenv from "dotenv";
dotenv.config({ path: new URL("../../.env", import.meta.url) });

import { db } from "../db.database.mjs";

/**
 * Script para generar prelaciones automáticas basadas en el sistema de grados
 * 
 * LÓGICA:
 * - Todas las materias de un grado son prerequisitos de TODAS las materias del grado siguiente
 * - Ejemplo: Si el estudiante está en 2do grado, debe haber aprobado TODAS las materias de 1er grado
 * - Si le queda una materia sin aprobar, no puede avanzar (repite el año)
 */

async function generateAutomaticPrelacies() {
    let conn;
    try {
        conn = await db.getConnection();
        await conn.beginTransaction();

        console.log('\n🔄 Iniciando generación automática de prelaciones...\n');

        // Paso 1: Eliminar todas las prelaciones existentes
        const [deleteResult] = await conn.query('DELETE FROM subject_prerequisites');
        console.log(`🗑️  Prelaciones existentes eliminadas: ${deleteResult.affectedRows}`);

        // Paso 2: Obtener todos los grados ordenados por nivel
        const [grades] = await conn.query(`
            SELECT grade_id, grade_name, level_order 
            FROM grades 
            ORDER BY level_order ASC
        `);

        console.log(`📊 Grados encontrados: ${grades.length}\n`);

        let totalPrelaciesCreated = 0;

        // Paso 3: Para cada grado (excepto el primero), crear prelaciones
        for (let i = 1; i < grades.length; i++) {
            const currentGrade = grades[i];
            const previousGrade = grades[i - 1];

            console.log(`📖 Procesando: ${currentGrade.grade_name} (nivel ${currentGrade.level_order})`);
            console.log(`   └─ Prerequisitos: TODAS las materias de ${previousGrade.grade_name}\n`);

            // Obtener materias del grado actual
            const [currentSubjects] = await conn.query(`
                SELECT subject_id, subject_name, code_subject 
                FROM subjects 
                WHERE grade_id = ? AND is_active = 1
                ORDER BY subject_name
            `, [currentGrade.grade_id]);

            // Obtener materias del grado anterior
            const [previousSubjects] = await conn.query(`
                SELECT subject_id, subject_name, code_subject 
                FROM subjects 
                WHERE grade_id = ? AND is_active = 1
                ORDER BY subject_name
            `, [previousGrade.grade_id]);

            if (currentSubjects.length === 0) {
                console.log(`   ⚠️  No hay materias activas en ${currentGrade.grade_name}`);
                continue;
            }

            if (previousSubjects.length === 0) {
                console.log(`   ⚠️  No hay materias en el grado anterior (${previousGrade.grade_name})`);
                continue;
            }

            console.log(`   📚 Materias en ${currentGrade.grade_name}: ${currentSubjects.length}`);
            console.log(`   📚 Materias prerequisito de ${previousGrade.grade_name}: ${previousSubjects.length}`);

            // Para cada materia del grado actual, agregar TODAS las materias del grado anterior como prerequisitos
            let prelaciesForGrade = 0;
            for (const currentSubject of currentSubjects) {
                for (const prerequisiteSubject of previousSubjects) {
                    await conn.query(`
                        INSERT INTO subject_prerequisites (subject_id, subject_prerequisites_id)
                        VALUES (?, ?)
                    `, [currentSubject.subject_id, prerequisiteSubject.subject_id]);

                    prelaciesForGrade++;
                    totalPrelaciesCreated++;
                }
            }

            console.log(`   ✅ Prelaciones creadas para ${currentGrade.grade_name}: ${prelaciesForGrade}\n`);
        }

        await conn.commit();

        console.log('═'.repeat(70));
        console.log(`✅ GENERACIÓN COMPLETADA EXITOSAMENTE`);
        console.log('═'.repeat(70));
        console.log(`\n📊 Resumen:`);
        console.log(`   • Total de prelaciones creadas: ${totalPrelaciesCreated}`);
        console.log(`   • Grados procesados: ${grades.length - 1} (se excluye el primer grado)`);
        console.log(`\n💡 Lógica aplicada:`);
        console.log(`   • Un estudiante debe aprobar TODAS las materias de un grado para avanzar`);
        console.log(`   • Si reprueba una sola materia y no la recupera, repite el año completo\n`);

    } catch (error) {
        if (conn) await conn.rollback();
        console.error('❌ Error al generar prelaciones:', error);
        throw error;
    } finally {
        if (conn) conn.release();
        await db.end();
    }
}

// Ejecutar el script
generateAutomaticPrelacies()
    .then(() => {
        console.log('🎉 Script finalizado correctamente\n');
        process.exit(0);
    })
    .catch((error) => {
        console.error('💥 Error fatal:', error.message);
        process.exit(1);
    });
