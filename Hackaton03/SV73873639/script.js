/* ============================================================
   CONFIGURACIÓN DE IMÁGENES
   ============================================================ */
const IMG_PRINCIPAL = "./Images/Neuvillete Iocn.webp"; 
const IMG_EXITO = "./Images/Good Kaveh.webp"; 
const IMG_FALLO = "./Images/Exercise Wrong.webp"; 

/* --- MOTOR DE VALIDACIÓN Y REINTENTO --- */

/**
 * Función centralizada para pedir datos con validación estricta y reintentos.
 * @param {string} titulo - Título de la pregunta
 * @param {boolean} permitirNegativo - Si acepta números menores a 0
 * @param {boolean} esSoloLetra - Para validar caracteres únicos (vocales)
 * @param {boolean} permiteDecimal - Si acepta puntos decimales
 * @param {number} min - Valor mínimo permitido (opcional)
 * @param {number} max - Valor máximo permitido (opcional)
 */
async function pedirDato(titulo, permitirNegativo = true, esSoloLetra = false, permiteDecimal = false, min = null, max = null) {
    let valido = false;
    let respuesta;

    while (!valido) {
        const { value: res } = await Swal.fire({
            title: `Hola, ${titulo}`,
            imageUrl: IMG_PRINCIPAL,
            imageWidth: 90, imageHeight: 90,
            input: 'text',
            inputPlaceholder: esSoloLetra ? "Escribe una letra..." : "Solo números...",
            confirmButtonText: 'Enviar',
            showCancelButton: true,
            customClass: { popup: 'bot-popup animate__animated animate__fadeInDown' },
            confirmButtonColor: '#4f46e5'
        });

        if (res === undefined) return null; 
        respuesta = res.trim();

        if (esSoloLetra) {
            // Valida que sea solo una letra y nada de símbolos/números
            if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]$/.test(respuesta)) {
                await Swal.fire({ title: "Letra Inválida", text: "Solo se permite una letra, sin símbolos ni números.", icon: "warning" });
                continue;
            }
        } else {
            // Regex: Bloquea símbolos !"#$%&/()=? y letras
            const patron = permiteDecimal ? /^-?\d+(\.\d+)?$/ : /^-?\d+$/;
            
            if (!patron.test(respuesta)) {
                await Swal.fire({
                    title: "Formato Incorrecto",
                    html: `El valor "<b>${respuesta}</b>" no es válido.<br><b>Prohibido:</b> símbolos (#$%&), letras o espacios.`,
                    icon: "warning"
                });
                continue;
            }

            let num = Number(respuesta);

            if (!permitirNegativo && num < 0) {
                await Swal.fire({ title: "Sin Negativos", text: "Este ejercicio no admite números menores a cero.", icon: "error" });
                continue;
            }

            // Validación de Rango (Indispensable para Ej 8, Ej 16, Ej 19, etc.)
            if (min !== null && num < min) {
                await Swal.fire({ title: "Valor muy bajo", text: `El mínimo permitido es ${min}.`, icon: "error" });
                continue;
            }
            if (max !== null && num > max) {
                await Swal.fire({ title: "Valor muy alto", text: `El máximo permitido es ${max}.`, icon: "error" });
                continue;
            }
        }
        valido = true;
    }
    return respuesta;
}

function botRespuesta(mensaje, esExito = true) {
    Swal.fire({
        title: esExito ? "¡Resultado listo!" : "Atención",
        html: mensaje,
        imageUrl: esExito ? IMG_EXITO : IMG_FALLO,
        imageWidth: 90, imageHeight: 90,
        confirmButtonText: 'Entendido',
        customClass: { popup: 'bot-popup animate__animated animate__zoomIn' }
    });
}

/* ============================================================
   EJERCICIOS COMPLETOS (01 - 40)
   ============================================================ */

async function ej01() {
    let n = await pedirDato("Número de 3 dígitos:");
    if (!n) return;
    let r = (Math.abs(Number(n)) > 99 && Math.abs(Number(n)) < 1000);
    botRespuesta(`Tu número <b>${n}</b> ${r?'sí':'no'} tiene 3 dígitos.`);
}

async function ej02() {
    let n = await pedirDato("Dime un número:");
    if (!n) return;
    botRespuesta(`El <b>${n}</b> es ${Number(n)<0?'Negativo':'Positivo'}.`);
}

