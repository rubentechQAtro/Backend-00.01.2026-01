Algoritmo Ejercicio_21
    Definir n, i, factorial Como Entero
    Escribir "Ingrese el número para calcular el factorial:"
    Leer n
    
    // Inicializamos en 1 porque es el elemento neutro de la multiplicación
    factorial <- 1
    
    // El ciclo multiplica acumulativamente: 1 * 2 * 3... hasta n
    Para i <- 1 Hasta n Con Paso 1 Hacer
        factorial <- factorial * i
    FinPara
    
    Escribir "El factorial de ", n, " es: ", factorial
FinAlgoritmo