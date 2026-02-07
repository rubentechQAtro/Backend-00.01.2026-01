/* ============================================================
   CONFIGURACIÓN DE IMÁGENES
   ============================================================ */
const IMG_PRINCIPAL = "./Images/Neuvillete Iocn.webp"; 
const IMG_EXITO = "./Images/Good Kaveh.webp"; 
const IMG_FALLO = "./Images/Exercise Wrong.webp"; 

/* --- FUNCIONES MOTOR DEL ASISTENTE --- */
async function botPregunta(titulo, placeholder = "Ingresa el valor...") {
    const { value: respuesta } = await Swal.fire({
        title: `Hola, ${titulo}`,
        imageUrl: IMG_PRINCIPAL,
        imageWidth: 90, imageHeight: 90,
        input: 'text',
        inputPlaceholder: placeholder,
        confirmButtonText: 'Enviar',
        showCancelButton: true,
        customClass: { popup: 'bot-popup animate__animated animate__fadeInDown' },
        confirmButtonColor: '#4f46e5'
    });
    return (respuesta && respuesta.trim() !== "") ? respuesta : null;
}

function botRespuesta(mensaje, esExito = true) {
    Swal.fire({
        title: esExito ? "¡Resultado listo!" : "Atención",
        html: mensaje,
        imageUrl: esExito ? IMG_EXITO : IMG_FALLO,
        imageWidth: 90, imageHeight: 90,
        confirmButtonText: 'Entendido',
        customClass: { popup: 'bot-popup animate__animated animate__zoomIn' },
        confirmButtonColor: esExito ? '#10b981' : '#ef4444'
    });
}

/**
 * VALIDADOR ULTRA-ESTRICTO
 * Bloquea letras, espacios en blanco y símbolos como #$%&/()=?¡
 */
function validar(valor, permitirNegativo = true) {
    if (valor === null) return false;
    
    // Regex: ^-?\d+$ (Solo permite un guion opcional al inicio y solo dígitos después)
    const patronSencillo = /^-?\d+$/;
    
    if (!patronSencillo.test(valor.trim())) {
        botRespuesta(`
            El valor "<b>${valor}</b>" contiene símbolos, letras o espacios no permitidos.<br><br>
            <b>Nota:</b> No uses símbolos como #, $, %, &, /, o letras. Solo usa números del 0 al 9.
        `, false);
        return false;
    }

    if (!permitirNegativo && Number(valor) < 0) {
        botRespuesta(`Ingresaste <b>${valor}</b>. Este ejercicio no admite cantidades negativas.`, false);
        return false;
    }
    
    return true;
}

/* ============================================================
   EJERCICIOS COMPLETOS (01 - 40)
   ============================================================ */

async function ej01() {
    let n = await botPregunta("Número de 3 dígitos:");
    if(!validar(n)) return;
    let r = (Math.abs(Number(n)) > 99 && Math.abs(Number(n)) < 1000);
    botRespuesta(`El número <b>${n}</b> ${r?'sí':'no'} tiene 3 dígitos.`);
}

async function ej02() {
    let n = await botPregunta("Dime un número:");
    if(!validar(n)) return;
    botRespuesta(`El <b>${n}</b> es ${Number(n)<0?'Negativo':'Positivo'}.`);
}

async function ej03() {
    let n = await botPregunta("Dime un número:");
    if(!validar(n)) return; // Validamos que no metan símbolos antes de ver el final
    botRespuesta(`Tu número <b>${n}</b> ${n.endsWith('4')?'sí':'no'} termina en 4.`);
}

async function ej04() {
    let a = await botPregunta("N1:"), b = await botPregunta("N2:"), c = await botPregunta("N3:");
    if(!validar(a) || !validar(b) || !validar(c)) return;
    let arr = [Number(a), Number(b), Number(c)].sort((x,y)=>x-y);
    botRespuesta(`Ordenados: ${arr.join(' < ')}.`);
}

async function ej05() {
    let q = await botPregunta("¿Cuántos pares de zapatos?");
    if(!validar(q, false)) return;
    let n = Number(q), desc = n>30?0.4:n>20?0.2:n>10?0.1:0;
    botRespuesta(`Total por <b>${n}</b> pares: $${(n*80)*(1-desc)}.`);
}

async function ej06() {
    let h = await botPregunta("Horas trabajadas:");
    if(!validar(h, false)) return;
    let t = Number(h), ext = Math.max(0, t-40);
    botRespuesta(`Pago por <b>${h}</b> horas: $${(Math.min(40,t)*20)+(ext*25)}.`);
}

async function ej07() {
    const { value: t } = await Swal.fire({title:'Membresía', input:'select', inputOptions:{'A':'A','B':'B','C':'C','N':'N'}});
    let m = await botPregunta("Monto:");
    if(!validar(m, false)) return;
    let d = t=='A'?0.1:t=='B'?0.15:t=='C'?0.2:0;
    botRespuesta(`Total compra <b>$${m}</b>: $${m-(m*d)}.`);
}