async function ej03() {
    let n = await pedirDato("¿Termina en 4?");
    if (!n) return;
    botRespuesta(`El número <b>${n}</b> ${n.endsWith('4')?'termina':'no termina'} en 4.`);
}

async function ej04() {
    let a=await pedirDato("N1"), b=await pedirDato("N2"), c=await pedirDato("N3");
    if (!a || !b || !c) return;
    let arr = [Number(a), Number(b), Number(c)].sort((x,y)=>x-y);
    botRespuesta(`Tus datos <b>${a}, ${b}, ${c}</b> ordenados: ${arr.join(' < ')}.`);
}

async function ej05() {
    let q = await pedirDato("¿Pares de zapatos?", false);
    if (!q) return;
    let n=Number(q), d=n>30?0.4:n>20?0.2:n>10?0.1:0;
    botRespuesta(`Por <b>${n}</b> pares: $${(n*80)*(1-d)}.`);
}

async function ej06() {
    let h = await pedirDato("Horas trabajadas:", false);
    if (!h) return;
    let t=Number(h), e=Math.max(0,t-40);
    botRespuesta(`Pago por <b>${h}</b> horas: $${(Math.min(40,t)*20)+(e*25)}.`);
}

async function ej07() {
    const {value: t} = await Swal.fire({title:'Membresía', input:'select', inputOptions:{'A':'A','B':'B','C':'C','N':'N'}});
    let m = await pedirDato("Monto:", false);
    if (!m) return;
    let d=t=='A'?0.1:t=='B'?0.15:t=='C'?0.2:0;
    botRespuesta(`Compra de <b>$${m}</b> con tipo ${t}: $${m-(m*d)}.`);
}

async function ej08() {
    // Configurado: Sin negativos, permite decimales, min 0, max 20
    let n1 = await pedirDato("Nota 1 (0-20):", false, false, true, 0, 20);
    if (!n1) return;
    let n2 = await pedirDato("Nota 2 (0-20):", false, false, true, 0, 20);
    if (!n2) return;
    let n3 = await pedirDato("Nota 3 (0-20):", false, false, true, 0, 20);
    if (!n3) return;

    let promedio = (Number(n1) + Number(n2) + Number(n3)) / 3;
    let esAprobado = promedio >= 10.5;

    botRespuesta(`
        Tus notas ingresadas: <b>${n1}, ${n2}, ${n3}</b>.<br><br>
        <b>Promedio Final:</b> ${promedio.toFixed(2)}<br>
        <b>Estado:</b> ${esAprobado ? '<span style="color:green">Aprobado</span>' : '<span style="color:red">Desaprobado</span>'}<br><br>
        <i>Explicación:</i> Sumamos tus tres notas de la escala 0-20 y las dividimos entre 3.
    `, esAprobado);
}

async function ej09() {
    // Configuramos: permite decimales (dinero), no permite negativos ni símbolos
    let s = await pedirDato("Sueldo actual para calcular aumento:", false, false, true); 
    if (!s) return;

    let sueldoOriginal = Number(s);
    let porcentaje, aumento;

    // Lógica: Si gana más de 2000 el aumento es menor, si gana menos es mayor
    if (sueldoOriginal > 2000) {
        porcentaje = 0.05; // 5%
    } else {
        porcentaje = 0.10; // 10%
    }

    aumento = sueldoOriginal * porcentaje;
    let sueldoTotal = sueldoOriginal + aumento;

    botRespuesta(`
        <b>¡Cálculo de Sueldo Finalizado!</b><br><br>
        • Tu sueldo base era: <b>$${sueldoOriginal.toFixed(2)}</b><br>
        • Porcentaje aplicado: <b>${porcentaje * 100}%</b><br>
        • Dinero extra: <b>$${aumento.toFixed(2)}</b><br><hr>
        • <b>Nuevo Sueldo: $${sueldoTotal.toFixed(2)}</b><br><br>
        
        <b>Explicación:</b> Basado en el dato <b>$${s}</b> que ingresaste, el sistema aplicó un ${porcentaje * 100}% de aumento. 
        Recuerda que si el sueldo es mayor a $2000 el bono es del 5%, de lo contrario es del 10%.
    `);
}
/* ============================================================
   BLOQUE: EJERCICIOS 10 AL 40 (CON EXPLICACIONES Y VALIDACIÓN)
   ============================================================ */

