function Ejercicio1 () {
    let numero = parseInt(prompt("Ingrese un número:"));

    if (!numero) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, ingrese un número válido.'
        });
        return;
    }

    numero = Math.abs(numero);

    if ( numero > 99 && numero < 1000 ) {
        Swal.fire({
            icon: 'success',
            title: 'Número válido',
            text: 'El número ingresado es un número de tres dígitos.'
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Número inválido',
            text: 'El número ingresado no es un número de tres dígitos.'
        });
    }
}

function Ejercicio2 () {
    try {
        let numero = parseInt(prompt("Ingrese un número:"));

        if (numero < 0) {
        console.log("El número es negativo.");
        } else {
            console.log("El número NO es negativo.");
        }
    } catch (error) {
        console.log("Error al ingresar el número.");
        return;
    }
}

function Ejercicio3 () {
    try {
        let numero = parseInt(prompt("Ingrese un número:"));

        if (numero % 10 == 4) {
        console.log("El número termina en 4.");
        } else {
            console.log("El número NO termina en 4.");
        }
    } catch (error) {
        console.log("Error al ingresar el número.");
        return;
    }
}

function Ejercicio4 () {
    try {
        let numero1 = parseInt(prompt("Ingrese primer número:"));
        let numero2 = parseInt(prompt("Ingrese segundo número:"));
        let numero3 = parseInt(prompt("Ingrese tercer número:"));

        numeros = [numero1, numero2, numero3];

        if (numero1 > numero2) {
            numeros[1] = numero1;
            numeros[0] = numero2;
            if (numero1 > numero3) {
                numeros[2] = numero1;
                numeros[1] = numero3;
                if (numero2 > numero3) {
                    numeros[0] = numero3;
                    numeros[1] = numero2;
                }
            }
        } else {
            if (numero2 > numero3) {
                numeros[2] = numero2;
                numeros[1] = numero3;
                if (numero1 > numero3) {
                    numeros[0] = numero3;
                    numeros[1] = numero1;
                }
            }
        }

        console.log("Los números ordenados de menor a mayor son: " + numeros[0] + ", " + numeros[1] + ", " + numeros[2]);
        
    } catch (error) {
        console.log(error);
        return;
    }
}

function Ejercicio5 () {
    let cantidadZapatos = parseInt(prompt("Ingrese la cantidad de zapatos a comprar:"));
    let precioUnitario = 80;
    let totalCompra = cantidadZapatos * precioUnitario;
    let descuento = 0;

    if (cantidadZapatos > 30) {
        descuento = 0.40;
    } else if (cantidadZapatos > 20) {
        descuento = 0.20;
    } else if (cantidadZapatos > 10) {
        descuento = 0.10;
    }

    let montoDescuento = totalCompra * descuento;
    let totalPagar = totalCompra - montoDescuento;

    console.log("Total a pagar: $" + totalPagar);
}

function Ejercicio6 () {
    let horasTrabajadas = parseFloat(prompt("Ingrese las horas trabajadas en la semana:"));
    let sueldo = 0;

    if (horasTrabajadas <= 40) {
        sueldo = horasTrabajadas * 20;
    } else {
        let horasExtras = horasTrabajadas - 40;
        sueldo = (40 * 20) + (horasExtras * 25);
    }

    console.log("Salario: $" + sueldo);
}

function Ejercicio7 () {
    let tipoMembresia = prompt("Ingrese el tipo de membresía (A, B o C):").toUpperCase();
    let descuentoHelado = 0;

    if (tipoMembresia === "A") {
        descuentoHelado = 0.10;
    } else if (tipoMembresia === "B") {
        descuentoHelado = 0.15;
    } else if (tipoMembresia === "C") {
        descuentoHelado = 0.20;
    } else {
        console.log("Tipo de membresía inválido.");
    }

    console.log("Tiene un descuento del " + (descuentoHelado * 100) + "%");
}

function Ejercicio8 () {
    let nota1 = parseFloat(prompt("Ingrese la primera nota:"));
    let nota2 = parseFloat(prompt("Ingrese la segunda nota:"));
    let nota3 = parseFloat(prompt("Ingrese la tercera nota:"));

    let promedio = (nota1 + nota2 + nota3) / 3;

    console.log("El promedio es: " + promedio);

    if (promedio >= 11) {
        console.log("El estudiante aprobó.");
    } else {
        console.log("El estudiante desaprobó.");
    }
}

function Ejercicio9 () {
    let salario = parseFloat(prompt("Ingrese el salario actual del trabajador:"));
    let aumento = 0;

    if (salario > 2000) {
        aumento = salario * 0.05;
    } else {
        aumento = salario * 0.10;
    }

    console.log("El trabajador recibira un aumento de: $ " + aumento);
}

