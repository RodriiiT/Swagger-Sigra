const BASE_API = 'https://sigra.irissoftware.lat/api';
const storedUser = JSON.parse(localStorage.getItem('sigra_user') || 'null');
const STUDENT_ID = storedUser?.id || storedUser?.user_id;
const TOKEN = localStorage.getItem('sigra_token');

document.addEventListener('DOMContentLoaded', () => {
    if (!STUDENT_ID) {
        showError('No se pudo identificar al estudiante.');
        return;
    }
    document.getElementById('studentName').textContent = 
        `${storedUser.first_name || ''} ${storedUser.last_name || ''}`.trim() || "Estudiante";
    document.getElementById('studentId').textContent = `ID: ${STUDENT_ID}`;

    loadReportData();
});

async function loadReportData() {
    const listContainer = document.getElementById('subjectsList');
    try {
        const response = await fetch(`${BASE_API}/manager/student/${STUDENT_ID}/summary`, {
            headers: { 'Authorization': `Bearer ${TOKEN}`, 'Content-Type': 'application/json' }
        });

        if (!response.ok) throw new Error("Error al obtener el resumen");
        const json = await response.json();
        const courses = json.academic_load || [];

        if (courses.length === 0) {
            listContainer.innerHTML = '<p style="text-align:center; padding:40px;">No hay datos disponibles.</p>';
            return;
        }
        renderSubjects(courses);
    } catch (error) {
        showError("Error de conexión con el servidor.");
    }
}

function renderSubjects(courses) {
    const listContainer = document.getElementById('subjectsList');
    listContainer.innerHTML = '';
    
    let grandTotalAccumulatedPoints = 0; // Suma de todos los puntos de todas las materias
    const totalSubjectsCount = courses.length; // Cantidad total de materias (ej: 9)

    courses.forEach(course => {
        const grades = course.grades || [];
        let finalGradeOfSubject = 0; // Puntos acumulados en ESTA materia
        let evaluatedWeight = 0;

        const actHtml = grades.map(g => {
            const weight = Number(g.weight_percentage || 0);
            const score = Number(g.score || 0);
            const contribution = (score * weight) / 100;
            
            finalGradeOfSubject += contribution;
            evaluatedWeight += weight;

            return `
                <div class="activity-item">
                    <div class="act-info">
                        <span class="act-title">${g.title || 'Actividad'}</span>
                        <span class="act-meta">Valor: ${weight}%</span>
                    </div>
                    <div class="act-values">
                        <span class="act-score">${score.toFixed(1)}</span>
                        <span class="act-contrib">+${contribution.toFixed(1)} pts</span>
                    </div>
                </div>
            `;
        }).join('');

        // Sumamos los puntos de esta materia al gran total para el promedio final
        grandTotalAccumulatedPoints += finalGradeOfSubject;

        const article = document.createElement('article');
        article.className = 'subject-card';
        article.innerHTML = `
            <div class="subject-left">
                <h3 class="subject-name">${course.subject_name}</h3>
                <div class="subject-meta">Docente: ${course.teacher_name}</div>
                <div class="grade-meta">Evaluado: ${evaluatedWeight}% del curso</div>
                <div class="activities-list">${actHtml || '<span class="empty-msg">Sin actividades calificadas</span>'}</div>
            </div>
            <div class="subject-right">
                <div class="grade-number">${finalGradeOfSubject.toFixed(1)}</div>
                <div class="grade-percent">Puntos acumulados</div>
            </div>
        `;
        listContainer.appendChild(article);
    });

    // CÁLCULO SOLICITADO:
    // Promedio Final = (Suma de puntos acumulados de cada materia) / (Número total de materias)
    const finalAverageScore = grandTotalAccumulatedPoints / totalSubjectsCount;

    // Actualizar el resumen superior
    const avgEl = document.getElementById('finalAverage');
    const statusEl = document.getElementById('finalStatus');

    if (avgEl) avgEl.textContent = finalAverageScore.toFixed(2); // Muestra ej: 0.49 o 12.50
    
    // Ocultamos el texto de estado (Aprobado/Reprobado) como solicitaste
    if (statusEl) {
        statusEl.style.display = 'none';
    }
}

function showError(msg) {
    document.getElementById('subjectsList').innerHTML = `<p class="error-msg">${msg}</p>`;
}