async function ej10() {
    let n = await pedirDato("¿Par o Impar?");
    if (!n) return;
    let esPar = Number(n) % 2 === 0;
    botRespuesta(`
        El número <b>${n}</b> es <b>${esPar ? 'PAR' : 'IMPAR'}</b>.<br><br>
        <b>Explicación:</b> Dividimos tu número <b>${n}</b> entre 2. Como el residuo fue ${Math.abs(Number(n) % 2)}, el sistema determina automáticamente su tipo.
    `);
}

async function ej11() {
    let a = await pedirDato("Primer número:"), b = await pedirDato("Segundo:"), c = await pedirDato("Tercero:");
    if (!a || !b || !c) return;
    let mayor = Math.max(Number(a), Number(b), Number(c));
    botRespuesta(`
        Entre <b>${a}, ${b} y ${c}</b>, el mayor es <b>${mayor}</b>.<br><br>
        <b>Explicación:</b> Comparamos los tres valores que ingresaste y el asistente seleccionó el de mayor magnitud numérica.
    `);
}

async function ej12() {
    let a = await pedirDato("Número A:"), b = await pedirDato("Número B:");
    if (!a || !b) return;
    let mayor = Math.max(Number(a), Number(b));
    botRespuesta(`
        El mayor entre <b>${a}</b> y <b>${b}</b> es <b>${mayor}</b>.<br><br>
        <b>Explicación:</b> Se realizó una comparación binaria simple para determinar cuál de tus dos datos está más lejos del cero en la recta numérica.
    `);
}

async function ej13() {
    let l = await pedirDato("Ingresa una sola letra:", true, true);
    if (!l) return;
    let esVocal = /^[aeiouáéíóú]$/i.test(l);
    botRespuesta(`
        La letra <b>"${l}"</b> ${esVocal ? 'es una <b>VOCAL</b>' : 'es una <b>CONSONANTE</b>'}.<br><br>
        <b>Explicación:</b> El sistema revisó si tu carácter <b>${l}</b> coincidía con el conjunto estándar de vocales (a, e, i, o, u).
    `);
}

async function ej14() {
    let n = await pedirDato("Número del 1 al 10:", false);
    if (!n) return;
    let primos = [2, 3, 5, 7];
    let esPrimo = primos.includes(Number(n));
    botRespuesta(`
        El número <b>${n}</b> ${esPrimo ? 'es <b>PRIMO</b>' : '<b>NO ES PRIMO</b>'}.<br><br>
        <b>Explicación:</b> En el rango del 1 al 10, solo los números que solo se dividen por sí mismos y por 1 son primos. Tu número <b>${n}</b> fue verificado en esa lista.
    `);
}

async function ej15() {
    let cm = await pedirDato("Centímetros a Pulgadas:", false, false, true);
    let lb = await pedirDato("Libras a Kilos:", false, false, true);
    if (!cm || !lb) return;
    botRespuesta(`
        • <b>${cm} cm</b> equivalen a <b>${(cm / 2.54).toFixed(2)} pulg</b>.<br>
        • <b>${lb} lb</b> equivalen a <b>${(lb / 2.204).toFixed(2)} kg</b>.<br><br>
        <b>Explicación:</b> Usamos factores de conversión internacionales para transformar tus medidas de <b>${cm}</b> y <b>${lb}</b> al sistema inglés y métrico.
    `);
}

async function ej16() {
    let n = await pedirDato("Número del día (1-7):", false);
    if (!n) return;
    let dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
    let dia = dias[Number(n) - 1] || "inválido";
    botRespuesta(`
        El número <b>${n}</b> representa el día <b>${dia}</b>.<br><br>
        <b>Explicación:</b> Mapeamos tu número <b>${n}</b> con la posición correspondiente en la semana laboral estándar.
    `);
}

