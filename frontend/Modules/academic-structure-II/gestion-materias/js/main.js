import { DATOS_INICIALES } from "./datos.js";
import { asignarMateria, crearEstadoInicial, quitarMateria } from "./estado.js";
import {
	obtenerRefs,
	marcarChipActivo,
	poblarSelectGrados,
	renderizar,
} from "./ui.js";

const estado = crearEstadoInicial(structuredClone(DATOS_INICIALES));
const refs = obtenerRefs();

poblarSelectGrados(refs.selectGrado, estado.datos.grados, estado.gradoId);
marcarChipActivo(refs.contenedorChips, estado.filtroArea);
renderizar(estado, refs);

refs.selectGrado.addEventListener("change", () => {
	estado.gradoId = Number(refs.selectGrado.value);
	renderizar(estado, refs);
});

refs.inputBuscar.addEventListener("input", () => {
	estado.busqueda = refs.inputBuscar.value ?? "";
	renderizar(estado, refs);
});

refs.contenedorChips.addEventListener("click", (e) => {
	const btn = e.target.closest("button[data-filtro]");
	if (!btn) return;

	estado.filtroArea = btn.dataset.filtro;
	marcarChipActivo(refs.contenedorChips, estado.filtroArea);
	renderizar(estado, refs);
});

refs.listaCatalogo.addEventListener("click", (e) => {
	const btn = e.target.closest("button[data-accion='agregar']");
	if (!btn) return;

	const item = e.target.closest(".item[data-id]");
	const id = Number(item?.dataset?.id);
	if (!id) return;

	asignarMateria(estado, id);
	renderizar(estado, refs);
});

refs.listaAsignadas.addEventListener("click", (e) => {
	const btn = e.target.closest("button[data-accion='quitar']");
	if (!btn) return;

	const item = e.target.closest(".item[data-id]");
	const id = Number(item?.dataset?.id);
	if (!id) return;

	quitarMateria(estado, id);
	renderizar(estado, refs);
});

refs.btnCancelar.addEventListener("click", () => {
	refs.inputBuscar.value = "";
	estado.busqueda = "";
	estado.filtroArea = "todas";
	marcarChipActivo(refs.contenedorChips, estado.filtroArea);
	renderizar(estado, refs);
});

refs.btnGuardar.addEventListener("click", () => {
	const clave = String(estado.gradoId);
	const ids = estado.datos.asignacionesPorGrado[clave] ?? [];
	alert(
		`Cambios listos para guardar.\nAño académico seleccionado: ${estado.gradoId}\nMaterias asignadas: ${ids.length}`
	);
});
