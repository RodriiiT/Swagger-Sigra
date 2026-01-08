import { Router } from "express";
import { SETTINGS } from "../../config/settings.config.mjs";
import { controlRoute } from "../../modules/access-control-I/control.route.mjs";
import { subjectRoute } from "../../modules/academic-structure-II/subjects/subjects.route.mjs";
import { GradesLogRoutes } from "../../modules/grades-record-V/grades/grades.route.mjs";
import { RecordsRoutes } from "../../modules/grades-record-V/records/records.route.mjs";
import { managementRoutes } from "../../modules/academic-structure-II/management/management.route.mjs";
import { prelaciesRoute } from "../../modules/academic-structure-II/prelacies/prelacies.route.mjs";

const router = Router();


export const ListRoutes = {
    auth: {
        control: router.use(`${SETTINGS.BASE_PATH}/auth`, controlRoute)
    },
    academicStructure: {
        management: router.use(`${SETTINGS.BASE_PATH}/management`, managementRoutes),
        subjects: router.use(`${SETTINGS.BASE_PATH}/subjects`, subjectRoute),
        prelacies: router.use(`${SETTINGS.BASE_PATH}/prelacies`, prelaciesRoute)
    },
    grades: {
        grades: router.use(`${SETTINGS.BASE_PATH}/grades-log`, GradesLogRoutes),
        records: router.use(`${SETTINGS.BASE_PATH}/records`, RecordsRoutes)
    }  
}