async function ej17() {
    let h = await pedirDato("Hora (0-23):", false), m = await pedirDato("Minuto (0-59):", false), s = await pedirDato("Segundo (0-59):", false);
    if (h === null || m === null || s === null) return;
    let hh = Number(h), mm = Number(m), ss = Number(s);
    ss++;
    if (ss === 60) { ss = 0; mm++; }
    if (mm === 60) { mm = 0; hh++; }
    if (hh === 24) hh = 0;
    botRespuesta(`
        La hora un segundo después de <b>${h}:${m}:${s}</b> es <b>${hh}:${mm}:${ss}</b>.<br><br>
        <b>Explicación:</b> Incrementamos el tiempo y gestionamos los "acarreados" (cuando los segundos o minutos llegan a 60).
    `);
}

async function ej18() {
    let n = await pedirDato("¿Cuántos CDs llevarás?", false);
    if (!n) return;
    let c = Number(n), p = c <= 9 ? 10 : c <= 99 ? 8 : c <= 499 ? 7 : 6;
    botRespuesta(`
        Total por <b>${c} CDs</b>: <b>$${c * p}</b>.<br><br>
        <b>Explicación:</b> Según tu cantidad de <b>${n}</b>, el precio unitario bajó a $${p}. A más compra, mayor descuento.
    `);
}

/* --- EJERCICIO 19: HELADERÍA (CORREGIDO) --- */
async function ej19() {
    let id = await pedirDato("ID Empleado (1:Cajero, 2:Servidor, 3:Mezclas, 4:Mantenimiento):", false, false, false, 1, 4);
    if (!id) return;

    let d = await pedirDato("Días trabajados (Máximo 6):", false, false, false, 1, 6);
    if (!d) return;

    let tarifas = { 1: {t:56, n:"Cajero"}, 2: {t:64, n:"Servidor"}, 3: {t:80, n:"Prep. Mezclas"}, 4: {t:48, n:"Mantenimiento"} };
    let info = tarifas[Number(id)];
    let pago = info.t * Number(d);

    botRespuesta(`
        <b>Pago de Heladería</b><br><hr>
        • Cargo: <b>${info.n}</b><br>
        • Días: <b>${d}</b> (de 6 máx.)<br>
        • Pago Total: <b>$${pago}</b><br><br>
        <b>Explicación:</b> Para el ID <b>${id}</b>, la tarifa es $${info.t}/día. Por <b>${d}</b> días, el total es $${pago}.
    `);
}

async function ej20() {
    // Pedimos los 4 números usando pedirDato para asegurar que no entren símbolos ni letras
    let n1 = await pedirDato("Primer número (N1):");
    if (n1 === null) return;
    
    let n2 = await pedirDato("Segundo número (N2):");
    if (n2 === null) return;
    
    let n3 = await pedirDato("Tercero número (N3):");
    if (n3 === null) return;
    
    let n4 = await pedirDato("Cuarto número (N4):");
    if (n4 === null) return;

    // Convertimos a números para operar
    let num1 = Number(n1);
    let num2 = Number(n2);
    let num3 = Number(n3);
    let num4 = Number(n4);

    // 1. Encontrar el mayor
    let mayor = Math.max(num1, num2, num3, num4);

    // 2. Contar cuántos son pares
    let lista = [num1, num2, num3, num4];
    let pares = lista.filter(x => x % 2 === 0).length;

    // 3. Mostrar resultado con explicación
    botRespuesta(`
        <b>Análisis de Datos Finalizado</b><hr>
        • Números ingresados: <b>${n1}, ${n2}, ${n3}, ${n4}</b><br>
        • El número mayor es: <b>${mayor}</b><br>
        • Cantidad de números pares: <b>${pares}</b><br><br>
        
        <b>Explicación:</b> El sistema analizó tus cuatro entradas. 
        Primero, comparó los valores para identificar que <b>${mayor}</b> es el más alto. 
        Luego, aplicó el operador de residuo (modulo 2) a cada uno, detectando que <b>${pares}</b> de ellos tienen división exacta por dos.
    `);
}

async function ej21() {
    let n = await pedirDato("Número para Factorial:", false);
    if (!n) return;
    let res = 1;
    for (let i = 1; i <= Number(n); i++) res *= i;
    botRespuesta(`
        El factorial de <b>${n}</b> (<b>${n}!</b>) es <b>${res}</b>.<br><br>
        <b>Explicación:</b> Multiplicamos 1 × 2 × 3... hasta llegar a tu número <b>${n}</b>.
    `);
}

