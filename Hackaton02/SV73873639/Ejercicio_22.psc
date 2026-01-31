Algoritmo Ejercicio_22
    Definir n, i, suma Como Entero
    Escribir "Suma de los n primeros números. Ingrese el valor de n:"
    Leer n
    
    suma <- 0 // Acumulador de suma
    
    Para i <- 1 Hasta n Hacer
        suma <- suma + i // Sumamos el valor actual de i al total
    FinPara
    
    Escribir "La suma total es: ", suma
FinAlgoritmo