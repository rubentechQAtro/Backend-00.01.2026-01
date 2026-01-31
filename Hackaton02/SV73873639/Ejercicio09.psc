// 9. Aumento de sueldo
Algoritmo Ejercicio_09
    Definir sueldo, nuevoSueldo Como Real
    Escribir "Ingresa tu sueldo actual:"
    Leer sueldo
    Si sueldo > 2000 Entonces
        nuevoSueldo <- sueldo * 1.05 // 5% aumento
    Sino
        nuevoSueldo <- sueldo * 1.10 // 10% aumento
    FinSi
    Escribir "Tu nuevo sueldo es: $", nuevoSueldo
FinAlgoritmo