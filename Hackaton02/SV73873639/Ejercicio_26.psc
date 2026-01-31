Algoritmo Ejercicio_26
    Definir dividendo, divisor, cociente, resto Como Entero
    Escribir "Ingrese el dividendo (número a dividir):"
    Leer dividendo
    Escribir "Ingrese el divisor:"
    Leer divisor
    
    cociente <- 0
    resto <- dividendo
    
    // Mientras lo que quede sea mayor o igual al divisor, seguimos restando
    Mientras resto >= divisor Hacer
        resto <- resto - divisor
        cociente <- cociente + 1
    FinMientras
    
    Escribir "El cociente es: ", cociente
    Escribir "El resto es: ", resto
FinAlgoritmo