async function ej08() {
    let n1=await botPregunta("N1"), n2=await botPregunta("N2"), n3=await botPregunta("N3");
    if(!validar(n1,false)||!validar(n2,false)||!validar(n3,false)) return;
    botRespuesta(`Promedio de <b>${n1}, ${n2}, ${n3}</b>: ${((Number(n1)+Number(n2)+Number(n3))/3).toFixed(2)}.`);
}

async function ej09() {
    let s = await botPregunta("Sueldo:");
    if(!validar(s, false)) return;
    let aum = Number(s)>2000?0.05:0.1;
    botRespuesta(`Sueldo <b>$${s}</b> con aumento: $${(Number(s)*(1+aum)).toFixed(2)}.`);
}

async function ej10() {
    let n = await botPregunta("Número:");
    if(!validar(n)) return;
    botRespuesta(`El <b>${n}</b> es ${Number(n)%2==0?'Par':'Impar'}.`);
}

async function ej11() {
    let a=await botPregunta("N1"), b=await botPregunta("N2"), c=await botPregunta("N3");
    if(!validar(a)||!validar(b)||!validar(c)) return;
    botRespuesta(`De <b>${a}, ${b}, ${c}</b> el mayor es ${Math.max(a,b,c)}.`);
}

async function ej12() {
    let a=await botPregunta("N1"), b=await botPregunta("N2");
    if(!validar(a)||!validar(b)) return;
    botRespuesta(`Entre <b>${a} y ${b}</b> el mayor es ${Math.max(a,b)}.`);
}

async function ej13() {
    let l = await botPregunta("Dime una letra:");
    if(!l || l.length>1 || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]$/.test(l)) {
        return botRespuesta("Entrada inválida. No uses símbolos ni números, solo una letra.", false);
    }
    let r = /^[aeiouáéíóú]$/i.test(l);
    botRespuesta(`La letra <b>${l}</b> ${r?'es':'no es'} vocal.`);
}

async function ej14() {
    let n = await botPregunta("Número (1-10):");
    if(!validar(n, false)) return;
    botRespuesta(`El <b>${n}</b> ${[2,3,5,7].includes(Number(n))?'es':'no es'} primo.`);
}

async function ej15() {
    let cm=await botPregunta("cm"), lb=await botPregunta("lb");
    if(!validar(cm,false)||!validar(lb,false)) return;
    botRespuesta(`<b>${cm} cm</b> = ${(cm/2.54).toFixed(2)} pulg | <b>${lb} lb</b> = ${(lb/2.204).toFixed(2)} kg.`);
}

async function ej16() {
    let n = await botPregunta("Día (1-7):");
    if(!validar(n, false)) return;
    let d = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];
    botRespuesta(`El <b>${n}</b> es ${d[Number(n)-1] || 'Inválido'}.`);
}

async function ej17() {
    let h=await botPregunta("H"), m=await botPregunta("M"), s=await botPregunta("S");
    if(!validar(h,false)||!validar(m,false)||!validar(s,false)) return;
    let hh=Number(h), mm=Number(m), ss=Number(s);
    ss++; if(ss==60){ss=0; mm++;} if(mm==60){mm=0; hh++;} if(hh==24) hh=0;
    botRespuesta(`Hora actualizada: ${hh}:${mm}:${ss}.`);
}

async function ej18() {
    let n = await botPregunta("Cantidad CDs:");
    if(!validar(n, false)) return;
    let c=Number(n), p=c<=9?10:c<=99?8:c<=499?7:6;
    botRespuesta(`Total por <b>${c}</b> CDs: $${c*p}.`);
}

async function ej19() {
    let id=await botPregunta("ID (1-4)"), d=await botPregunta("Días");
    if(!validar(id,false)||!validar(d,false)) return;
    let t={1:56, 2:64, 3:80, 4:48};
    botRespuesta(`Empleado <b>${id}</b> por <b>${d}</b> días: $${(t[id]||0)*d}.`);
}

async function ej20() {
    let a=await botPregunta("N1"), b=await botPregunta("N2"), c=await botPregunta("N3"), d=await botPregunta("N4");
    if(!validar(a)||!validar(b)||!validar(c)||!validar(d)) return;
    let l=[Number(a),Number(b),Number(c),Number(d)];
    botRespuesta(`Mayor: <b>${Math.max(...l)}</b> | Pares: <b>${l.filter(x=>x%2==0).length}</b>.`);
}

async function ej21() {
    let n = await botPregunta("Factorial de:");
    if(!validar(n, false)) return;
    let r=1; for(let i=1;i<=Number(n);i++) r*=i;
    botRespuesta(`El factorial de <b>${n}</b> es ${r}.`);
}

async function ej22() {
    let n = await botPregunta("Sumar hasta:");
    if(!validar(n, false)) return;
    botRespuesta(`Suma del 1 al <b>${n}</b>: ${(Number(n)*(Number(n)+1))/2}.`);
}