function Ejercicio10 () {
    let numero = parseInt(prompt("Ingrese un número:"));

    if (numero % 2 === 0) {
        console.log("El número es PAR.");
    } else {
        console.log("El número es IMPAR.");
    }
}

function Ejercicio11 () {
    let num1 = parseFloat(prompt("Ingrese el primer número:"));
    let num2 = parseFloat(prompt("Ingrese el segundo número:"));
    let num3 = parseFloat(prompt("Ingrese el tercer número:"));

    let mayor;

    if (num1 >= num2 && num1 >= num3) {
        mayor = num1;
    } else if (num2 >= num1 && num2 >= num3) {
        mayor = num2;
    } else {
        mayor = num3;
    }

    console.log("El número mayor es: " + mayor);
}

function Ejercicio12 () {
    let numero1 = parseFloat(prompt("Ingrese el primer número:"));
    let numero2 = parseFloat(prompt("Ingrese el segundo número:"));

    if (numero1 > numero2) {
        console.log("El número mayor es: " + numero1);
    } else if (numero2 > numero1) {
        console.log("El número mayor es: " + numero2);
    } else {
        console.log("Ambos números son iguales.");
    }
}

function Ejercicio13 () {
    let letra = prompt("Ingrese una letra:").toLowerCase();

    if (letra === "a" || letra === "e" || letra === "i" || letra === "o" || letra === "u") {
        console.log("Es una vocal.");
    } else {
        console.log("No es una vocal.");
    }
}

function Ejercicio14 () {
    let numeroPrimo = parseInt(prompt("Ingrese un número entero del 1 al 10:"));

    if (numeroPrimo < 1 || numeroPrimo > 10) {
        console.log("El número no está en el rango permitido.");
    } else {
        let esPrimo = true;

        switch (numeroPrimo) {
            case 2:
            case 3:
            case 5:
            case 7:
                esPrimo = true;
                break;
            
            default:
                esPrimo = false;
                break;
        }

        if (esPrimo) {
            console.log("El número es primo.");
        } else {
            console.log("El número NO es primo.");
        }
    }
}

function Ejercicio15 () {
    let opcion = parseInt(prompt("Ingrese el número de la opción deseada (1. Centímetros a pulgadas | 2. Libras a kilogramos):"));

    if (opcion === 1) {
        let centimetros = parseFloat(prompt("Ingrese la cantidad en centímetros:"));
        let pulgadas = centimetros / 2.54;
        console.log(centimetros + " cm equivalen a " + pulgadas + " pulgadas.");
    } else if (opcion === 2) {
        let libras = parseFloat(prompt("Ingrese la cantidad en libras:"));
        let kilogramos = libras * 0.453592;
        console.log(libras + " libras equivalen a " + kilogramos + " kilogramos.");
    } else {
        console.log("Opción inválida.");
    }
}

function Ejercicio16 () {
    let dia = parseInt(prompt("Ingrese un número del 1 al 7:"));

    switch (dia) {
        case 1:
            console.log("Lunes");
            break;
        case 2:
            console.log("Martes");
            break;
        case 3:
            console.log("Miércoles");
            break;
        case 4:
            console.log("Jueves");
            break;
        case 5:
            console.log("Viernes");
            break;
        case 6:
            console.log("Sábado");
            break;
        case 7:
            console.log("Domingo");
            break;
        default:
            console.log("Número inválido. Debe ser del 1 al 7.");
    }
}

function Ejercicio17 () {
    let hora = parseInt(prompt("Ingrese la hora (0-23):"));
    let minutos = parseInt(prompt("Ingrese los minutos (0-59):"));
    let segundos = parseInt(prompt("Ingrese los segundos (0-59):"));

    segundos++;

    if (segundos === 60) {
        segundos = 0;
        minutos++;
    }

    if (minutos === 60) {
        minutos = 0;
        hora++;
    }

    if (hora === 24) {
        hora = 0;
    }

    console.log("La hora dentro de un segundo es: " + hora + ":" + minutos + ":" + segundos);
}

function Ejercicio18 () {
    let cantidadCD = parseInt(prompt("Ingrese la cantidad de CDs a vender:"));
    let precioUnitario;

    if (cantidadCD <= 9) {
        precioUnitario = 10;
    } else if (cantidadCD <= 99) {
        precioUnitario = 8;
    } else if (cantidadCD <= 499) {
        precioUnitario = 7;
    } else {
        precioUnitario = 6;
    }

    let totalVenta = cantidadCD * precioUnitario;
    let ganancia = totalVenta * 0.0825;

    console.log("Precio total para el cliente: $" + totalVenta);
    console.log("Ganancia del vendedor (8.25%): $" + ganancia);
}

