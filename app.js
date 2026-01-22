document.addEventListener("DOMContentLoaded", () => {

    /* ===============================
       PANTALLAS
    ================================ */

    const pantallaInicial = document.getElementById("pantalla-inicial");
    const web = document.getElementById("web");
    const tabla = document.getElementById("tabla");

    const btnWeb = document.getElementById("btn-web");
    const btnTabla = document.getElementById("btn-tabla");
    const btnVolverTabla = document.getElementById("volver");
    const btnVolverWeb = document.getElementById("volver-inicio");

    if (btnWeb) {
        btnWeb.onclick = () => {
            pantallaInicial.style.display = "none";
            web.style.display = "block";
            tabla.style.display = "none";
        };
    }

    if (btnTabla) {
        btnTabla.onclick = () => {
            pantallaInicial.style.display = "none";
            web.style.display = "none";
            tabla.style.display = "block";
        };
    }

    if (btnVolverTabla) {
        btnVolverTabla.onclick = () => {
            tabla.style.display = "none";
            pantallaInicial.style.display = "block";
        };
    }

    if (btnVolverWeb) {
        btnVolverWeb.onclick = () => {
            web.style.display = "none";
            pantallaInicial.style.display = "block";
        };
    }

    /* ===============================
       GESTOR DE TAREAS
    ================================ */

    const inputTarea = document.getElementById("inputTarea");
    const listaTareas = document.getElementById("listaTareas");
    const btnAgregar = document.getElementById("agregarTarea");

    let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

    function guardarTareas() {
        localStorage.setItem("tareas", JSON.stringify(tareas));
    }

    function renderizarTareas() {
        listaTareas.innerHTML = "";

        tareas.forEach((tarea, index) => {
            const li = document.createElement("li");
            li.textContent = tarea.texto;

            if (tarea.completada) {
                li.style.textDecoration = "line-through";
                li.style.opacity = "0.6";
            }

            // BOTÓN TERMINAR
            const btnTerminar = document.createElement("button");
            btnTerminar.textContent = "✔";
            btnTerminar.onclick = () => {
                tarea.completada = true;
                guardarTareas();
                renderizarTareas();
            };

            // BOTÓN EDITAR
            const btnEditar = document.createElement("button");
            btnEditar.textContent = "✏";
            btnEditar.onclick = () => {
                if (tarea.completada) return;

                const nuevoTexto = prompt("Editar tarea:", tarea.texto);
                if (nuevoTexto) {
                    tarea.texto = nuevoTexto;
                    guardarTareas();
                    renderizarTareas();
                }
            };

            // BOTÓN ELIMINAR
            const btnEliminar = document.createElement("button");
            btnEliminar.textContent = "🗑";
            btnEliminar.onclick = () => {
                tareas.splice(index, 1);
                guardarTareas();
                renderizarTareas();
            };

            li.appendChild(btnTerminar);
            li.appendChild(btnEditar);
            li.appendChild(btnEliminar);
            listaTareas.appendChild(li);
        });
    }

    if (btnAgregar) {
        btnAgregar.onclick = () => {
            if (inputTarea.value.trim() === "") return;

            tareas.push({
                texto: inputTarea.value,
                completada: false
            });

            inputTarea.value = "";
            guardarTareas();
            renderizarTareas();
        };
    }

    renderizarTareas();

    /* ===============================
       MENÚ RESPONSIVE
    ================================ */

    const menuToggle = document.querySelector(".menu-toggle");
    const navbar = document.querySelector(".navbar");

    if (menuToggle) {
        menuToggle.onclick = () => {
            navbar.classList.toggle("active");
        };
    }

});
