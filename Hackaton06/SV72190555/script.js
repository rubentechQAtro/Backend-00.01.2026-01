/**
 * HACKATHON 04 - SISTEMA DE REPARACIONES
 * Implementación de Clases, Herencia y WebStorage
 */

// --- 1. CLASES DE NEGOCIO (Basadas en tu script original) ---

class Telefono {
    constructor(numeroSerie, imei, marca, modelo) {
        this.numeroSerie = numeroSerie;
        this.imei = imei;
        this.marca = marca;
        this.modelo = modelo;
        this.reportado = false;
    }

    esValido(listaNegra = []) {
        return !listaNegra.includes(this.imei) && this.imei.length === 15;
    }
}

class Reparacion {
    constructor(telefono, cliente) {
        this.id = "REP-" + Math.floor(Math.random() * 10000);
        this.telefono = telefono;
        this.cliente = cliente;
        this.estado = "INGRESADO";
        this.diagnostico = null;
        this.abono = 0;
        this.costoTotal = 0;
    }
}

// --- 2. GESTOR DE PERSISTENCIA (WebStorage) ---

class DB {
    static guardar(reparaciones) {
        localStorage.setItem('techfix_reparaciones', JSON.stringify(reparaciones));
    }

    static cargar() {
        const data = localStorage.getItem('techfix_reparaciones');
        return data ? JSON.parse(data) : [];
    }
}

// --- 3. LÓGICA DE INTERFAZ Y PUNTO DE ENTRADA ---

// Esta es la función que llama tu index.html
window.ejercicio101 = function() {
    renderMainUI();
};

function renderMainUI() {
    const zona = document.getElementById("zona-ejercicio");
    const reparaciones = DB.cargar();

    zona.innerHTML = `
        <h3>🛠️ Panel de Control TechFix</h3>
        <div class="botones">
            <button onclick="uiNuevoIngreso()">Ingresar Equipo</button>
            <button onclick="uiListarReparaciones()">Ver Historial</button>
            <button onclick="uiResetDB()" class="btn-cerrar">Borrar Datos</button>
        </div>
        <div id="display-area" style="margin-top:20px;"></div>
    `;
}

async function uiNuevoIngreso() {
    const { value: formValues } = await Swal.fire({
        title: 'Registro de Ingreso',
        html:
            '<input id="sw-imei" class="swal2-input" placeholder="IMEI (15 dígitos)">' +
            '<input id="sw-serie" class="swal2-input" placeholder="Nro Serie">' +
            '<input id="sw-marca" class="swal2-input" placeholder="Marca (Samsung, Apple...)">' +
            '<input id="sw-cliente" class="swal2-input" placeholder="Nombre Cliente">',
        focusConfirm: false,
        preConfirm: () => {
            return {
                imei: document.getElementById('sw-imei').value,
                serie: document.getElementById('sw-serie').value,
                marca: document.getElementById('sw-marca').value,
                cliente: document.getElementById('sw-cliente').value
            }
        }
    });

    if (formValues) {
        // Validación de IMEI (Requisito del Reto 1)
        if (formValues.imei.length !== 15) {
            Swal.fire('Error', 'El IMEI debe tener 15 dígitos', 'error');
            return;
        }

        const nuevoTel = new Telefono(formValues.serie, formValues.imei, formValues.marca, "Modelo Genérico");
        const nuevaRep = new Reparacion(nuevoTel, formValues.cliente);

        const lista = DB.cargar();
        lista.push(nuevaRep);
        DB.guardar(lista);

        Swal.fire('Éxito', 'Equipo registrado en el sistema y guardado en LocalStorage', 'success');
        uiListarReparaciones();
    }
}

function uiListarReparaciones() {
    const area = document.getElementById("display-area");
    const lista = DB.cargar();

    if (lista.length === 0) {
        area.innerHTML = `<div class="resultado error">No hay reparaciones registradas.</div>`;
        return;
    }

    let html = `<h4>Listado de Equipos:</h4>`;
    lista.forEach((rep, index) => {
        html += `
            <div class="resultado ok" style="margin-bottom:10px; font-size:0.9rem;">
                <strong>ID:</strong> ${rep.id} | 
                <strong>Cliente:</strong> ${rep.cliente} <br>
                <strong>Equipo:</strong> ${rep.telefono.marca} (IMEI: ${rep.telefono.imei}) <br>
                <strong>Estado:</strong> <span style="color:#004a7c">${rep.estado}</span>
            </div>
        `;
    });
    area.innerHTML = html;
}

function uiResetDB() {
    localStorage.removeItem('techfix_reparaciones');
    renderMainUI();
    Swal.fire('Limpio', 'WebStorage vaciado correctamente', 'info');
}