function Ejercicio19 () {
    let idEmpleado = parseInt(prompt("Ingrese el número identificador del empleado (1: Cajero, 2: Servidor, 3: Preparador de mezclas, 4: Mantenimiento):"));

    let salarioDiario;

    switch (idEmpleado) {
        case 1:
            salarioDiario = 56;
            break;
        case 2:
            salarioDiario = 64;
            break;
        case 3:
            salarioDiario = 80;
            break;
        case 4:
            salarioDiario = 48;
            break;
        default:
            console.log("Identificador inválido.");
            return;
    }

    let diasTrabajados = parseInt(prompt("Ingrese los días trabajados (máximo 6):"));

    if (diasTrabajados <= 6 && diasTrabajados >= 0) {
        let pagoTotal = salarioDiario * diasTrabajados;
        console.log("El pago total es: $" + pagoTotal);
    } else {
        console.log("Días inválidos.");
    }
}

function Ejercicio20 () {
    let n1 = parseInt(prompt("Ingrese el primer número:"));
    let n2 = parseInt(prompt("Ingrese el segundo número:"));
    let n3 = parseInt(prompt("Ingrese el tercer número:"));
    let n4 = parseInt(prompt("Ingrese el cuarto número:"));

    let contadorPares = 0;

    if (n1 % 2 === 0) contadorPares++;
    if (n2 % 2 === 0) contadorPares++;
    if (n3 % 2 === 0) contadorPares++;
    if (n4 % 2 === 0) contadorPares++;

    console.log("Cantidad de números pares: " + contadorPares);

    let mayor = Math.max(n1, n2, n3, n4);
    console.log("El número mayor es: " + mayor);

    // Si el tercero es par, cuadrado del segundo
    if (n3 % 2 === 0) {
        console.log("El cuadrado del segundo número es: " + (n2 * n2));
    }

    // Si el primero es menor que el cuarto, media de los 4
    if (n1 < n4) {
        let media = (n1 + n2 + n3 + n4) / 4;
        console.log("La media de los 4 números es: " + media);
    }

    // Si el segundo es mayor que el tercero
    if (n2 > n3) {
        if (n3 >= 50 && n3 <= 700) {
            let suma = n1 + n2 + n3 + n4;
            console.log("La suma de los 4 números es: " + suma);
        }
    }
}

function Ejercicio21 () {
    let numero = parseInt(prompt("Ingrese un número para calcular su factorial:"));

    if (numero < 0) {
        console.log("El factorial no está definido para números negativos.");
        return;
    }

    let factorial = 1;

    for (let i = 1; i <= numero; i++) {
        factorial *= i;
    }

    console.log("El factorial de " + numero + " es: " + factorial);
}

function Ejercicio22 () {
    let n = parseInt(prompt("Ingrese un número n:"));
    let suma = 0;

    for (let i = 1; i <= n; i++) {
        suma += i;
    }

    console.log("La suma de los primeros " + n + " números es: " + suma);
}

function Ejercicio23 () {
    let nImpar = parseInt(prompt("Ingrese un número n:"));
    let sumaImpares = 0;

    for (let i = 1; i <= nImpar; i++) {
        if (i % 2 !== 0) {
            sumaImpares += i;
        }
    }

    console.log("La suma de los números impares hasta " + nImpar + " es: " + sumaImpares);
}

function Ejercicio24 () {
    let sumaPares = 0;

    for (let i = 1; i <= 1000; i++) {
        if (i % 2 === 0) {
            sumaPares += i;
        }
    }

    console.log("La suma de los números pares hasta 1000 es: " + sumaPares);
}

function Ejercicio25 () {
    let numFact = parseInt(prompt("Ingrese un número para calcular su factorial:"));

    if (numFact < 0) {
        console.log("El factorial no está definido para números negativos.");
        return;
    }

    let fact = 1;
    let contador = 1;

    while (contador <= numFact) {
        fact *= contador;
        contador++;
    }

    console.log("El factorial de " + numFact + " es: " + fact);
}

function Ejercicio26 () {
    let dividendo = parseInt(prompt("Ingrese el dividendo:"));
    let divisor = parseInt(prompt("Ingrese el divisor:"));

    let cociente = 0;

    while (dividendo >= divisor) {
        dividendo -= divisor;
        cociente++;
    }

    console.log("Cociente: " + cociente);
    console.log("Resto: " + dividendo);
}

function Ejercicio27 () {
    let sumaMedia = 0;
    let contadorMedia = 0;
    let numeroMedia;

    do {
        numeroMedia = parseFloat(prompt("Ingrese un número positivo (negativo para terminar):"));
        
        if (numeroMedia >= 0) {
            sumaMedia += numeroMedia;
            contadorMedia++;
        }

    } while (numeroMedia >= 0);

    if (contadorMedia > 0) {
        let media = sumaMedia / contadorMedia;
        console.log("La media es: " + media);
    } else {
        console.log("No se ingresaron números positivos.");
    }
}

