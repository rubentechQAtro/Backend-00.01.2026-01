Algoritmo Ejercicio_37
    Definir a, b, residuo Como Entero
    Escribir "Ingresa dos números para hallar su M.C.D:"
    Leer a, b
    
    // Uso el algoritmo de Euclides: divido y saco el residuo
    Mientras b <> 0 Hacer
        residuo <- a Mod b
        a <- b        // El divisor pasa a ser el dividendo
        b <- residuo  // El residuo pasa a ser el divisor
    FinMientras
    
    Escribir "El Máximo Común Divisor es: ", a
FinAlgoritmo