async function ej23() {
    let n = await botPregunta("Límite impares:");
    if(!validar(n, false)) return;
    let s=0; for(let i=1;i<=Number(n);i+=2) s+=i;
    botRespuesta(`Suma impares hasta <b>${n}</b>: ${s}.`);
}

async function ej24() {
    let s=0; for(let i=2;i<=1000;i+=2) s+=i;
    botRespuesta(`Suma de pares hasta el 1000: <b>${s}</b>.`);
}

async function ej25() {
    let n = await botPregunta("Factorial:");
    if(!validar(n, false)) return;
    let f=1, i=Number(n); while(i>0){ f*=i; i--; }
    botRespuesta(`Factorial de <b>${n}</b>: ${f}.`);
}

async function ej26() {
    let D=await botPregunta("Dividendo"), d=await botPregunta("Divisor");
    if(!validar(D,false)||!validar(d,false)) return;
    if(Number(d)==0) return botRespuesta("Error: Divisor cero.", false);
    let c=0, r=Number(D); while(r>=Number(d)){ r-=Number(d); c++; }
    botRespuesta(`<b>${D}/${d}</b>: Cociente ${c}, Resto ${r}.`);
}

async function ej27() {
    let sum=0, cont=0;
    await Swal.fire("Media", "Números positivos. Negativo para terminar.", "info");
    while(true){
        let v = await botPregunta("Número:");
        if(v==null || isNaN(v) || Number(v)<0) break;
        sum+=Number(v); cont++;
    }
    botRespuesta(`Media de tus números: <b>${cont>0?sum/cont:0}</b>.`);
}

async function ej28() { let s=0, i=1; do{s+=i; i++;}while(i<=100); botRespuesta(`Suma 1-100: <b>${s}</b> (Do-While)`); }
async function ej29() { let s=0, i=1; while(i<=100){s+=i; i++;} botRespuesta(`Suma 1-100: <b>${s}</b> (While)`); }
async function ej30() { let s=0; for(let i=1;i<=100;i++) s+=i; botRespuesta(`Suma 1-100: <b>${s}</b> (For)`); }

async function ej31() {
    let p=0, im=0; for(let i=0;i<10;i++){
        let v=Math.floor(Math.random()*100);
        if(v%2==0) p+=v; else im+=v;
    }
    botRespuesta(`Aleatorios: Suma pares ${p}, Suma impares ${im}.`);
}

async function ej32() {
    let m=0, id=0; for(let i=1;i<=3;i++){
        let v=Math.floor(Math.random()*100000);
        if(v>m){ m=v; id=i; }
    }
    botRespuesta(`Provincia mayor: <b>${id}</b> con ${m} hab.`);
}

async function ej33() {
    for(let i=3;i<=100;i+=3) console.log(i);
    botRespuesta("Múltiplos de 3 en consola (F12).");
}

async function ej34() {
    let n = await botPregunta("Tabla del:");
    if(!validar(n, false)) return;
    let t=""; for(let i=1;i<=10;i++) t+=`${n}x${i}=${Number(n)*i}<br>`;
    botRespuesta(`<b>Tabla del ${n}:</b><br>${t}`);
}

async function ej35() {
    let l=[]; for(let i=0;i<20;i++) l.push(Math.floor(Math.random()*100));
    botRespuesta(`20 números: Mayor ${Math.max(...l)}, Menor ${Math.min(...l)}.`);
}

async function ej36() {
    let n = await botPregunta("Cantidad Fibonacci:");
    if(!validar(n, false)) return;
    let c=Number(n), f=[0,1]; for(let i=2;i<c;i++) f.push(f[i-1]+f[i-2]);
    botRespuesta(`Serie Fibonacci de <b>${n}</b>: ${f.slice(0,c).join(', ')}.`);
}

async function ej37() {
    let a=await botPregunta("N1"), b=await botPregunta("N2");
    if(!validar(a)||!validar(b)) return;
    let n1=Math.abs(a), n2=Math.abs(b);
    while(n2!=0){ let t=n2; n2=n1%n2; n1=t; }
    botRespuesta(`El MCD de <b>${a} y ${b}</b> es <b>${n1}</b>.`);
}

async function ej38() {
    let n = await botPregunta("Número:");
    if(!validar(n, false)) return;
    let v=Number(n), s=0; for(let i=1;i<v;i++) if(v%i==0) s+=i;
    botRespuesta(`El <b>${n}</b> ${s==v?'es':'no es'} perfecto.`);
}

async function ej39() {
    let pi=0, d=1, s=1; for(let i=0;i<10000;i++){ pi+=s*(4/d); d+=2; s*=-1; }
    botRespuesta(`Pi Leibniz: <b>${pi.toFixed(6)}</b>.`);
}

async function ej40() {
    let pi=3, d=2, s=1; for(let i=0;i<1000;i++){ pi+=s*(4/(d*(d+1)*(d+2))); d+=2; s*=-1; }
    botRespuesta(`Pi Nilakantha: <b>${pi.toFixed(6)}</b>.`);
}

