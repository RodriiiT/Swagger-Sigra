import dotenv from "dotenv";
dotenv.config({ path: new URL("../../.env", import.meta.url) });

import { db } from "../db.database.mjs";
import { 
    usersMock, 
    roleMock, 
    academicYearsMock,
    gradesMock,
    sectionsMock,
    subjectsMock,
} from "../../src/mocks/index.mjs";
import { getSeedFunctionByTable } from "../../src/core/utils/function.util.mjs";

export const seedDatabase = async () => {
    let conn;
    try{
        conn = await db.getConnection();
        await conn.beginTransaction();

        await getSeedFunctionByTable('roles', roleMock);
        console.log('Datos de roles insertados correctamente');

        await getSeedFunctionByTable('users', usersMock);
        console.log('Datos de usuarios insertados correctamente');

        await getSeedFunctionByTable('academic_years', academicYearsMock);
        console.log('Datos de años académicos insertados correctamente');

        await getSeedFunctionByTable('grades', gradesMock);
        console.log('Datos de grados insertados correctamente');

        await getSeedFunctionByTable('sections', sectionsMock);
        console.log('Datos de secciones insertados correctamente');

        await getSeedFunctionByTable('subjects', subjectsMock);
        console.log('Datos de materias insertados correctamente');

        await conn.commit();
        console.log("Semilla académica insertada correctamente");
    } 
    catch (error) {
        if (conn) await conn.rollback();
        console.error('Error al insertar los datos de prueba:', error);
        throw error;
    } finally {
        if (conn) conn.release();
        await db.end();
    }
}

seedDatabase()