function Ejercicio28 () {
    let suma100 = 0;
    let i = 1;

    do {
        suma100 += i;
        i++;
    } while (i <= 100);

    console.log("La suma de los primeros 100 números es: " + suma100);
}

function Ejercicio29 () {
    let sumaWhile = 0;
    let j = 1;

    while (j <= 100) {
        sumaWhile += j;
        j++;
    }

    console.log("La suma de los primeros 100 números es: " + sumaWhile);
}

function Ejercicio30 () {
    let sumaFor = 0;

    for (let k = 1; k <= 100; k++) {
        sumaFor += k;
    }

    console.log("La suma de los primeros 100 números es: " + sumaFor);
}

function Ejercicio31 () {
    let sumaPares = 0, sumaImpares = 0;
    let contPares = 0, contImpares = 0;

    for (let i = 1; i <= 10; i++) {
        let num = parseInt(prompt("Ingrese el número " + i + ":"));

        if (num % 2 === 0) {
            sumaPares += num;
            contPares++;
        } else {
            sumaImpares += num;
            contImpares++;
        }
    }

    if (contPares > 0)
        console.log("Media de pares: " + (sumaPares / contPares));
    else
        console.log("No se ingresaron números pares.");

    if (contImpares > 0)
        console.log("Media de impares: " + (sumaImpares / contImpares));
    else
        console.log("No se ingresaron números impares.");
}

function Ejercicio32 () {
    let mayorPoblacion = 0;
    let ciudadMayor = "";

    for (let i = 1; i <= 11; i++) {
        let nombreCiudad = prompt("Ingrese el nombre de la ciudad " + i + ":");
        let poblacion = parseInt(prompt("Ingrese la población de " + nombreCiudad + ":"));

        if (poblacion > mayorPoblacion) {
            mayorPoblacion = poblacion;
            ciudadMayor = nombreCiudad;
        }
    }

    console.log("La ciudad con mayor población es: " + ciudadMayor);
    console.log("Población: " + mayorPoblacion);
}

function Ejercicio33 () {
    let continuar;

    do {
        console.log("El programa se está ejecutando...");
        continuar = prompt("¿Desea continuar? (S/N)").toUpperCase();
    } while (continuar === "S");

    console.log("Programa finalizado.");
}

function Ejercicio34 () {
    for (let i = 1; i <= 9; i++) {
        console.log("Tabla del " + i);
        for (let j = 1; j <= 10; j++) {
            console.log(i + " x " + j + " = " + (i * j));
        }
    }
}

function Ejercicio35 () {
    let mayor = 0;
    let menor = 0;

    for (let i = 1; i <= 20; i++) {
        let num = parseInt(prompt("Ingrese el número " + i + ":"));

        if (num > mayor) mayor = num;
        if (num < menor) menor = num;
    }

    console.log("Número mayor: " + mayor);
    console.log("Número menor: " + menor);
}

function Ejercicio36 () {
    let n = parseInt(prompt("¿Cuántos términos de Fibonacci desea ver?"));

    let a = 0, b = 1;

    console.log(a);
    console.log(b);

    for (let i = 3; i <= n; i++) {
        let siguiente = a + b;
        console.log(siguiente);
        a = b;
        b = siguiente;
    }
}

function Ejercicio37 () {
    let num1 = parseInt(prompt("Ingrese el primer número:"));
    let num2 = parseInt(prompt("Ingrese el segundo número:"));

    while (num2 !== 0) {
        let temp = num2;
        num2 = num1 % num2;
        num1 = temp;
    }

    console.log("El MCD es: " + num1);
}

function Ejercicio38 () {
    let numero = parseInt(prompt("Ingrese un número:"));
    let suma = 0;

    for (let i = 1; i < numero; i++) {
        if (numero % i === 0) {
            suma += i;
        }
    }

    if (suma === numero) {
        console.log("Es un número perfecto.");
    } else {
        console.log("No es un número perfecto.");
    }
}

function Ejercicio39 () {
    let terminos = parseInt(prompt("Ingrese la cantidad de términos:"));
    let pi = 0;
    let signo = 1;

    for (let i = 0; i < terminos; i++) {
        pi += signo * (4 / (2 * i + 1));
        signo *= -1;
    }

    console.log("Aproximación de Pi según serie de Gregory-Leibniz: " + pi);
}

function Ejercicio40 () {
    let nTerminos = parseInt(prompt("Ingrese la cantidad de términos:"));
    let piN = 3;
    let signoN = 1;
    let contador = 2;

    for (let i = 1; i <= nTerminos; i++) {
        piN += signoN * (4 / (contador * (contador + 1) * (contador + 2)));
        signoN *= -1;
        contador += 2;
    }

    console.log("Aproximación de Pi según serie de Nilakantha: " + piN);
}