async function ej22() {
    let n = await pedirDato("Sumar del 1 hasta:", false);
    if (!n) return;
    let suma = (Number(n) * (Number(n) + 1)) / 2;
    botRespuesta(`
        La suma acumulada hasta <b>${n}</b> es <b>${suma}</b>.<br><br>
        <b>Explicación:</b> Aplicamos la fórmula de Gauss sobre tu número <b>${n}</b> para obtener el total instantáneamente.
    `);
}

async function ej26() {
    let D = await pedirDato("Dividendo:", false), d = await pedirDato("Divisor:", false);
    if (!D || !d) return;
    if (Number(d) === 0) return botRespuesta("No se puede dividir entre cero.", false);
    let cociente = 0, resto = Number(D);
    while (resto >= Number(d)) { resto -= Number(d); cociente++; }
    botRespuesta(`
        Resultado de <b>${D} ÷ ${d}</b>: Cociente <b>${cociente}</b>, Resto <b>${resto}</b>.<br><br>
        <b>Explicación:</b> Restamos <b>${d}</b> sucesivamente del <b>${D}</b> hasta que ya no fue posible.
    `);
}

async function ej34() {
    let n = await pedirDato("Tabla de multiplicar del:", false);
    if (!n) return;
    let tabla = "";
    for (let i = 1; i <= 10; i++) tabla += `<b>${n}</b> x ${i} = ${Number(n) * i}<br>`;
    botRespuesta(`
        <b>Tabla del ${n}:</b><br>${tabla}<br>
        <b>Explicación:</b> Calculamos los primeros 10 múltiplos de tu número <b>${n}</b>.
    `);
}

async function ej36() {
    let n = await pedirDato("¿Cuántos números de Fibonacci quieres?", false);
    if (!n) return;
    let cant = Number(n), f = [0, 1];
    if (cant === 1) f = [0];
    for (let i = 2; i < cant; i++) f.push(f[i - 1] + f[i - 2]);
    botRespuesta(`
        <b>Serie Fibonacci (${n} términos):</b><br>${f.slice(0, cant).join(', ')}<br><br>
        <b>Explicación:</b> Generamos una cadena donde cada nuevo número es la suma de los dos anteriores, empezando desde tus <b>${n}</b> pedidos.
    `);
}

async function ej37() {
    let a = await pedirDato("Número 1 para MCD:"), b = await pedirDato("Número 2:");
    if (!a || !b) return;
    let n1 = Math.abs(Number(a)), n2 = Math.abs(Number(b));
    while (n2 !== 0) { let t = n2; n2 = n1 % n2; n1 = t; }
    botRespuesta(`
        El Máximo Común Divisor de <b>${a} y ${b}</b> es <b>${n1}</b>.<br><br>
        <b>Explicación:</b> Usamos el Algoritmo de Euclides para encontrar el número más grande que divide exactamente a tus datos <b>${a}</b> y <b>${b}</b>.
    `);
}

async function ej38() {
    let n = await pedirDato("Verificar si es número perfecto:", false);
    if (!n) return;
    let num = Number(n), suma = 0, divisores = [];
    for (let i = 1; i < num; i++) { if (num % i === 0) { suma += i; divisores.push(i); } }
    let esP = (suma === num && num !== 0);
    botRespuesta(`
        ¿Es <b>${n}</b> perfecto? <b>${esP ? 'SÍ' : 'NO'}</b>.<br>
        Suma de divisores: ${divisores.join(' + ')} = <b>${suma}</b>.<br><br>
        <b>Explicación:</b> Un número es perfecto si la suma de sus divisores (sin incluirse él mismo) da el número original. En tu caso <b>${n}</b>, la suma dio ${suma}.
    `);
}

async function ej40() {
    let pi = 3, d = 2, s = 1;
    for (let i = 0; i < 500; i++) {
        pi += s * (4 / (d * (d + 1) * (d + 2)));
        d += 2; s *= -1;
    }
    botRespuesta(`
        <b>Pi (Nilakantha) ≈ ${pi.toFixed(10)}</b>.<br><br>
        <b>Explicación:</b> A diferencia de Leibniz, esta serie converge mucho más rápido. Es una danza matemática de sumas y restas de fracciones de productos triples.
    `);
}