// 6. Sueldo semanal con horas extra
Algoritmo Ejercicio_06
    Definir horas, sueldo Como Real
    Escribir "Dime cuántas horas trabajaste esta semana:"
    Leer horas
    // Si trabajas más de 40, las primeras 40 valen $20 y el resto $25.
    Si horas > 40 Entonces
        sueldo <- (40 * 20) + ((horas - 40) * 25)
    Sino
        sueldo <- horas * 20
    FinSi
    Escribir "Tu sueldo es de: $", sueldo
FinAlgoritmo