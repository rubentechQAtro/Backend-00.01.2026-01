Algoritmo Ejercicio_24
    Definir i, suma_pares Como Entero
    suma_pares <- 0
    
    // Empezamos en 2 y vamos de 2 en 2 hasta 1000
    Para i <- 2 Hasta 1000 Con Paso 2 Hacer
        suma_pares <- suma_pares + i
    FinPara
    
    Escribir "La suma de todos los números pares hasta 1000 es: ", suma_pares
FinAlgoritmo