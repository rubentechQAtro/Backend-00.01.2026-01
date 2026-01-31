Algoritmo Ejercicio_27
    Definir num, suma, contador Como Real
    suma <- 0
    contador <- 0
    
    Escribir "Ingrese números positivos (ingrese un negativo para terminar):"
    Leer num
    
    Mientras num >= 0 Hacer
        suma <- suma + num
        contador <- contador + 1
        Escribir "Siguiente número:"
        Leer num
    FinMientras
    
    // Verificamos que se haya ingresado al menos un número para evitar división por cero
    Si contador > 0 Entonces
        Escribir "La media de los números ingresados es: ", suma / contador
    Sino
        Escribir "No se ingresaron números válidos."
    FinSi
FinAlgoritmo