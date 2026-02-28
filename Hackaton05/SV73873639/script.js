const DB_SISTEMA = {
    modelos: {
        "Oppo": ["Reno 11 5G", "Reno 11", "Reno 10 Pro+", "A78", "A58", "Find N3 Flip"],
        "Apple": ["iPhone 15 Pro Max", "iPhone 15", "iPhone 14 Pro", "iPhone 13"],
        "Samsung": ["Galaxy S24 Ultra", "Galaxy S23 FE", "Galaxy A54", "Galaxy Z Fold 5"],
        "Xiaomi": ["Redmi Note 13 Pro+", "Xiaomi 14 Ultra", "Poco F5 Pro"],
        "Realme": ["Realme 12 Pro+", "Realme 11 5G", "C67"],
        "Honor": ["Magic 6 Pro", "Honor 90", "Honor X8b"]
    }
};

let ticketActivo = { fase: 0, logs: [], equipo: null };

function validarDigitos(input) { input.value = input.value.replace(/[^0-9]/g, ''); }

function cargarModelos() {
    const marca = document.getElementById('marca').value;
    const select = document.getElementById('modelo');
    select.innerHTML = DB_SISTEMA.modelos[marca].map(m => `<option value="${m}">${m.toUpperCase()}</option>`).join('');
    select.disabled = false;
}

function mostrarAlerta(mensaje) {
    document.getElementById('modal-msg').innerText = mensaje;
    document.getElementById('modal-alert').classList.remove('hidden');
}

function cerrarModal() { document.getElementById('modal-alert').classList.add('hidden'); }

function registrarLog(accion) {
    const hora = new Date().toLocaleTimeString();
    ticketActivo.logs.push({ hora, accion });
    document.getElementById('process-history').innerHTML = ticketActivo.logs.map(l => `
        <div class="timeline-item">
            <span style="color:var(--neon-pink); font-size: 0.7rem; font-weight:800;">${l.hora}</span><br>
            <span style="font-size: 0.95rem;">${l.accion}</span>
        </div>
    `).reverse().join('');
}

document.getElementById('repair-form').onsubmit = function(e) {
    e.preventDefault();
    const imei = document.getElementById('imei').value;
    const serie = document.getElementById('serie').value;

    if (serie.length !== 10 || imei.length !== 15) {
        mostrarAlerta("ERROR DE REGISTRO: El N° de Serie debe ser de 10 dígitos y el IMEI de 15 dígitos numéricos obligatoriamente.");
        return;
    }

    ticketActivo.equipo = {
        marca: document.getElementById('marca').value,
        modelo: document.getElementById('modelo').value,
        imei: imei,
        serie: serie
    };

    registrarLog(`Ingreso de Terminal: ${ticketActivo.equipo.marca} ${ticketActivo.equipo.modelo} registrado con éxito.`);
    document.getElementById('section-ingreso').classList.add('hidden');
    document.getElementById('section-fases').classList.remove('hidden');
    actualizarEstacion();
};

function actualizarEstacion() {
    const area = document.getElementById('fase-dinamica');
    const barra = document.getElementById('main-progress');
    const info = document.getElementById('status-display');
    
    info.innerHTML = `<h3>SISTEMA EN ESTACIÓN: ${ticketActivo.equipo.marca} ${ticketActivo.equipo.modelo}</h3>
                      <p style="opacity:0.6; font-size:0.8rem;">ID SEGUIMIENTO: ${ticketActivo.equipo.imei}</p>`;

    area.innerHTML = "";

    if (ticketActivo.fase === 0) { // REVISIÓN
        barra.style.width = "40%";
        area.innerHTML = `<label>1. REVISIÓN TÉCNICA Y DIAGNÓSTICO:</label>
                          <textarea id="diag-tecnico" placeholder="Describa detalladamente el estado del equipo..."></textarea>`;
    } 
    else if (ticketActivo.fase === 1) { // AUTORIZACIÓN
        barra.style.width = "60%";
        area.innerHTML = `
            <div class="card" style="background:rgba(255,255,255,0.03); border: 1px solid var(--neon-pink);">
                <p style="font-weight:800; margin-bottom:15px;">REQUISITOS DE ACCESO AL SERVICIO:</p>
                <div style="margin-bottom:10px;"><input type="checkbox" id="check-auth" style="width:20px; height:20px;"> Autorización escrita del usuario firmada.</div>
                <div><input type="checkbox" id="check-abono" style="width:20px; height:20px;"> Pago del abono del 50% de la reparación.</div>
            </div>`;
    } 
    else if (ticketActivo.fase === 2) { // TALLER
        barra.style.width = "85%";
        area.innerHTML = `<div style="text-align:center;">
                            <p>TÉCNICOS ASIGNADOS TRABAJANDO EN EL EQUIPO</p>
                            <img src="https://cdn-icons-png.flaticon.com/512/4233/4233839.png" style="width:80px; filter:invert(1); opacity:0.5;">
                          </div>`;
    } 
    else { // ENTREGA
        barra.style.width = "100%";
        barra.classList.add('success'); // BARRA VERDE
        area.innerHTML = `<h2 style="color:var(--neon-green); text-align:center;">✓ DISPOSITIVO LISTO Y ENTREGADO AL CLIENTE</h2>`;
        document.getElementById('btn-next').classList.add('hidden');
    }
}

function siguienteFase() {
    if (ticketActivo.fase === 0) {
        const d = document.getElementById('diag-tecnico').value;
        if (!d) { mostrarAlerta("Debe ingresar y guardar el primer diagnóstico antes de continuar."); return; }
        registrarLog("DIAGNÓSTICO GUARDADO: " + d.toUpperCase());
    } 
    else if (ticketActivo.fase === 1) {
        const c1 = document.getElementById('check-auth').checked;
        const c2 = document.getElementById('check-abono').checked;
        if (!c1 || !c2) {
            mostrarAlerta("ERROR DE ACCESO: Un teléfono primero debe pasar por la revisión, tener la autorización escrita del usuario y el abono del 50% para acceder al servicio.");
            return;
        }
        registrarLog("AUTORIZACIÓN Y ABONO DEL 50% VERIFICADOS.");
    }

    ticketActivo.fase++;
    actualizarEstacion();
}